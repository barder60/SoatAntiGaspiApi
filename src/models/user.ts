'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

const bcrypt = require('bcrypt');


  
  interface UserAttributes {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    role: string;
    profilImage: string;
    password: string;
  }
  
module.exports = (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> 
  implements UserAttributes {
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    role: string;
    profilImage: string;
    password: string;
    static associate(models: any) {
      
    }
  };
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        unique: 'Username already taken',

    }
    ,email: {
        type: DataTypes.STRING,
        unique: 'Email already taken',

    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    role: {
      type: DataTypes.STRING,
      defaultValue: 'visitor'
    },
    profilImage: DataTypes.STRING,
    password: {
        type: DataTypes.STRING,
        set(value) {
          const hash = bcrypt.hashSync(value, 10);
          this.setDataValue('password', hash);
        }
      },

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};