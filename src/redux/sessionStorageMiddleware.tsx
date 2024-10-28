import { Middleware } from "@reduxjs/toolkit";

// 세션 스토리지 미들웨어 (새로고침 시에도 상태 유지)
const sessionStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  sessionStorage.setItem("reduxState", JSON.stringify(state));
  return result;
};

export default sessionStorageMiddleware;