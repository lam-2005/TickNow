"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";

const FroalaEditor = dynamic(() => import("react-froala-wysiwyg"), {
  ssr: false,
});

import { DataPostReq } from "@/interfaces/post.interface";

const TextEditor = ({
  formData,
  setFormData,
}: {
  formData: DataPostReq;
  setFormData: (data: DataPostReq) => void;
}) => {
  useEffect(() => {
    // Only import CSS & JS on client
    if (typeof window !== "undefined") {
      import("froala-editor/css/froala_style.min.css");
      import("froala-editor/css/froala_editor.pkgd.min.css");
      import("froala-editor/js/plugins/image.min.js");
    }
  }, []);

  return (
    <div>
      <FroalaEditor
        tag="textarea"
        model={formData.content}
        onModelChange={(e: string) => setFormData({ ...formData, content: e })}
        config={{
          placeholderText: "Nhập nội dung bài viết...",
          imagePaste: true,
          imageInsertButtons: ["imageByURL"], // chỉ cho phép chèn ảnh từ URL
          imageUpload: false, // không cho phép upload ảnh lên server
          imageDefaultWidth: 0, // không ép chiều rộng mặc định
          htmlAllowedTags: [".*"], // cho phép mọi thẻ HTML
          htmlAllowedAttrs: [".*"], // cho phép mọi thuộc tính (bao gồm src)
          htmlRemoveTags: [], // không xóa thẻ HTML nào
          htmlRemoveAttributes: [], // không xóa thuộc tính nào
          pasteAllowLocalImages: true, // cho phép dán ảnh nội bộ (nếu cần)
          pastePlain: false, // giữ nguyên định dạng HTML khi dán
        }}
      />
    </div>
  );
};

export default TextEditor;
