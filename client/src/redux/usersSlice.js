import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const usersSlice = createSlice({
    name : "users",
    initialState: {
        user : null
    },
    reducers: {
        SetUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { SetUser } = usersSlice.actions;

export const fetchUser = () => async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:5000");
      const user = response.data;
  
      dispatch(SetUser(user));
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };
export default usersSlice.reducer;