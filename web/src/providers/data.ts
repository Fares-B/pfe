import { fetchUtils } from 'react-admin';

const API_END_POINT = process.env.REACT_APP_BACKEND_BASE_URL || 'http://localhost:3000';

// function dataProvider() {

//   return simpleRestProvider(API_END_POINT, httpClient);
// }


const data = (apiUrl: string) => {
  const httpClient = (url: string, options: any = {}) => {
    const token = localStorage.getItem('token');
    options.headers = new Headers({ Accept: 'application/json' });
    if (token) {
      options.headers.set('Authorization', `Bearer ${token}`);
    }
    
    return fetchUtils.fetchJson(url, options);
  };
// Promise<DeleteResult<RecordType>

  return {
    getList: async (resource: any, params: any) => {
      // const query = {
      //   pagination: params.pagination,
      //   sort: params.sort,
      //   // filter: filters,
      // };
      const queries = `sort=${params.sort.field}&_order=${params.sort.order}`; // 
      const url = `${apiUrl}/${resource}?${queries}`;
      const { headers, json } = await httpClient(url);
      return json;
    },
    getOne: (resource: any, params: any ) => {
      let url = `${apiUrl}/${resource}/${params.id}`;
      // if params.meta add query to url
      if(params.meta) {
        const queries = Object.keys(params.meta).map(key => `${key}=${params.meta[key]}`).join('&');
        url = `${url}?${queries}`;
      }
      return httpClient(url).then(({ json }) => ({ data: json }));
    },
    getMany: () => Promise.reject(),
    getManyReference: () => Promise.reject(),
    update: (resource: string, params: any) => 
      httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'PUT',
        body: JSON.stringify(params.data),
      })
        .then(({ json }) => json)
        .catch(() => Promise.reject()),
    updateMany: () => Promise.reject(),
    create: (resource: string, params: any) =>
      httpClient(`${apiUrl}/${resource}`, {
        method: 'POST',
        body: JSON.stringify(params.data),
      })
        .then(({ json }) => json)
        .catch(() => Promise.reject()),
    delete: (resource: string, params: any) => 
      httpClient(`${apiUrl}/${resource}/${params.id}`, {
        method: 'DELETE',
      })
        .then(({ json }) => json)
        .catch(() => Promise.reject()),
    deleteMany: () => Promise.reject(),
    // deleteMany: (resource: string, params: [any]) => {
    //   return params.forEach((param) => {
    //     return httpClient(`${apiUrl}/${resource}/${param.id}`)
    //       .then(({ json }) => json)
    //       .catch(() => Promise.reject());
    //   });
    // },
  };
};

export default data(API_END_POINT);
