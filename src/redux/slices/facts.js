import axios from 'axios';

const { createSlice } = require('@reduxjs/toolkit');

const initialState = {
  posts: []
};

const slice = createSlice({
  name: 'facts',
  initialState,
  reducers: {
    addPost: (state, action) => {
      state.posts.push(action.payload);
    }
  }
});

export const { addPost } = slice.actions;

export default slice.reducer;

export function getAllPosts() {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/blog/posts/all');
      dispatch(slice.actions.getPostsSuccess(response.data.posts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
