import { Entity, EntityProps, Email, PersonName, HashPassword, Result } from '@cash-app/shared'

export interface UserProps extends EntityProps {
    name: string
    email: string
    password: string
}

export default class User extends Entity<User, UserProps> {
    readonly name: PersonName
    readonly email: Email
    readonly password: HashPassword

    constructor(readonly props: UserProps) {
        super(props)

        const trialName = Result.try(() => new PersonName(props.name))
        const trialEmail = Result.try(() => new Email(props.email))
        const trialPassword = Result.try(() => new HashPassword(props.password))

        const checkDataValidation = Result.combine([trialName, trialEmail, trialPassword])

        checkDataValidation.throwIfFailed()

        this.name = trialName.value
        this.email = trialEmail.value
        this.password = trialPassword.value
    }
}

const user = new User({
    name: 'Fabricio',
    email: 'fabr@icio@email.com',
    password: '$2a$12$IKDaDiwD9VahDt0piMCRPOKMN2R6p4S8kFffm8yaHt46tqtFoEi',
})
console.log(user)
