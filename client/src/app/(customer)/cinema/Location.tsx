// import React from "react";
// import Image from "next/image";
// import Button from "@/components/Button/Button";
// const Location = () => {
//   return (
//     <div className="  w-full bg-background-card rounded-md shadow-md overflow-hidden">
//       {/* Phần ảnh nền */}
//       <div className="relative w-full h-40">
//         <Image
//           src={`/banner/drop.webp`}
//           alt="Ảnh rạp chiếu"
//           fill
//           priority
//           className="object-cover"
//         />
//       </div>

//       {/* Phần thông tin */}
//       <div className="p-3">
//         <h1 className="text-foreground font-bold text-base">
//           TickNow Quận 12 (Thành phố Hồ Chí Minh)
//         </h1>
//         <p className="text-foreground text-sm leading-relaxed mt-2.5">
//           12, Phường Trung Mỹ Tây, Quận 12, Thành phố Hồ Chí Minh
//         </p>
//         <Button title="Xem chi tiết" className="mt-5" />
//       </div>
//     </div>
//   );
// };

// export default Location;


// components/Location.tsx

// import React from "react";
// import Image from "next/image";
// import Button from "@/components/Button/Button";
// import { Cinema } from "@/interfaces/cinema.interface";

// interface Props {
//   data: Cinema;
// }

// const Location = ({ data }: Props) => {
//   return (
//     <div className="w-full bg-background-card rounded-md shadow-md overflow-hidden">
//       {/* Phần ảnh nền */}
//       <div className="relative w-full h-40">
//         <Image
//           src={data.image}
//           alt={`Ảnh rạp chiếu ${data.name}`}
//           fill
//           priority
//           className="object-cover"
//         />
//       </div>

//       {/* Phần thông tin */}
//       <div className="p-3">
//         <h1 className="text-foreground font-bold text-base">{data.name}</h1>
//         <p className="text-foreground text-sm leading-relaxed mt-2.5">
//           {data.location.deatil_location}
//         </p>
//         <Button title="Xem chi tiết" className="mt-5" />
//       </div>
//     </div>
//   );
// };

// export default Location;

import React from "react";
import Image from "next/image";
import Button from "@/components/Button/Button";
import { Cinema } from "@/interfaces/cinema.interface";

interface Props {
  data: Cinema;
}

const Location = ({ data }: Props) => {
  return (
    <div className="w-full bg-background-card rounded-md shadow-md overflow-hidden">
      {/* Phần ảnh nền */}
      <div className="relative w-full h-40">
      <Image
        src="/images.jpg"
        alt={`Ảnh rạp ${data.name}`}
        fill
        priority
        className="object-cover"
      />
      </div>

      {/* Phần thông tin */}
      <div className="p-3">
        <h1 className="text-foreground font-bold text-base">
          {data.name}
        </h1>
        <p className="text-foreground text-sm leading-relaxed mt-2.5">
          {data.location.deatil_location}
        </p>
        <Button title="Xem chi tiết" className="mt-5" />
      </div>
    </div>
  );
};

export default Location;
