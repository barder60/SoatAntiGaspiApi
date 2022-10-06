import pgPromise from "pg-promise";

export const pgp = pgPromise();
export const db = pgp(`postgres://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}:${process.env.PGPORT}/`);
