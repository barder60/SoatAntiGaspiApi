declare enum OfferStatus {
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

export { OfferAttributes, OfferStatus };