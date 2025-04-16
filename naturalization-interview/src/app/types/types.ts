export type QnA = {
  question: string;
  answers: string[];
  id: number;
  isFavorite: boolean;
};
export type QnAs = QnA[];
export type FavoriteQuestion = {
  favorites: QnAs;
};

export interface StateType {
  name: string;
  fipsCode: string;
}
export interface USState {
  name: string;
  fipsCode: string;
}

export type CardType = {
  title: string;
  path: string;
  subtitle: string;
  detail: string;
  content: JSX.Element;
};

export type TopNavType = {
  title: string;
  path: string;
};
