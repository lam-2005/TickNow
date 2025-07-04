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
}
