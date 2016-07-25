Genetic = require('genetic-js');
_ = require('lodash');

FITNESS_VALUES = [1, 2, 4, 8, 16, 32, 64, 128, 256];

calculateFitness = function (fitness, value) {
  return fitness | FITNESS_VALUES[value - 1];
}

var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament3;
genetic.select2 = Genetic.Select2.Tournament3;

genetic.seed = function () {
  var randomSolution = _.cloneDeep(this.userData.sudoku);
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (randomSolution[i][j] === null) {
        randomSolution[i][j] = Math.floor(Math.random() * 9 + 1);
      }
    }
  }
  return randomSolution;
}

genetic.mutate = function (entity) {
  var i = Math.floor(Math.random() * 9);
  var j = Math.floor(Math.random() * 9);

  // avoid mutation on the fixed values
  if (!this.userData.sudoku[i][j]) {
    entity[i][j] = Math.floor(Math.random() * 9 + 1);
  }
  return entity;
}

genetic.crossover = function (mother, father) {
  var daughter = mother;
  var son = daughter;
  var fatherRow = Math.floor(Math.random() * 9);
  var motherRow = Math.floor(Math.random() * 9);

  son[fatherRow] = mother[motherRow];
  daughter[motherRow] = father[fatherRow];

  return [son, daughter];
}

genetic.fitness = function (entity) {
  var fitness = 0;

  for (var i = 0; i < 9; i++) {
    var rowFitness = 0;
    var columnFitness = 0;

    for (var j = 0; j < 9; j++) {
      var rowVal = entity[i][j];
      var colVal = entity[j][i];

      rowFitness = calculateFitness(rowFitness, rowVal);
      columnFitness = calculateFitness(columnFitness, colVal);
    }

    // Avoid higher values to be more valuable, every number set is worth 1 point
    for (var n = 0; n < FITNESS_VALUES.length; n++) {
      if ((rowFitness & FITNESS_VALUES[n]) === FITNESS_VALUES[n]) {
        fitness += 1;
      }
      if ((columnFitness & FITNESS_VALUES[n]) === FITNESS_VALUES[n]) {
        fitness += 1;
      }
    }
  }
  // TODO fitness for 3*3 blocks

  return fitness;
}

genetic.generation = function (pop, generation, stats) {
  return stats.maximum <= 162;
}

genetic.notification = function (pop, generation, stats, isFinished) {
  if (isFinished) {
    console.log(pop[0].entity);
    console.log(stats);
  }
}

var config = {
  "iterations": 1000
  , "size": 250
  , "crossover": 0.1
  , "mutation": 0.8
  , "skip": 20
  , "webWorkers": true
  , "fittestAlwaysSurvives": true
};

var userData = {
  sudoku: [
    [null, null, 6, 3, null, 5, 7, null, null],
    [null, 9, 2, 7, null, null, null, 4, null],
    [3, null, null, null, 9, null, null, 2, 5],
    [8, null, null, null, 6, null, null, 1, 7],
    [null, null, 7, 5, null, 8, 2, null, null],
    [9, 2, null, null, 3, null, null, null, 6],
    [1, 8, null, null, 4, null, null, null, 2],
    [null, 6, null, null, null, 9, 3, 8, null],
    [null, null, 5, 8, null, 1, 9, null, null]
  ]
};

genetic.evolve(config, userData);