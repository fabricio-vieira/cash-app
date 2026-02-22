// domain-error.ts
export default class DomainError extends Error {
    constructor(
        message: string,
        public readonly errors: any[] = [],
        public readonly statusCode: number = 422
    ) {
        super(message)
        this.name = 'DomainError'
    }
}
