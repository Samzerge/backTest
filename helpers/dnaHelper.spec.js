const dnaHelper = require('./dnaHelper');


const validChars = ['A', 'T', 'C', 'G'];
const sequenceLength = 6;
const firstPos = 0;
const halfishPos = 3;
const lastPos = 5;
const mutationReps = 4;

const initialCounter = 1;


const dnaNoMutation = [
    "ATGCGA",
    "CAGTGC",
    "TTATTT",
    "AGACGG",
    "GCGTCA",
    "TCACTG"
  ];

  const defaultMutation = [
    "ATGCGA",
    "CAGTGC",
    "TTATGT",
    "AGAAGG",
    "CCCCTA",
    "TCACTG"
  ];

  const horizontalMutation = [
    "ATGCGA",
    "CAGTGC",
    "TTTTTT",
    "AGACGG",
    "GCGTCA",
    "TCACTG"
  ];
  const verticalMutation = [
    "ATGCGA",
    "CAGTGC",
    "TTGATT",
    "AGGCGG",
    "GCGTCA",
    "TCACTG"
  ];

  const rightDiagonalMutation = [
    "ATGCGA",
    "CAGTGC",
    "TTCATT",
    "AGGCGG",
    "GCGTCA",
    "TCACTC"
  ];

  const leftDiagonalMutation = [
    "ATGCGA",
    "CAGTGC",
    "TTAATT",
    "AGACGG",
    "GAGTCA",
    "ACACTG"
  ];

test('valid character returns true', () => {
    expect(dnaHelper.isValidChar('T', validChars)).toBe(true);
});

test('invalid character returns false', () => {
    expect(dnaHelper.isValidChar('%', validChars)).toBe(false);
});

test('horizontal characters sufficient to evaluate mutation returns true', () => {
    expect(dnaHelper.horizontalSpaceAvailable(sequenceLength, firstPos, mutationReps)).toBe(true);
});

test('horizontal characters not enough to evaluate mutation returns false', () => {
    expect(dnaHelper.horizontalSpaceAvailable(sequenceLength, halfishPos, mutationReps)).toBe(false);
});

test('vertical characters sufficient to evaluate mutation returns true', () => {
    expect(dnaHelper.verticalSpaceAvailable(sequenceLength, firstPos, mutationReps)).toBe(true);
});

test('vertical characters not enough to evaluate mutation returns false', () => {
    expect(dnaHelper.verticalSpaceAvailable(sequenceLength, halfishPos, mutationReps)).toBe(false);
});

test('right diagonal characters sufficient to evaluate mutation returns true', () => {
    expect(dnaHelper.rightDiagonalSpaceAvailable(sequenceLength, firstPos, firstPos, mutationReps)).toBe(true);
});

test('right diagonal characters not enough to evaluate mutation returns false', () => {
    expect(dnaHelper.rightDiagonalSpaceAvailable(sequenceLength, lastPos, lastPos, mutationReps)).toBe(false);
});

test('left diagonal characters sufficient to evaluate mutation returns true', () => {
    expect(dnaHelper.leftDiagonalSpaceAvailable(sequenceLength, lastPos, firstPos, mutationReps)).toBe(true);
});

test('left diagonal characters not enough to evaluate mutation returns false', () => {
    expect(dnaHelper.leftDiagonalSpaceAvailable(sequenceLength, firstPos, firstPos, mutationReps)).toBe(false);
});

test('initialCounter already 0 and different chars returns 0', () => {
    expect(dnaHelper.processMutationCounter('T', 'A', 0)).toBe(0);
});

test('initialCounter already 0 and same chars returns 0', () => {
    expect(dnaHelper.processMutationCounter('T', 'T', 0)).toBe(0);
});

test('initialCounter other than 0 and different chars returns 0', () => {
    expect(dnaHelper.processMutationCounter('T', 'A', initialCounter)).toBe(0);
});

test('initialCounter already 0 and same chars returns initialCounter + 1', () => {
    expect(dnaHelper.processMutationCounter('T', 'T', initialCounter)).toBe(initialCounter + 1);
});

test('sequence with horizontal mutation returns true', () => {
    expect(dnaHelper.hasMutation(horizontalMutation, validChars, mutationReps).mutation).toBe(true);
});

test('sequence with vertical mutation returns true', () => {
    expect(dnaHelper.hasMutation(verticalMutation, validChars, mutationReps).mutation).toBe(true);
});

test('sequence with right diagonal mutation returns true', () => {
    expect(dnaHelper.hasMutation(rightDiagonalMutation, validChars, mutationReps).mutation).toBe(true);
});

test('sequence with left diagonal mutation returns true', () => {
    expect(dnaHelper.hasMutation(leftDiagonalMutation, validChars, mutationReps).mutation).toBe(true);
});

test('sequence with multiple mutation returns true', () => {
    expect(dnaHelper.hasMutation(defaultMutation, validChars, mutationReps).mutation).toBe(true);
});

test('sequence with no mutation returns false', () => {
    expect(dnaHelper.hasMutation(dnaNoMutation, validChars, mutationReps).mutation).toBe(false);
});



