const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  data: {},
  studentsEnrolled: 400,
  studentsPlaced: 200,
  yetToBePlaced: 200,
  totalPercentage: 0
};

const slice = createSlice({
  name: 'placement',
  initialState,
  reducers: {
    addData(state, action) {
      state.data = action.payload;
    }
  }
});

export const { addData } = slice.actions;

export default slice.reducer;
