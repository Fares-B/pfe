export interface LoginProps {
    phone: string;
    password: string;
}

export interface RegisterProps extends LoginProps {
    username: string;
    email?: string;
}
