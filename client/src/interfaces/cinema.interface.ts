export interface Location {
  _id: string;
  name: string;
}

export interface Cinema {
  _id: string;
  id: string;
  name: string;
  image: string;
  status: number;
  location: {
    id_location: string;
    deatil_location: string;
  };
}

export interface CinemaCreateOrUpdate {
  id: string;
  name: string;
  image: string|null;
  file: File|null;
  status: number;
  id_location: string;
  deatil_location: string;
}
