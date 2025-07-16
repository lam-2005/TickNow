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
        }}
      />
    </div>
  );
};

export default TextEditor;
