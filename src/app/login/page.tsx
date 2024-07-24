"use client"

import Button from '@/_components/button'
import { useGlobalContext } from '@/context/context'
import { FC, useState } from 'react'

const Login: FC = () => {
    const { login, loading } = useGlobalContext()
    const [username, setUsername] = useState<string>('')
    const [password, setPassword] = useState<string>('')

    const customStyle = {
        section: 'flex flex-col gap-1',
        input: 'w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out'
    }

    const onSubmit = (e: any) => {
        e?.preventDefault()
        login(username, password);
    }
    
    return (
        <main className='min-h-screen flex items-center justify-center'>
            <div className='box w-1/3 border-2 p-5'>
                <form onSubmit={onSubmit} className='flex flex-col gap-4'>
                    <div className={`${customStyle.section}`}>
                        <label>Username</label>
                        <input
                            className={`${customStyle.input}`}
                            type='text' name='username'
                            placeholder='Enter your username'
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className={`${customStyle.section}`}>
                        <label>Password</label>
                        <input
                            className={`${customStyle.input}`}
                            type='password'
                            name='username'
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                    <Button
                        color={"bg-black text-sm text-white text-center w-24 h-9"}
                    >
                       {loading ? 'Loading...' : 'Submit'}
                    </Button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Login