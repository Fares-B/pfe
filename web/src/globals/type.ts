export interface LoginProps {
    phone: string;
    password: string;
}

export interface RegisterProps extends LoginProps {
    username: string;
    email?: string;
}

export const NODE_ENV_TYPE = {
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    TEST: "test",
    UNDEFINED: undefined,
}