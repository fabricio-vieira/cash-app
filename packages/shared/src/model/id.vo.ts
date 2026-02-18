import { v4 as uuid, validate } from 'uuid'

export default class Id {
    readonly value: string

    constructor(value?: string) {
        this.value = value ?? uuid()
        console.log('gerou-id.ok')
    }

    isValid(value: string): boolean {
        return validate(value)
    }

    same(id: Id): boolean {
        return this.value === id.value
    }

    diferent(id: Id): boolean {
        return !this.same(id)
    }
}
