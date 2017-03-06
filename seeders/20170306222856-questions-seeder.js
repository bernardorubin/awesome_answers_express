'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
      Example:*/
      // .bulkinsert first argument is the name of the table we want to use
      // when seeding a model make sure to include createdAt and updatedAt fields
      // you can assign it a new Date() as a value
      const questions = [
        {
        title: 'John Doe',
        content: 'test',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
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
