import Offer from "@/components/Offer/Offer";
import { getPostList } from "@/services/post.service";
import { PostType } from "@/interfaces/post.interface";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Khuyến mãi & Ưu đãi",
  description:
    "Khám phá các chương trình khuyến mãi và ưu đãi hấp dẫn từ TickNow. Đặt vé xem phim giá rẻ, nhận nhiều phần quà và ưu đãi bất ngờ.",
  keywords: [
    "khuyến mãi xem phim",
    "ưu đãi TickNow",
    "vé xem phim giảm giá",
    "mã giảm giá phim",
    "TickNow ưu đãi",
    "voucher rạp chiếu phim",
  ],
};
const getOfferList = async () => {
  try {
    const res = await getPostList();
    return res?.data?.post;
  } catch (error) {
    console.error("Fetch offers failed:", error);
  }
};
export default async function PostPage() {
  const posts = await getOfferList();

  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Khuyến mãi và Ưu đãi
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Không có khuyến mãi nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {posts
            .filter((item: PostType) => new Date(item.end_day) > new Date())
            .map((item: PostType) => (
              <Offer data={item} key={item._id} />
            ))}
        </div>
      )}
    </div>
  );
}
