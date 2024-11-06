const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize('daily_routine', 'root', 'root', {
  host: 'db',
  dialect: 'mysql',
  port: 3306,
  logging: false
});

class Reminder extends Model {
  static init(sequelize) {
    super.init({
      task: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      reminderTime: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isDate: true,
          notEmpty: true
        }
      }
    }, {
      sequelize,
      modelName: 'Reminder',
      tableName: 'reminders',
      timestamps: false
    });
  }
}

Reminder.init(sequelize);

module.exports = Reminder;
