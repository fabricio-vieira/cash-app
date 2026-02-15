import User from '../../src/usuario/model/user.entity'
test('Deve retornar um usuário valido', () => {
    const usuario = new User({
        name: 'Fabricio Valerio',
        email: 'fabricio@email.com',
        password: '$2a$12$IKDaDiwD9VahDt0piMCRPOKMN2R6p4S8kFffm8yaHt46tqtFoEix2',
    })

    expect(usuario).toBeInstanceOf(User)
})
