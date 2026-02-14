export default class Email {
    constructor(readonly value: string) {
        if (!value) {
            throw new Error(`email.not_provided`)
        }

        if (!Email.isValid(value)) {
            throw new Error(`email.invalid.`)
        }

        console.log('email.ok')
    }

    static isValid(email: string): boolean {
        const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i
        return regex.test(email)
    }
}
