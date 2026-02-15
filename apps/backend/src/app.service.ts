import { Injectable } from '@nestjs/common'
import User from '@cash-app/auth'

export class AppService {
    getHello(): string {
        return `Teste`
    }
}
