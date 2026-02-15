export default class StrongPassword {
    constructor(readonly value: string) {
        if (!value) throw new Error('password.not_provided')

        if (value.length < 8) {
            throw new Error('password.too_short')
        }

        if (!value.match(/[A-Z]/)) {
            throw new Error(`password.less_one_uppercase`)
        }

        if (!value.match(/[a-z]/)) {
            throw new Error(`password.less_one_lowercase`)
        }

        if (!value.match(/[0-9]/)) {
            throw new Error(`password.less_one_number`)
        }

        if (!value.match(/[^A-Za-z0-9]/)) {
            throw new Error(`password.less_one_special_char`)
        }
    }
}
