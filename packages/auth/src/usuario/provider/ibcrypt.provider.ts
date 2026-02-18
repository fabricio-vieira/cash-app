export default interface iBCryptProvider {
    hash(password: string): Promise<string>
    compare(password: string, hash: string): boolean
}
