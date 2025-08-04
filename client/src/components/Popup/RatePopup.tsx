import React, { useEffect, useState } from "react";
import PopupContainer from "./PopupContainer";
import Image from "next/image";
import Button from "../Button/Button";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import { FaRegStar, FaStar } from "react-icons/fa";
import { TicketDetail } from "@/interfaces/ticket.interface";
import env from "@/configs/environment";
import { ratingAPI } from "@/services/rate.service";
import { toast } from "react-toastify";
import { getTicketList } from "@/services/ticket.service";
import LoadingSpin from "../LoadingAPI/LoadingSpin";
const labels: { [index: string]: string } = {
  0: "Chưa đánh giá",
  0.5: "Rất tệ",
  1: "Tệ",
  1.5: "Chán",
  2: "Tạm",
  2.5: "Ổn",
  3: "Hay",
  3.5: "Rất hay",
  4: "Tuyệt",
  4.5: "Rất tuyệt",
  5: "Siêu phẩm",
};
function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const RatePopup = ({
  idTicket,
  onClose,
  onRated,
}: {
  idTicket: string;
  onClose: () => void;
  onRated: () => void;
}) => {
  const [value, setValue] = React.useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [hover, setHover] = React.useState(-1);
  const [loading, setLoading] = useState(false);
  const [pending, setPending] = useState(false);
  const [detailTicket, setDetailTickket] = useState<TicketDetail | null>(null);
  useEffect(() => {
    const getDetailTicket = async () => {
      try {
        setLoading(true);
        if (!idTicket) {
          return;
        }
        const res = await getTicketList(`/${idTicket}`);
        setDetailTickket(res?.data);
      } catch (error) {
        toast.error("Lỗi lấy chi tiết vé");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getDetailTicket();
  }, [idTicket]);

  const handleRating = async () => {
    if (!value) {
      toast.warn("Vui lòng chọn đánh giá!");
      return;
    }
    setPending(true);
    try {
      await ratingAPI({
        comment,
        score: value || 0,
        movie: detailTicket?.movie._id || "",
        ticket: detailTicket?.ticket._id || "",
      });
      toast.success("Cảm ơn bạn đã đánh giá!");
      onClose();
      onRated();
    } catch (error) {
      toast.error(`Có lỗi xảy ra khi Đánh giá ${error}`);
      console.error(error);
    } finally {
      setPending(false);
    }
  };

  return (
    <PopupContainer onClose={onClose}>
      {loading || !detailTicket ? (
        <LoadingSpin />
      ) : (
        <div className="w-full space-y-5 ">
          <div className="flex gap-7.5">
            <div className="relative max-w-[220px] w-full h-full aspect-[2/3] overflow-hidden rounded-[10px]">
              <Image
                fill
                src={`${env.IMG_API_URL}${detailTicket?.movie.image}`}
                alt={`${detailTicket?.movie.name}` || "Ảnh phim"}
                sizes="300px"
                loading="lazy"
                className="object-cover"
              />
            </div>
            <div className="flex-1 flex-column justify-between items-start">
              <div className="space-y-2.5 w-full">
                <div className="flex items-center gap-2.5">
                  <h2>Đánh giá phim: {detailTicket?.movie.name}</h2>
                </div>
                <div className="flex gap-5">
                  <span className="text-lg font-bold">Đánh giá:</span>
                  <div className="flex items-center gap-2.5">
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        icon={
                          <div className="text-yellow-400 mr-1">
                            <FaStar className="text-2xl" />
                          </div>
                        }
                        emptyIcon={
                          <div className="text-yellow-400 mr-1">
                            <FaRegStar className="text-2xl" />
                          </div>
                        }
                      />
                      {value !== null && (
                        <Box sx={{ ml: 2, textWrap: "nowrap" }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                      )}
                    </Box>
                  </div>
                </div>
                <div className="flex-column w-full gap-2.5">
                  <span className="text-lg font-bold">Bình luận:</span>
                  <textarea
                    name=""
                    id=""
                    placeholder="Nhập bình luận của bạn"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="border border-gray-400 p-2 w-full h-24 outline-none focus:border-foreground"
                  ></textarea>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  title={pending ? "Đang gửi..." : "Đánh giá"}
                  disabled={pending}
                  onClick={handleRating}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </PopupContainer>
  );
};

export default RatePopup;
