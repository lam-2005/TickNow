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
  language: string;
  genre: {
    id: number | string;
    name: string;
  }[];
  status: string | number;
  star:number;
}
