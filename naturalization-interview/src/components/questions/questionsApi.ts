import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { QnAs } from "../../app/types/types";

export const questionsApi = createApi({
  reducerPath: "questionsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000" }),
  endpoints: (build) => ({
    getAllQuestions: build.query< QnAs, { seed?: number; sort?: string; limit?: number }>({
      query: ({ seed, sort, limit }) => {
        const queryParams: Record<string, string> = {};

        // Conditionally add query parameters if they exist
        if (seed) queryParams.seed = seed.toString();

        if (sort) queryParams.sort = sort;
        if (limit) queryParams.limit = limit.toString();

        return {
          url: "questions",
          params: queryParams, // Use params for optional query params
        };
      },
    }),
  }),
});

export const { useGetAllQuestionsQuery } = questionsApi;
