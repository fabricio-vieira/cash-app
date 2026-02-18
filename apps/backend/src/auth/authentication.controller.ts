import { Body, Controller, Post } from '@nestjs/common'
import { UserPrisma } from './user.prisma'
import { CryptoBcrypt } from './cripto.bcrypt'
import { UserRegister, UserProps } from '@cash-app/auth'

@Controller('auth')
export class AuthenticationController {
    constructor(
        private readonly repo: UserPrisma,
        private cripto: CryptoBcrypt
    ) {}

    @Post('register')
    async register(@Body() usuario: UserProps) {
        const useCase = new UserRegister(this.repo, this.cripto)
        console.log('controller-start.ok')
        await useCase.execute({
            name: usuario.name,
            email: usuario.email,
            password: usuario.password,
        })
        return {
            message: 'Register OK',
        }
    }
}
