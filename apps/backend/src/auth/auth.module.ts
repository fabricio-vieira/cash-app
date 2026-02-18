import { Module } from '@nestjs/common'
import { DbModule } from 'src/db/db.module'
import { AuthenticationController } from './authentication.controller'
import { UserPrisma } from './user.prisma'
import { CryptoBcrypt } from './cripto.bcrypt'

@Module({
    imports: [DbModule],
    controllers: [AuthenticationController],
    providers: [UserPrisma, CryptoBcrypt],
})
export class AuthModule {}
