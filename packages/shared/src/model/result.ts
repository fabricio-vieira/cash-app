export default class Result {
    constructor(
        readonly value: any,
        readonly errors: any[] = []
    ) {}

    static success(value: any): Result {
        return new Result(value)
    }

    static fail(errors: any[]): Result {
        return new Result(undefined, errors)
    }

    static try(fn: () => any): Result {
        try {
            return Result.success(fn())
        } catch (error: any) {
            return Result.fail([error])
        }
    }

    static combine(results: Result[]): Result {
        const combinedErrors = results.flatMap((result) => result.errors)
        return combinedErrors.length > 0 ? Result.fail(combinedErrors) : Result.success(undefined)
    }

    throwIfFailed(): any {
        if (this.failed) {
            throw this.errors
        }
    }

    get succeeded(): boolean {
        return this.errors.length === 0
    }

    get failed(): boolean {
        return !this.succeeded
    }
}
