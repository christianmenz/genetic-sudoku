Genetic = require('genetic-js');
_ = require('lodash');

var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

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

/*genetic.mutate = function (entity) {  

}

genetic.crossover = function (mother, father) {

}*/

genetic.fitness = function (entity) {
  var fitness = 0;
  // very, very simple idea: go through rows/columns and add up all the correct ones.

  return fitness;
}

/*genetic.generation = function (pop, generation, stats) {

}*/

genetic.notification = function (pop, generation, stats, isFinished) {
  if (isFinished) {
    console.log(pop[0].entity);
  }
}

var config = {
  "iterations": 4000
  , "size": 250
  , "crossover": 0.3
  , "mutation": 0.3
  , "skip": 20
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