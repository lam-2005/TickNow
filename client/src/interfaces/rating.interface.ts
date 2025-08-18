export interface ReviewType {
  _id: number | string;
  id_movie: string;
  movieName: string;
  userName: string;
  score: number;
  date: string;
  comment: string;
  updatedAt: string;
  is_active: number;
}
