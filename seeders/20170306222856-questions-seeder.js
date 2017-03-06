'use strict';
// load faker package
const faker = require('faker');

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:*/

      // when seeding a model make sure to include createdAt and updatedAt fields
      // you can assign it a new Date() as a value
      // Array.from is method to create arrays from various array-like objects
      // and iterable things
      // it also be used as follows to create an array of determinate size:
      // - first argument an object {length: <array-size>}
      // - second argument a callback whose return value will be used for
      // array values (similar to mapping over the array)

      // an array of that size will be created
      const questions = Array.from(
        {length: 20},
        (value, index) => ({
          title: faker.lorem.words(3),
          content: faker.lorem.paragraphs(2),
          createdAt: new Date(),
          updatedAt: new Date()
        })
      )
    // .bulkinsert first argument is the name of the table we want to use
    // the second argument is an array of objects where each object has key and values representing the columns of the table
      return queryInterface.bulkInsert('Questions', questions, {});
  },

  // sequelize seeds also have a reverse operation
  // we can tell it to delete all Questions in this context
  // to run it use sequelize db:seed:undo
  down: function (queryInterface, Sequelize) {

      return queryInterface.bulkDelete('Question', null, {});
  }
};
