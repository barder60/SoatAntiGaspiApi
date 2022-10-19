import { RequestHandler } from "express";
import { Schema } from "joi"

interface JoiObject {
    body?: Schema;
    query?: Schema;
    params?: Schema;
}

export interface Route {
    method: "get" | "post" | "put" | "delete";
    path: string;
    handler: RequestHandler;
    session?: boolean;
    sessionAllowed?: boolean;
    validator?: JoiObject;
}
