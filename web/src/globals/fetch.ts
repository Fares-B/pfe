import { LoginProps, RegisterProps } from "./type";


type medthodType = "PUT"|"POST"|"GET";

interface OptionsProps {
    method: medthodType;
    headers: string[][] | Record<string, string> | Headers| any;
    body?: string;
}


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
        const res = await fetch(process.env.REACT_APP_BACKEND_BASE_URL + path, options);
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
