import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.locale("vi");

export const commentTime = (time: string) => {
  return dayjs(time).fromNow(); // trả về ví dụ: "5 phút trước"
};
