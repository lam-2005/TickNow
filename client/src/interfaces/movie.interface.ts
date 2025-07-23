export interface MovieType {
  [key: string]: any; // Cho phép các thuộc tính khác
  _id: string;
  name: string;
  release_date: string;
  nation: string;
  age: string;
  duration: string;
  description: string;
  director: string;
  actor: string;
  trailer: string;
  image: string | File;
  banner: string | File;
  language: string;
  genre: {
    id: number | string;
    name?: string;
  }[];
  status: string | number;
  star: number;
}

export type MovieReq = {
  name: string;
  release_date: string;
  nation: string;
  age: string;
  duration: string | number;
  description: string;
  director: string;
  actor: string;
  trailer: string;
  image: File | null | string;
  banner: File | null | string;
  language: number | string;
  genre: string[];
  status?: string | number;
};
