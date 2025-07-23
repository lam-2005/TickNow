"use client";
import React, { useEffect } from "react";
import { useClipboard } from "react-haiku";
import { FaCheck, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const CopyBtn = ({ code }: { code: string }) => {
  const clipboard = useClipboard({ timeout: 2000 });
  useEffect(() => {
    if (clipboard.copied) {
      toast.success("Đã sao chép mã!");
    }
  }, [clipboard.copied]);
  return (
    <div className="text-center">
      <p className="text-center">
        Mã giảm giá:{" "}
        <span
          onClick={() => clipboard.copy(code)}
          className="text-xl font-bold inline-flex gap-1 cursor-pointer"
        >
          {code} {clipboard.copied ? <FaCheck color="green" /> : <FaCopy />}
        </span>
      </p>
    </div>
  );
};

export default CopyBtn;
