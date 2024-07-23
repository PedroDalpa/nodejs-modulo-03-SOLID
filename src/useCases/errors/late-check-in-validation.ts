export class LateCheckInValidate extends Error {
  constructor() {
    super('The Check-in can only be validate util 20 minutes of its creation.')
  }
}
