import { Injectable } from '@nestjs/common'
import { iUserRepository, User, UserProps } from '@cash-app/auth'
import { PrismaService } from 'src/db/prisma.service'

@Injectable()
export class UserPrisma implements iUserRepository {
    constructor(private readonly prisma: PrismaService) {}

    async register(user: User): Promise<void> {
        console.log('create-userdb.ok', user)
        await this.prisma.user.create({
            data: {
                name: user.name.value,
                email: user.email.value,
                password: user.password.value,
            },
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        console.log('find-userdb.ok')
        try {
            const data = await this.prisma.user.findFirst({
                where: {
                    email,
                },
            })

            return data ? new User(data as UserProps) : null
        } catch (error) {
            throw new Error(`Erro: ${error.message}`)
        }
    }
}
