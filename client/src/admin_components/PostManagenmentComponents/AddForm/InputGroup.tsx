import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextEditor from "./TextEditor";
import { DataPostReq } from "@/interfaces/post.interface";
import { TextField } from "@mui/material";
import { useState } from "react";
import Image from "next/image";
import { FaRegTrashAlt } from "react-icons/fa";

const InputGroup = ({
  formData,
  setFormData,
  errors,
  voucherList,
}: {
  formData: DataPostReq;
  setFormData: (data: DataPostReq) => void;
  errors?: string;
  voucherList: string[];
}) => {
  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setFormData({ ...formData, image: file });
    }
  };
  return (
    <div className="flex gap-5 items-center pt-2 min-w-[500px]">
      <div className="space-y-5">
        <div className="flex gap-5">
          <div>
            <label htmlFor="" className="block mb-1 text-sm font-medium">
              Ảnh bài viết
            </label>
            <Button
              //upfile
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              className="text-nowrap"
            >
              Upload files
              <VisuallyHiddenInput
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </Button>
            {preview && formData.image && (
              <div className="mt-3 relative w-[300px] h-[200px] z-10">
                <Image
                  alt="post image"
                  src={preview || ""}
                  width={300}
                  height={300}
                  style={{
                    objectFit: "cover",
                    width: "300px",
                    height: "200px",
                  }}
                  className="rounded-md"
                />

                <div
                  onClick={() => {
                    setPreview(null);
                    setFormData({ ...formData, image: null });
                  }}
                  className="absolute top-0 right-0 -translate-x-2.5 translate-y-2.5 p-2 z-11 text-error cursor-pointer bg-white rounded-md"
                >
                  <FaRegTrashAlt />
                </div>
              </div>
            )}
          </div>
          <TextField
            className="w-full"
            type="date"
            required
            error={errors ? true : false}
            helperText={errors}
            id="outlined-required"
            label="Ngày bắt đầu"
            value={formData?.start_day}
            onChange={(e) =>
              setFormData({ ...formData, start_day: e.target.value })
            }
            placeholder="Nhập ngày bắt đầu"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              onClick: (e) => {
                // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
                (e.currentTarget as HTMLInputElement).showPicker?.();
              },
            }}
          />

          <TextField
            className="w-full"
            type="date"
            required
            id="outlined-required"
            error={errors ? true : false}
            label="Ngày kết thúc"
            value={formData?.end_day}
            onChange={(e) =>
              setFormData({ ...formData, end_day: e.target.value })
            }
            placeholder="Nhập ngày kết thúc"
            InputLabelProps={{ shrink: true }}
            inputProps={{
              onClick: (e) => {
                // Thủ thuật gọi showPicker nếu trình duyệt hỗ trợ
                (e.currentTarget as HTMLInputElement).showPicker?.();
              },
            }}
          />
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Mã giảm giá (nếu có)
          </label>
          <select
            name="voucher"
            id="voucher"
            value={formData.voucher}
            onChange={(e) =>
              setFormData({ ...formData, voucher: e.target.value })
            }
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
          >
            <option value="">Chọn mã giảm giá</option>
            {voucherList.map((voucher) => (
              <option key={voucher} value={voucher}>
                {voucher}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">
            Tiêu đề<span className="text-red-500">*</span>
          </label>
          <input
            type="input"
            placeholder="Nhập tiêu đề bài viết"
            className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
            value={formData.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">
            Nội dung bài viết<span className="text-red-500">*</span>
          </label>
          <TextEditor formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};

export default InputGroup;
