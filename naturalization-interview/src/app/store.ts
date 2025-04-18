import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { questionsApi } from "../components/questions/questionsApi";
import questionsReducer from "../components/questions/questionsSlice";
import { textToSpeechApi } from "../components/speech/textToSpeechApi";

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    [questionsApi.reducerPath]: questionsApi.reducer,
    [textToSpeechApi.reducerPath]: textToSpeechApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      questionsApi.middleware,
      textToSpeechApi.middleware
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Or from '@reduxjs/toolkit/query/react'

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch);
