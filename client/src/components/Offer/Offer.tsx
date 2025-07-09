import env from "@/configs/environment";
import { PostType } from "@/interfaces/post.interface";
import Image from "next/image";

const Offer = ({ data }: { data: PostType }) => {
  const formatDate = new Date(data.start_day.slice(0, 10));
  const convertedDate = formatDate.toLocaleDateString("vi-VN");
  return (
    <div className="w-full group rounded-2xl dark:bg-transparent dark:shadow-none">
      <div className="relative w-full aspect-[7/4] overflow-hidden rounded-2xl">
        <Image
          src={`${
            data.image
              ? `${env.IMG_API_URL}/post/${data.image}`
              : "/offers/defaultPost.webp"
          } `}
          fill
          alt={data.title}
          sizes="350px"
          priority
          className="group-hover:scale-110 transition-transform duration-300 object-cover"
        />
      </div>
      <div className="px-4 mt-2 group-hover:text-primary">
        <time className="line-clamp-2 text-[clamp(0.75rem,2vw,0.875rem)] text-foreground mb-1">
          {convertedDate}
        </time>
        <h3 className="font-text font-bold capitalize line-clamp-2">
          {data.title}
        </h3>
      </div>
    </div>
  );
};

export default Offer;
