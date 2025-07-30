"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

const TabMovie = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const getStatusParams = searchParams.get("status") || "";
  const handleChangeStatus = (status: number) => {
    const params = new URLSearchParams(searchParams);
    if (status === 1) {
      params.set("status", "dang-chieu");
    } else if (status === 2) {
      params.delete("date");
      params.delete("cinema");
      params.set("status", "sap-chieu");
    }
    router.push(`/movies?${params.toString()}`, { scroll: false });
  };
  return (
    <div className="flex gap-5 w-full justify-center">
      <h1
        onClick={() => handleChangeStatus(1)}
        className={`cursor-pointer font-bold uppercase text-3xl text-foreground border-b-4 max-md:text-2xl max-sm:text-lg ${
          getStatusParams === "" || getStatusParams === "dang-chieu"
            ? "text-primary border-red-600"
            : "text-foreground border-transparent"
        }`}
      >
        PHIM ĐANG CHIẾU
      </h1>
      <h1
        onClick={() => handleChangeStatus(2)}
        className={`cursor-pointer font-bold uppercase text-3xl text-foreground border-b-4 max-md:text-2xl max-sm:text-lg ${
          getStatusParams === "sap-chieu"
            ? "text-primary border-red-600"
            : "text-foreground border-transparent"
        }`}
      >
        PHIM SẮP CHIẾU
      </h1>
    </div>
  );
};

export default TabMovie;
