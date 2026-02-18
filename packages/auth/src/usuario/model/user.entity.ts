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

        const trialName = Result.try<PersonName>(() => new PersonName(props.name))
        const trialEmail = Result.try<Email>(() => new Email(props.email))

        const trialPassword = props.password
            ? Result.try<HashPassword>(() => new HashPassword(props.password))
            : null

        const checkDataValidation = Result.combine([trialName, trialEmail, trialPassword])

        checkDataValidation.throwIfFailed()

        this.name = trialName.value!
        this.email = trialEmail.value!
        this.password = trialPassword?.value!
        console.log('user-inst.ok')
    }

    // withoutPassword(): Partial<User> {
    //     return this.clone({ ...this.props, password: undefined })
    // }
}
