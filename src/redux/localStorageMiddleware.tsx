import { Middleware } from "@reduxjs/toolkit";

// 로컬 스토리지 미들웨어 (새로고침 시에도 상태 유지)
const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem("state", JSON.stringify(state));
  return result;
};

export default localStorageMiddleware;
