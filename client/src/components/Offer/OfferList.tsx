import Link from "next/link";
import Offer from "./Offer";

type OfferType = {
  _id: string;
  content: string;
  img: string;
  start_day: string;
  end_day: string;
};

type Props = {
  offers: OfferType[];
};

export default function OfferList({ offers }: Props) {
  if (!offers || offers.length === 0) {
    return <p className="text-center text-gray-500">Không có khuyến mãi nào.</p>;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
      {offers.map((item) => (
        <Link
          href={`/post/${item._id}`}
          key={item._id}
          className="bg-background-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow pb-5 block"
        >
          <Offer
            data={{
              title: item.content,
              image: item.img,
              date: `Từ ${new Date(item.start_day).toLocaleDateString("vi-VN")} đến ${new Date(item.end_day).toLocaleDateString("vi-VN")}`,
            }}
          />
        </Link>
      ))}
    </div>
  );
}
