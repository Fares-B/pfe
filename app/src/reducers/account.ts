import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../store'

// Define a type for the slice state
interface AccountState {
  token: null | string;
}

// Define the initial state using that type
const initialState: AccountState = {
  token: localStorage.getItem("access_token") || "",
}

export const accountSlice = createSlice({
  name: 'account',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    loginRequest: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      localStorage.setItem("access_token", action.payload);
    },
    logoutRequest: (state) => {
      state.token = "";
      localStorage.removeItem("access_token");
    },
  },
});

export const {
  loginRequest,
  logoutRequest,
} = accountSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value

export default accountSlice.reducer;
