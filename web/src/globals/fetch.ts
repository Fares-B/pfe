import { LoginProps, NODE_ENV_TYPE, RegisterProps } from "./type";


type medthodType = "PUT"|"POST"|"GET";

interface OptionsProps {
    method: medthodType;
    headers: string[][] | Record<string, string> | Headers| any;
    body?: string;
}

const API_PROD_URL = "https://api-pfe.vercel.app";
const API_TEST_URL = "https://pfe-dev.vercel.app";
const BACKEND_BASE_URL = process.env.NODE_ENV === NODE_ENV_TYPE.PRODUCTION ? API_PROD_URL : process.env.NODE_ENV === NODE_ENV_TYPE.TEST ? API_TEST_URL : "http://localhost:3000";


const query = async (path: string, method: medthodType, body: any = null): Promise<any> => {
    const token = localStorage.getItem("token");
    const options: OptionsProps = {
        method,
        headers: {
            "Content-Type": "application/json",
            Authorization: "",
        },
    };
    if(token) options.headers.Authorization = "Bearer " + token;
    if(body) options.body = JSON.stringify(body);
    try {
        const res = await fetch(BACKEND_BASE_URL + path, options);
        const data = await res.json();
        return data;
    } catch (err) {
        return console.log(err);
    }
}

// PUBLIC
export const loginRequest = async (body: LoginProps) => query("/login", "POST", body);

export const registerRequest = async (body: RegisterProps) => query("/register", "POST", body);

// PRIVATE

export default query;
