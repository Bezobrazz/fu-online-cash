import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import {
  authReducer,
  cartReducer,
  CartState,
  categoriesReducer,
  salePointsReducer,
  productsReducer,
  cashboxesReducer,
} from "../redux";

const persistConfig = {
  key: "cart",
  version: 1,
  storage,
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: persistReducer<CartState>(persistConfig, cartReducer),
    categories: categoriesReducer,
    salePoints: salePointsReducer,
    products: productsReducer,
    cashboxes: cashboxesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
