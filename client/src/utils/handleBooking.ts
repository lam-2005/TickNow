export default function handleBooking(roomLayout: {
  row: number;
  column: number;
  element_remove: { [key: string]: number[] };
  element_selected: { [key: string]: number[] };
  element_selecting: { [key: string]: number[] };
}) {
  // const room = roomLayout.diagram;
  const rows = roomLayout.row;
  const columns = roomLayout.column;
  const removedSeat: { [key: string]: number[] } = roomLayout.element_remove;
  const selectedSeat: { [key: string]: number[] } = roomLayout.element_selected;
  // console.log(rows, columns, removedSeat);

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
