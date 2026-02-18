export default class PersonName {
    readonly value: string

    constructor(value: string, min: number = 3, max: number = 60) {
        this.value = value
        console.log('pname.ok')

        if (!value) {
            throw new Error(`name.not-provided`)
        }

        if (value.length < min) {
            throw new Error('name.too-short')
        }

        if (value.length > max) {
            throw new Error('name.too-long')
        }

        if (!/^[a-zA-ZÀ-ÿ\s]+$/.test(value)) {
            throw new Error(`name.invalid`)
        }

        if (value.trim().split(' ').length < 2) {
            throw new Error('surname.required')
        }
    }

    static isValid(value: string): boolean {
        try {
            new PersonName(value)
            return true
        } catch (error) {
            return false
        }
    }
}
