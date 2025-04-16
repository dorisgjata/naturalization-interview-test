import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { QnAs } from "../../app/types/types.ts";

export interface QnAState {
  qnas: QnAs;
}
const initialState: QnAState = {
  qnas: [],
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const question = state.qnas.find((q) => q.id === id);
      console.log(id, question);
      if (question) {
        question.isFavorite = !question.isFavorite;
      }
    },
    toggleFavorites(state, action: PayloadAction<number[]>) {
      const idsToToggle = new Set(action.payload);
      state.qnas = state.qnas.map((q) =>
        idsToToggle.has(q.id) ? { ...q, isFavorite: !q.isFavorite } : q
      );
    },
    setQuestions: (state, payload: PayloadAction<QnAs>) => {
      state.qnas = payload.payload;
    },
  },
});

export const { toggleFavorite, toggleFavorites, setQuestions } =
  questionsSlice.actions;

export default questionsSlice.reducer;
