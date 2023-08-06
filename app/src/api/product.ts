import query from "./query";

// interface filterProps {
//   page?: number;
//   limit?: number;
//   category?: string;
//   search?: string;
//   sort?: string;
//   order?: string;
// };

interface createDealProps {

};

export const productsRequest = async () => query("/products", "GET");

export const createDealRequest = async (body: createDealProps) => query("/products", "POST", body);
