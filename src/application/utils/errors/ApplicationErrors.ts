export class AgeError extends Error {
  constructor(public message = "Contact must be adult") {
    super(message);
  }
  status = 422;
}

export class NotFoundError extends Error {
  constructor(public message = "Contact not found") {
    super(message);
  }
  status = 404;
}

export class InvalidBirthDateError extends Error {
  constructor(public message = "Birth date is invalid") {
    super(message);
  }
  status = 404;
}
