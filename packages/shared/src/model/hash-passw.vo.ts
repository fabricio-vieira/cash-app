export default class HashPassword {
    constructor(readonly value: string) {
        if (!HashPassword.isValid(value)) {
            console.log('hash.ok')
            throw new Error('hash-password.invalid')
        }
    }

    static isValid(password: string): boolean {
        const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/
        return regex.test(password)
    }
}
