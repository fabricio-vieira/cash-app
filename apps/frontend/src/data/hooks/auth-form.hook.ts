'use client'

import { useState } from 'react'
import useApi from './api.hook'

export type UserDTO = {
    name: string
    email: string
    password: string
}

export default function useAuthForm() {
    const [modo, setModo] = useState<'register' | 'login'>('register')
    const [user, setUser] = useState<UserDTO>({ name: '', email: '', password: '' })

    const { post } = useApi()

    async function register(user: UserDTO) {
        try {
            await post('/auth/register', user)
            setModo('login')
            setUser({ name: '', email: '', password: '' })
            alert('Usuário registrado com sucesso')
        } catch (error) {
            console.log(error)
            alert((error as any).message)
        }
    }

    function login(user: UserDTO) {
        console.log(user)
        setUser({ name: '', email: '', password: '' })
    }

    return {
        modo,
        user,
        setModo,
        setUser,
        login,
        register,
    }
}
