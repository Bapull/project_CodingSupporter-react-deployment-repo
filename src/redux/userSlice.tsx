import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type User = {
  googleId: string;
  id: number;
  name: string;
  position: number;
  profilePicture: string;
  useLanguage: string;
};

// 유저 정보를 담는 상태
interface UserState {
  user: User | null;
  isLoggedIn: boolean;
}

// 초기 사용자 상태
const initialState: UserState = {
  user: null,
  isLoggedIn: false,
};

// 사용자 정보를 담는 리듀서
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
    updateUser(state, action: PayloadAction<Partial<User>>) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }; // 기존 user 데이터에 새로운 정보 병합
      }
    },
  },
});

// 액션 생성자 내보내기
export const { setUser, clearUser, updateUser } = userSlice.actions;
export default userSlice.reducer;
