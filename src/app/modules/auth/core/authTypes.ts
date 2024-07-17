export interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    role: number;
    // Add other fields as necessary
}

export interface AuthContextType {
    auth: AuthModel | undefined;
    saveAuth: (auth: AuthModel | undefined) => void;
    currentUser: User | undefined;
    setCurrentUser: (user: User | undefined) => void;
    logout: () => void;
}

export interface AuthProviderProps {
    children: React.ReactNode;
}

export interface AuthModel {
    api_token: string;
}

export interface UserModel {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    // Add other fields as necessary
}
