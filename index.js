Genetic = require('genetic-js');

var genetic = Genetic.create();

genetic.optimize = Genetic.Optimize.Maximize;
genetic.select1 = Genetic.Select1.Tournament2;
genetic.select2 = Genetic.Select2.Tournament2;

genetic.seed = function () {

}

genetic.mutate = function (entity) {

}

genetic.crossover = function (mother, father) {

}

genetic.fitness = function (entity) {

}

genetic.generation = function (pop, generation, stats) {

}

genetic.notification = function (pop, generation, stats, isFinished) {

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