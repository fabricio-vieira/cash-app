'use client'

import Input from '@/src/components/shared/input'
import useAuthForm from '@/src/data/hooks/auth-form.hook'

export default function AuthPage() {
    const { login, register, modo, setModo, user, setUser } = useAuthForm()

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black">
            {modo === 'register' ? (
                <span className=" text-2xl text-amber-50">Registre-se</span>
            ) : (
                <span className=" text-2xl text-amber-50">Autenticação</span>
            )}
            <div className="flex flex-col gap-3 w-96">
                {modo === 'register' && (
                    <Input
                        value={user?.name ?? ''}
                        label="Nome"
                        onChangeValue={(name) => setUser({ ...user, name })}
                    />
                )}
                <Input
                    value={user?.email ?? ''}
                    label="Email"
                    onChangeValue={(email) => setUser({ ...user, email })}
                />
                <Input
                    value={user?.password ?? ''}
                    label="Senha"
                    type="password"
                    onChangeValue={(password) => setUser({ ...user, password })}
                />
            </div>

            <div className="flex flex-col gap-5 mt-5">
                <button
                    onClick={() => {
                        modo === 'register' ? register(user) : login(user)
                    }}
                    className="bg-blue-500 text-white p-2 rounded-md"
                >
                    {modo === 'register' ? 'Registrar' : 'Entrar'}
                </button>

                <button
                    onClick={() => setModo(modo === 'register' ? 'login' : 'register')}
                    className="text-blue-500"
                >
                    {modo === 'register'
                        ? 'Não tem uma conta? Registre-se'
                        : 'Já tem uma conta? Entre'}
                </button>
            </div>
        </div>
    )
}
