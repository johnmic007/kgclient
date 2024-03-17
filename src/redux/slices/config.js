// sidebarConfigSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarConfig: []
};

const sidebarConfigSlice = createSlice({
  name: 'sidebarConfig',
  initialState,
  reducers: {
    updateSidebarConfig(state, action) {
      state.sidebarConfig = action.payload;
    }
  }
});

export const { updateSidebarConfig } = sidebarConfigSlice.actions;

export default sidebarConfigSlice.reducer;
