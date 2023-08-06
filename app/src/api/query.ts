type medthodType = "PUT" | "POST" | "GET";

interface OptionsProps {
  method: medthodType;
  headers: string[][] | Record<string, string> | Headers | any;
  body?: string;
}


const query = async (path: string, method: medthodType, body: any = null): Promise<any> => {
  const token = localStorage.getItem("access_token");
  const options: OptionsProps = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "",
    },
  };
  if (token) options.headers.Authorization = "Bearer " + token;
  if (body) options.body = JSON.stringify(body);

  return new Promise((resolve, reject) => {
    fetch(process.env.REACT_APP_BACKEND_BASE_URL + path, options)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
}

export default query;
