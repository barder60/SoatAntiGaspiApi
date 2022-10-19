export class ApiError {
    msg: string;
    code: number;

    constructor(msg: string, code: number = 400) {
        this.msg = msg;
        this.code = code;
    }
}