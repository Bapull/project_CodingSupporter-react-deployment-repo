import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  googleId: string;
  id: number;
  name: string;
  position: number;
  profilePicture: string;
  useLanguage: string;
};

interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
