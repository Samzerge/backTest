const dnaHelper = require('./helpers/dnaHelper');


const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-east-1'});
const dynamoDb = new AWS.DynamoDB.DocumentClient({apiVersion: '2020-03-02'});

const DNA_SEQ_TABLE = process.env.DNA_SEQ_TABLE;
// const AWS_DEPLOY_REGION = process.env.AWS_DEPLOY_REGION;

app.use(cors());
const jsonParser = bodyParser.json()
// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const VALID_CHARS = ['A', 'T', 'C', 'G'];
const MUTATION_REPS = 4;

app.get('/stats', (req, res) => {


  const mutationCountPromise = getMutationCount(true);
  const noMutationCountPromise = getMutationCount(false);

  Promise.all([mutationCountPromise, noMutationCountPromise]).then(values => {

    const mutationCount =  values[0].Count;
    const noMutationCount =  values[1].Count;
    const ratio = noMutationCount > 0 ? mutationCount / noMutationCount : 'Need more data.';
    
  
    const resObj = {
      'count_mutations' : mutationCount,
      'count_no_mutation' : noMutationCount,
      'ratio' : ratio
    };

    return res.status(200).send(resObj);
  });
  

});

app.post('/mutation', jsonParser, (req, res) => {

  const reqBody = req.body;

  if (!reqBody.dna || reqBody.dna.length === 0) {
    
    return res.status(400).send({
      message: 'No dna sequence provided',
      result: false
    });
  }

  const result = dnaHelper.hasMutation(reqBody.dna, VALID_CHARS, MUTATION_REPS);
  const statusCode = result.mutation ? 200 : 403;

  const resObj =  {
    message: result.message,
    result: result.mutation
  }

  const savePromise = saveDna(reqBody.dna, resObj.result);
  savePromise.then((err, data) => {
    return res.status(statusCode).send(resObj);
  });


});


function saveDna(dnaSequence, mutationResult) {
  const dbItem = createDnaSequenceItem(dnaSequence, mutationResult)

  return dynamoDb.put(dbItem).promise();
}


function createDnaSequenceItem(dnaSequence, mutationResult) {
  return itemParams = {
    TableName: DNA_SEQ_TABLE,
    Item: {
      'dnaSequence' : dnaSequence.join(),
      'mutation' : mutationResult
    }
  };
}

function getMutationCount(mutationBoolean) {

  const mutationCountQuery = {
    TableName: DNA_SEQ_TABLE,
    // KeyConditionExpression: 'dnaSequence = :dnaSequence',
    FilterExpression : 'mutation = :mutation',
    ExpressionAttributeValues: {
        ':mutation':mutationBoolean
    },
    Select:'COUNT'
  };

  const requestPromise = dynamoDb.scan(mutationCountQuery).promise();

  return requestPromise;

}

module.exports = app;


