import { iUseCase, StrongPassword, Result, HashPassword } from '@cash-app/shared'
import iUserRepository from '../provider/iuser.repository'
import iBCryptProvider from '../provider/ibcrypt.provider'
import User from '../model/user.entity'

type Input = {
    name: string
    email: string
    password: string
}

export default class UserRegister implements iUseCase<Input, void> {
    constructor(
        private readonly repo: iUserRepository,
        private readonly cripto: iBCryptProvider
    ) {}
    async execute(input: Input): Promise<void> {
        console.log('usecase-inside.ok')

        const strongPasswordTrial = Result.try<StrongPassword>(
            () => new StrongPassword(input.password)
        )

        const validationStrPasswTrial = Result.combine([strongPasswordTrial])
        validationStrPasswTrial.throwIfFailed()

        const hashTrial = await Result.trySync(() =>
            this.cripto.hash(strongPasswordTrial.value.value)
        )

        const userTrial = Result.try<User>(
            () =>
                new User({
                    name: input.name,
                    email: input.email,
                    password: hashTrial.value,
                })
        )

        const validationResult = Result.combine([userTrial, hashTrial])
        validationResult.throwIfFailed()

        const user = userTrial.value
        console.log(user)

        const userExists = await this.repo.findByEmail(user.email.value)

        if (userExists) throw new Error('user.exists')

        await this.repo.register(user!)
    }
}
