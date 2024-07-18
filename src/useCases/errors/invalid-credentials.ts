export class InvalidCredentialError extends Error {
  constructor() {
    super('User or password is incorrect.')
  }
}
