import { Middleware } from "@reduxjs/toolkit";

const sessionStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  const state = store.getState();
  sessionStorage.setItem("reduxState", JSON.stringify(state));
  return result;
};

export default sessionStorageMiddleware;
