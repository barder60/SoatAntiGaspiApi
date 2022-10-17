'use strict';

import {
  Model, UUIDV4
} from 'sequelize';

enum OfferStatus {
    Pending,
    Active,
    Expired,
    Deleted 
  }
  interface OfferAttributes {
    id: string;
    title: string
    description: string
    email: string
    companyName: string
    address: string
    availability: Date
    expiration: Date
    status: OfferStatus
    
  }
  
module.exports = (sequelize: any, DataTypes: any) => {
  class Offer extends Model<OfferAttributes> 
  implements OfferAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     id: string;
     title: string
     description: string
     email: string
     companyName: string
     address: string
     availability: Date
     expiration: Date
     status: OfferStatus
    static associate(models: any) {
      
    }
  };
  Offer.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    companyName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    availability: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },
    expiration: {
        type: DataTypes.DATE,
        allowNull: false,
        unique: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    
  }, {
    sequelize,
    modelName: 'Offer',
  });
  return Offer;
};