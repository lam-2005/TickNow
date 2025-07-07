import { DataRoomReq } from "@/interfaces/room.interface";

export default function handleShowLayoutRoom(roomLayout: DataRoomReq) {
  const rows = Number(roomLayout.row);
  const columns = Number(roomLayout.column);
  const removedSeat = roomLayout.seatRemoved ?? {};
  // console.log(rows, columns, removedSeat);

  const rowLetters: string[] = [];
  for (let i = 0; i < rows; i++) {
    rowLetters.push(String.fromCharCode(65 + i));
  }
  const layout = rowLetters.map((rowLetter) => {
    let displayIndex = 1;
    const seats = Array.from({ length: columns }, (_, col) => {
      const colNumber = col + 1;
      const isRemoved = removedSeat[rowLetter]?.includes(colNumber);
      const id = `${rowLetter}${colNumber}`;
      const seatName = isRemoved ? "" : `${rowLetter}${displayIndex++}`;
      return { id, col: colNumber, seatName, isRemoved };
    });
    return { [rowLetter]: seats };
  });
  return { layout, rows, columns, removedSeat };
}
