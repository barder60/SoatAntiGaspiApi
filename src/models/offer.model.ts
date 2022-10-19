import { Model, UUIDV4, Sequelize } from 'sequelize';
import { OfferAttributes, OfferStatus } from "../types/offer"


function defineOfferModel(sequelize: Sequelize, DataTypes: any) {
    class Offer extends Model<OfferAttributes> implements OfferAttributes {
        id: string;
        title: string;
        description: string;
        email: string;
        companyName: string;
        address: string;
        availability: Date;
        expiration: Date;
        status: OfferStatus;

        // static associate(models: any) { }
    }

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
            unique: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: true
            },
            unique: false
        },
        companyName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        },
        availability: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: false
        },
        expiration: {
            type: DataTypes.DATE,
            allowNull: false,
            unique: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: false
        }
    }, {
        sequelize,
        modelName: 'Offer',
    });

    return Offer;
}


export default defineOfferModel;
