export interface MovieType {
  _id: number | string;
  name: string;
  release_date: string;
  nation: string;
  age: string | number;
  duration: number;
  description: string;
  director: string;
  actor: string;
  trailer: string;
  image: string;
  banner: string;
  genre: number[] | string[];
  status: string;
}
