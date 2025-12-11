import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { SUCCESS } from "../constant/Constant";

interface Message {
  content: string;
  type: string;
}

interface ActionState {
  message: Message;
  loading: boolean;
}

const initialState: ActionState = {
  message: {
    content: "",
    type: SUCCESS,
  },
  loading: false,
};

export const messageSlice = createSlice({
  name: "action",
  initialState,
  reducers: {
    changeMessage: (state, action: PayloadAction<Message>) => {
      state.message = action.payload;
    },
    changeLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { changeMessage, changeLoading } = messageSlice.actions;

export default messageSlice.reducer;
