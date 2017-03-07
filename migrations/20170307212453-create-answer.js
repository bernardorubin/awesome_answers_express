'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Answers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      content: {
        type: Sequelize.TEXT
      },
      QuestionId: {
        type: Sequelize.INTEGER,
        // the references property allows to configure our foreign key
        references: {
          // the model property takes a value that is the table name of the
          // this QuestionId should refer to
          model: 'Questions',
          // the key property points the column inside the Questions table
          // that should be used for the reference
          key: 'id'
        },
        // setting onDelete property to cascade will make sure that Answers
        // associated by a Question are also deleted if the Question is deleted
        onDelete: 'cascade',
        onUpdate: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Answers');
  }
};
