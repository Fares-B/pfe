import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store'


export interface ProductType {
  id: string;
  verifiedBy: null | string;
  title: string;
  description: string;
  price: number|undefined;
  oldPrice: number|undefined;
  discountCode: string|undefined;
  author: {
    id: string;
    username: string;
  };
  link: string;
  groups: any[];
  image: string;
  rate: number;
  userRated: number;
  views: number;
  comments: any[];
  deleted: boolean;
  visible: boolean;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
}
// Define a type for the slice state
interface ProductState {
  total: number;
  page: number;
  limit: number;
  product: null | ProductType;
  products: ProductType[];
  action: { loading : boolean, error: null | string };
}

// Define the initial state using that type
const initialState: ProductState = {
  total: 0,
  page: 1,
  limit: 10,
  product: null,
  products: [],
  action: {
    loading : false,
    error: null
  },
}

export const productSlice = createSlice({
  name: 'product',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    productsRequest: (state, action: PayloadAction<{ page: number, limit: number, search: string }>) => {
      state.page = action.payload.page;
      state.limit = action.payload.limit;
      state.action = {
        loading: true,
        error: null
      };
    },
    productsSuccess: (state, action: PayloadAction<{ total: number, data: ProductType[] }>) => {
      state.total = action.payload.total;
      state.products = action.payload.data;
      state.action.loading = false;
    },
    productsFailure: (state, action: PayloadAction<string>) => {
      state.action = {
        loading: false,
        error: action.payload,
      };
    },
    productRequest: (state, action: PayloadAction<string>) => {
      state.action = {
        loading: true,
        error: null
      };
    },
    productSuccess: (state, action: PayloadAction<ProductType>) => {
      state.product = action.payload;
      state.action.loading = false;
    },
    productFailure: (state, action: PayloadAction<string>) => {
      state.action = {
        loading: false,
        error: action.payload,
      };
    },
  },
});

export const {
  productsRequest,
  productsSuccess,
  productsFailure,
  productRequest,
  productSuccess,
  productFailure,
} = productSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default productSlice.reducer;
