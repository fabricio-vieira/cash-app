export default interface iUseCase<Input, Output> {
    execute(input: Input): Promise<Output>
}
