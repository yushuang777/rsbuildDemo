import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './pages/reduxTest/reducer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

// 导出 RootState 和 AppDispatch 类型
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
