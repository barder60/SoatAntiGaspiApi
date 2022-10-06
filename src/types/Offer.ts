import { OfferStatus, OfferStatusValues } from "./OfferStatus"
import validator from "validator";
import { ValidationResult } from "./ValidationResult";

export class Offer {
    id: string
    title: string
    description: string
    email: string
    companyName: string
    address: string
    availability: Date
    expiration: Date
    status: OfferStatus

    public getValidationResult(): ValidationResult {
        const errors = []
        if(validator.isEmpty(this.title))
            errors.push('Title is required');
        if(!validator.isAlphanumeric(this.title))
            errors.push('Title is incorrect');
        if(validator.isEmpty(this.description))
            errors.push('Description is required');
        if(!validator.isAlphanumeric(this.description))
            errors.push('Description is incorrect');
        if(validator.isEmpty(this.email))
            errors.push('Email is required');
        if(!validator.isEmail(this.email))
            errors.push('Email is incorrect');

            
        if(!OfferStatusValues.includes(this.status))
            errors.push('Status is incorrect');
        return {isValid: (errors.length > 0), errors}
    }
}