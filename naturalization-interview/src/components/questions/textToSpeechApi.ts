import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const textToSpeech = createApi({
  reducerPath: "textToSpeech",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/",
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  endpoints: (build) => ({
    textToSpeechAPI: build.mutation<string, string>({
      query: (text) => ({
        url: "tts",
        method: "POST",
        body: JSON.stringify({ text }),
      }),
      transformResponse: (objectUrl: string) => objectUrl,
    }),
  }),
});
