'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Communications", {
      recordID: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      messageUUID: {
        type: Sequelize.UUID,
        unique: true,
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      age: {
        type: Sequelize.INTEGER
      },
      department: {
        type: Sequelize.STRING
      },
      campus: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      partition: {
        type: Sequelize.INTEGER
      },
      offset: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Communications")
  }
}
