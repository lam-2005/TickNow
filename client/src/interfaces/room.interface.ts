export type RoomType = {
  _id: string;
  cinema: string;
  code_room: string;
  id_thear: string;
  diagram: {
    row: number;
    colunm: number;
    element_remove: { [key: string]: number[] };
    element_selected: { [key: string]: number[] };
    element_selecting: { [key: string]: number[] };
  };
};
