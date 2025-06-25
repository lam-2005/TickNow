export interface Location {
  id_location: string;
  deatil_location: string; 
  location: string;
}

export interface Cinema {
  _id: string;
  name: string;
  image: string;
  location: Location;
}


