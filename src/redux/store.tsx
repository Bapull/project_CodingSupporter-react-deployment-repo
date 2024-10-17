import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import sessionStorageMiddleware from "./sessionStorageMiddleware"; // 세션 스토리지 ( 새로고침시에도 상태 유지 )
// import localStorageMiddleware from "./localStorageMiddleware";     // 로컬 스토리지 ( 영구히 저장)

// 로컬 스토리지 방식
/* const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    return undefined;
  }
}; */

// 로그인 정보 담아두기
// 세션 스토리지 방식
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

// 로컬 스토리지 방식 (스토어 생성)
/* const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
}); */

// 세션 스토리지 방식 (스토어 생성)
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
