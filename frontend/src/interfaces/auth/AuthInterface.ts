export interface AuthContextType {
    isAuthenticated: boolean;
    login: (userData: UserData) => void;
    logout: () => void;
    userData: UserData | null;
}
export interface User {
    email: string;
    id: number;
    name: string;
    role: 'Admin' | 'User';
}
export interface UserData {
    token: string;
    user: User;
}
