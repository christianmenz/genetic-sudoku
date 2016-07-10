Genetic = require('genetic-js');

var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function () {
  var randomSolution = [];
  for (var i = 0; i < 9; i++) {
    randomSolution[i] = [];
    for (var j = 0; j < 9; j++) {
      randomSolution[i][j] = Math.floor(Math.random()*9+1); 
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

};

genetic.evolve(config, userData);