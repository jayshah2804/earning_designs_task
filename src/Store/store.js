import { configureStore, createSlice } from "@reduxjs/toolkit";

let responseData;
const initialState = [{}];

let myImageSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {
    search(state, action) {
      const filteredData = responseData.filter((item) =>
        item.alt.toLowerCase().includes(action.payload.toLowerCase())
      );
      return (state = filteredData);
    },
  },
});

const store = configureStore({
  reducer: myImageSlice.reducer,
});

export const apiData = () => {
  return async () => {
    const res = await fetch(
      "https://slightbrilliantdribbleware.jayshah280420.repl.co/"
    );
    responseData = await res.json();
  };
};

export const myImageSliceActions = myImageSlice.actions;

export default store;
