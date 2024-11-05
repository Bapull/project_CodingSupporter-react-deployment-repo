import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sessionStorageMiddleware from "./sessionStorageMiddleware";

// 세션 스토리지에서 상태 불러오기
const loadState = () => {
  try {
    const serializedState = sessionStorage.getItem("reduxState");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from sessionStorage:", err);
    return undefined;
  }
};

const preloadedState = loadState();

// Redux 스토어 생성
const store = configureStore({
  reducer: {
    user: userReducer,
  } as any,
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
