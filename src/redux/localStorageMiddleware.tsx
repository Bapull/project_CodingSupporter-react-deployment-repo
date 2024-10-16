import { Middleware } from "@reduxjs/toolkit";

// 상태 저장 미들웨어
const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  localStorage.setItem("state", JSON.stringify(state));
  return result;
};

export default localStorageMiddleware;
