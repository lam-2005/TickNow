import { RoomType } from "@/interfaces/room.interface";

export default function handleShowRoom(roomLayout: RoomType) {
  const room = roomLayout.diagram;
  const rows = room.row;
  const columns = room.column;
  const removedSeat: { [key: string]: number[] } = room.element_remove;
  const selectedSeat: { [key: string]: number[] } = room.element_selected;

  const rowLetters: string[] = [];
  for (let i = 0; i < rows; i++) {
    rowLetters.push(String.fromCharCode(65 + i));
  }
  const layout = rowLetters.map((item) => {
    const col: (number | "")[] = Array.from(
      { length: columns },
      (_, i) => i + 1
    ).map((i: number) => (removedSeat[item]?.includes(i) ? "" : i));
    const colAvail = col?.filter((i) => i !== "").map((_, i) => i + 1);
    let index = 0;
    return { [item]: col.map((c) => (c === "" ? "" : colAvail[index++])) };
  });
  return { layout, rows, columns, removedSeat, selectedSeat };
}
