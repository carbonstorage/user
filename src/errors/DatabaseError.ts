import CustomError from './CustomError';

class DatabaseError extends CustomError {
  errorCode = 500;
  errorType = 'DATABASE_ERROR';

  constructor(message: any, private property: string) {
    super(message);

    Object.setPrototypeOf(this, DatabaseError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message, property: this.property }];
  }
}

export default DatabaseError;
