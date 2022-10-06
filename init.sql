CREATE SCHEMA IF NOT EXISTS antigaspi;

CREATE TABLE IF NOT EXISTS antigaspi.Offers (
    Id uuid PRIMARY KEY,
    Title TEXT NOT NULL,
    Description TEXT NOT NULL,
    Email TEXT NOT NULL,
    CompanyName TEXT NOT NULL,
    Address TEXT NOT NULL,
    Availability TIMESTAMPTZ,
    Expiration TIMESTAMPTZ,
    Status INTEGER NOT NULL
);

INSERT INTO antigaspi.Offers(Id, Title, Description, Email, CompanyName, Address, Status)
VALUES ('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Super bureau', 'Mon bureau d amour', 'laurent.pichet@soat.fr', 'Soat', '5 rue des frigos', 1);