class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
    }
}

class BadRequestError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 400;
    }
}

class NotFoundError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 404;
    }
}

class UnauthorizedError extends CustomError {
    constructor(message) {
        super(message);
        this.statusCode = 401;
    }
}

export {
    CustomError,
    BadRequestError,
    NotFoundError,
    UnauthorizedError
}; 