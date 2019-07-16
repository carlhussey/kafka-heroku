'use strict'

module.exports = (sequelize, DataTypes) => {

    const Communications = sequelize.define('Communications', {
        recordID: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            autoIncrement: true
        },
        messageUUID: {
            type: DataTypes.UUID,
            unique: true,
        },
        firstName: {
            type: DataTypes.STRING
        },
        lastName: {
            type: DataTypes.STRING
        },
        age: {
            type: DataTypes.INTEGER
        },
        department: {
            type: DataTypes.STRING
        },
        campus: {
            type: DataTypes.STRING
        },
        state: {
            type: DataTypes.STRING
        },
        partition: {
            type: DataTypes.INTEGER
        },
        offset: {
            type: DataTypes.INTEGER
        }
    })

    return Communications
    
}