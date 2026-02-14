import { v4 as uuid, validate } from 'uuid'
export default class Id {
    readonly value: string

    constructor(value?: string) {
        this.value = value ?? uuid()
        if (!validate(this.value)) throw new Error('id.invalid!')
    }

    same(id: Id): boolean {
        return this.value === id.value
    }

    diferent(id: Id): boolean {
        return !this.same(id)
    }
}
