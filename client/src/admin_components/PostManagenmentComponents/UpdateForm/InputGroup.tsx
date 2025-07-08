import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { DataPostReq } from "@/interfaces/post.interface";
import TextEditor from "../AddForm/TextEditor";

const InputGroup = ({
  formData,
  setFormData,
}: {
  formData: DataPostReq;
  setFormData: (data: DataPostReq) => void;
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
  return (
    <div className="flex gap-5 items-center pt-2 min-w-[500px]">
      <div className="space-y-5">
        <div className="flex gap-5 flex-wrap">
          <div>
            <label htmlFor="" className="block mb-1 text-sm font-medium">
              Ảnh bài viết
            </label>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload files
              <VisuallyHiddenInput
                accept="image/*"
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files ? e.target.files[0] : null,
                  })
                }
              />
            </Button>
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Ngày bắt đầu
            </label>
            <input
              type="date"
              placeholder="Ngày chiếu"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.start_day}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  start_day: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Ngày kết thúc
            </label>
            <input
              type="date"
              placeholder="Ngày chiếu"
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.end_day}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  end_day: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium">Trạng thái</label>
            <select
              className="w-full border border-gray-300 rounded-md px-4 py-3 text-base"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value={2}>Hoạt động</option>
              <option value={1}>Không hoạt động</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium">Tiêu đề</label>
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
            Nội dung bài viết
          </label>
          <TextEditor formData={formData} setFormData={setFormData} />
        </div>
      </div>
    </div>
  );
};

export default InputGroup;
