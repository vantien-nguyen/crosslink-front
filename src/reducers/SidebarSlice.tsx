import { ReactElement } from 'react';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  navigation: number;
  view: ReactElement | undefined;
  openSidebarMd: boolean;
}

const initialState: SidebarState = {
  navigation: -1,
  view: undefined,
  openSidebarMd: false,
};

export const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    changeNavigation: (state, action: PayloadAction<number>) => {
      state.navigation = action.payload;
    },
    changeView: (state, action: PayloadAction<ReactElement>) => {
      state.view = action.payload;
    },
    setOpenSidebarMd: (state, action: PayloadAction<boolean>) => {
      state.openSidebarMd = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeNavigation, changeView, setOpenSidebarMd } =
  sidebarSlice.actions;

export default sidebarSlice.reducer;
