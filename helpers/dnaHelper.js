function hasMutation(dnaArr,validChars, mutationReps) {
  

    const invalidChar = '-';
  
    for(let currentRowPos = 0; currentRowPos <= dnaArr.length - 1; currentRowPos++) {
  
      const currentRow = dnaArr[currentRowPos];
  
      for(let currentCharPos = 0; currentCharPos <= currentRow.length - 1; currentCharPos++) {
  
        const currentChar = currentRow.charAt(currentCharPos);
        if (!isValidChar(currentChar, validChars)) {
          return {
            message: 'invalidChar' + currentChar,
            mutation: true
          };
        }
    
        const countersContainer = {
          horizontal: {
            counter : 1,
            nextChar : invalidChar
          },
          vertical: {
            counter : 1,
            nextChar : invalidChar
          },
          rightDiagonal: {
            counter : 1,
            nextChar : invalidChar
          },
          leftDiagonal: {
            counter : 1,
            nextChar : invalidChar
          }
        };
  
    
        let mutationPossible = true;
        for (let nextCharPos = currentCharPos + 1, previousCharPos = currentCharPos - 1, nextRowPos = currentRowPos + 1;
           mutationPossible;
           previousCharPos--, nextCharPos++, nextRowPos++) {
          
          const nextRow =  currentRowPos < dnaArr.length - 1 ? dnaArr[nextRowPos] : [];
          
          countersContainer.horizontal.nextChar = horizontalSpaceAvailable(currentRow.length, currentCharPos, mutationReps) ? currentRow.charAt(nextCharPos) : invalidChar;
          countersContainer.vertical.nextChar = verticalSpaceAvailable(dnaArr.length, currentRowPos, mutationReps) ?  nextRow.charAt(currentCharPos) : invalidChar;
          countersContainer.rightDiagonal.nextChar = 
          rightDiagonalSpaceAvailable(currentRow.length, currentCharPos, currentRowPos, mutationReps) ? nextRow.charAt(nextCharPos) : invalidChar;
          countersContainer.leftDiagonal.nextChar = 
          leftDiagonalSpaceAvailable(currentRow.length, currentCharPos, currentRowPos, mutationReps) ? nextRow.charAt(previousCharPos) : invalidChar;
  
          let stopTrail = 0;
          for (const key in countersContainer) {
            const countObj = countersContainer[key];
  
  
            countObj.counter = processMutationCounter(currentChar, countObj.nextChar, countObj.counter);
  
            
            if (countObj.counter >= mutationReps) {
              // console.log('found 4');
              return {
                message: key + 'mutation in row: ' + (currentRowPos + 1),
                mutation: true
              };
            } else if (countObj.counter === 0) {
              stopTrail++;
            }
          }
  
          // console.log('currentRowPos');
          // console.log(currentRowPos);
          // console.log('currentChar');
          // console.log(currentChar);
          // console.log('currentCharPos');
          // console.log(currentCharPos);
          // console.log('nextCharPos');
          // console.log(nextCharPos);
          // console.log('nextRow');
          // console.log(nextRow);
          // console.log('countersContainer');
          // console.log(countersContainer);
  
          if (stopTrail >= 4) {
            // console.log('trail break');
            mutationPossible = false;
          }
  
          // console.log('next char end--------------------------')
  
    
        }
        // console.log('current char end--------------------------')
      }
      // console.log('row end--------------------------')
    }
  
    // console.log('reachedEnd')
    return {
      message:'No mutation',
      mutation: false
    };
    
}
  
function processMutationCounter(currentChar, compareChar, initialCount) {

    return initialCount > 0 && currentChar === compareChar ? initialCount + 1: 0;
}
  
  function horizontalSpaceAvailable(dnaSequenceLength, currentCharPos, mutationReps) {
    const charsPending  = dnaSequenceLength - currentCharPos;
    //-1 to count the currentPos as well
    return charsPending >= mutationReps;
  }
  
  function verticalSpaceAvailable(dnaSequenceLength, currentRowPos, mutationReps) {
    const rowsPending  = dnaSequenceLength - currentRowPos;
    //-1 to count the currentRow as well
    return rowsPending >= mutationReps;
  }
  
  function rightDiagonalSpaceAvailable(dnaSequenceLength, currentCharPos, currentRowPos, mutationReps) {
    const charsPending  = dnaSequenceLength - currentCharPos;
    const rowsPending  = dnaSequenceLength - currentRowPos;
  
    return charsPending >= mutationReps && rowsPending >= mutationReps
  }
  
  function leftDiagonalSpaceAvailable(dnaSequenceLength, currentCharPos, currentRowPos, mutationReps) {
    const rowsPending  = dnaSequenceLength - currentRowPos;
    return currentCharPos + 1 >= mutationReps && rowsPending >= mutationReps
  }
  
  function isValidChar(char, validChars) {
  
    return validChars.includes(char);
  }
  
  
  exports.hasMutation = hasMutation;
  exports.processMutationCounter = processMutationCounter;
  exports.horizontalSpaceAvailable = horizontalSpaceAvailable;
  exports.verticalSpaceAvailable = verticalSpaceAvailable;
  exports.rightDiagonalSpaceAvailable = rightDiagonalSpaceAvailable;
  exports.leftDiagonalSpaceAvailable = leftDiagonalSpaceAvailable;
  exports.isValidChar = isValidChar;