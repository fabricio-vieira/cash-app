import User from '../model/user.entity'

export default interface iUserRepository {
    register(user: User): Promise<void>
    findByEmail(email: string): Promise<User | null>
}
