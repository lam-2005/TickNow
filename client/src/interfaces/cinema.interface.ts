export interface CinemaRes {
  _id: string;
  name: string;
  image: string;
  status: number;
  location: LocationType;
}

export interface CinemaReq {
  name: string;
  image: File | null | string;
  status: number | string;
  id_location?: string;
  deatil_location?: string;
}

export interface CinemaDetail extends CinemaRes {
  totalRooms?: number;
  totalShowtimes?: number;
  createdAt?: string;
}

export type LocationOptionsType = {
  label: string;
  id: string;
};

export interface LocationType {
  id_location: string;
  deatil_location: string;
  location?: string;
  status?: number;
}

export interface LocationRes {
  _id: string;
  name: string;
}
export interface Location {
  _id: string;
  name: string;
}

export interface Cinema {
  _id: string;
  name: string;
  image: string;
  location: {
    id_location: string;
    deatil_location: string;
  };
  status: number;
}
