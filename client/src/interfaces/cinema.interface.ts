export interface Location {
  id_location: string;
  deatil_location: string; // ✅ Đúng chính tả
  location: string;
}

export interface Cinema {
  _id: string;
  name: string;
  image: string;
  location: Location;
}