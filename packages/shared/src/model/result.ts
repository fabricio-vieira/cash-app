import DomainError from './domain-errors'

export default class Result<Type> {
    constructor(
        readonly value: Type,
        readonly errors: any[] = []
    ) {}

    static success<Type>(value: any): Result<Type> {
        return new Result(value)
    }

    static fail<Type>(errors: any[]): Result<Type | any> {
        return new Result(undefined, errors)
    }

    static try<Type>(fn: () => any): Result<Type | any> {
        try {
            console.log('result-try.ok')
            return Result.success(fn())
        } catch (error: any) {
            return Result.fail([error])
        }
    }
    static async trySync(fn: () => Promise<any>): Promise<Result<any>> {
        try {
            console.log('trysync.ok')
            const result = await fn()
            return Result.success(result)
        } catch (error: any) {
            return Result.fail([error])
        }
    }

    static combine<Type>(results: (Result<Type> | null)[]): Result<Type | any> {
        const combinedErrors = results.filter((e) => e).flatMap((result) => result!.errors)
        console.log('result-step.ok')
        return combinedErrors.length > 0 ? Result.fail(combinedErrors) : Result.success(undefined)
    }

    throwIfFailed(): any {
        if (this.failed) {
            console.log(this.errors)
            // throw this.errors // lança array de arros
            throw new DomainError('validation.failed', this.errors, 422) // Metodo ajustado para nest lança objeto
        }
    }

    get succeeded(): boolean {
        return this.errors.length === 0
    }

    get failed(): boolean {
        return !this.succeeded
    }
}
