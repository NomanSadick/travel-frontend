import { packageApi } from '@/features/packages/packageApi';
import { configureStore } from '@reduxjs/toolkit';


export const store = configureStore({
  reducer: {
    [packageApi.reducerPath]: packageApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(packageApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


