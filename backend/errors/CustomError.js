class CustomError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500; // Default status code
  }
}

export default CustomError; 