export interface Location {
  _id: string;
  name: string;
}

export interface Cinema {
  _id: string;
  name: string;
  image: string;
  location: Location;
}
