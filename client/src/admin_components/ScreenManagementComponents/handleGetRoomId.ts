import { RoomType } from "@/interfaces/room.interface";

export const groupCinemasWithRooms = (rooms: RoomType[]) => {
  const cinemaMap: {
    [key: string]: {
      id_cinema: string;
      cinema_name?: string;
      rooms: RoomType[];
    };
  } = {};

  rooms.forEach((room) => {
    if (!cinemaMap[room.id_cinema]) {
      cinemaMap[room.id_cinema] = {
        id_cinema: room.id_cinema,
        cinema_name: room.cinema,
        rooms: [],
      };
    }
    cinemaMap[room.id_cinema].rooms.push(room);
  });

  return Object.values(cinemaMap);
};
