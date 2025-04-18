import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const textToSpeechApi = createApi({
  reducerPath: "textToSpeechApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
  endpoints: (build) => ({
    textToSpeech: build.mutation<string, string>({
      query: (text) => ({
        url: "tts",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
        responseHandler: async (response) => {
          const blob = await response.blob();
          return URL.createObjectURL(blob);
        },
      }),
    }),
  }),
});

export const { useTextToSpeechMutation } = textToSpeechApi;
