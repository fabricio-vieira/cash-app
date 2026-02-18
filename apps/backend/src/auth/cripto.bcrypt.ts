import { Injectable } from '@nestjs/common'
import { iBCryptProvider, User, UserProps } from '@cash-app/auth'
import * as bcrypt from 'bcrypt'

@Injectable()
export class CryptoBcrypt implements iBCryptProvider {
    async hash(password: string): Promise<string> {
        console.log('bcrypt', password)
        const salt = await bcrypt.genSalt(12)
        return await bcrypt.hash(password, 12)
    }
    compare(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash)
    }
}
