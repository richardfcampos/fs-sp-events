import React, { useState } from 'react';
import Modal from '@/components/modal/modal';
import { useAuth } from '@/context/authContext';
import { useApi } from "@/hooks/useApi"
import { UserData } from "@/interfaces/auth/AuthInterface"

interface LoginModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps)  {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidCredentials, setInvalidCredentials] = useState(false)
    const { post } = useApi()


    const authenticateUser = async (username:string, password:string): Promise<UserData|undefined> => {
        try {
            return  await post<UserData|undefined>(`http://localhost:3001/api/auth/login`, {username, password})
        } catch (error) {
            console.log(error)
            setInvalidCredentials(true)
            setPassword('')
            setEmail('')
        }

    };

    const handleLogin = async () => {
        const isAuthenticated = await authenticateUser(email, password);

        if (isAuthenticated) {
            login(isAuthenticated);
            setInvalidCredentials(false)
            onClose();
        } else {
            setInvalidCredentials(true)
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h2 className="text-2xl font-semibold mb-4 text-black">Login</h2>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 text-black"
            />
            <button
                onClick={handleLogin}
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                Login
            </button>
            { invalidCredentials && <h3 className="text-red-700">
                invalid credentials
            </h3>
            }
        </Modal>
    );
};
