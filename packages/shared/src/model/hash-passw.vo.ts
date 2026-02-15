export default class HashPassword {
    constructor(readonly value: string) {
        if (!HashPassword.isValid(value)) {
            throw new Error('hash-password.invalid')
        }

        console.log('Hash Ok')
    }

    static isValid(password: string): boolean {
        const regex = /^\$2[ayb]\$[0-9]{2}\$[A-Za-z0-9\.\/]{53}$/
        return regex.test(password)
    }
}
