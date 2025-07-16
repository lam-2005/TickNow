import Offer from "@/components/Offer/Offer";
import { getPostList } from "@/services/post.service";
import { PostType } from "@/interfaces/post.interface";

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
          {posts.map((item: PostType) => (
            <Offer data={item} key={item._id} />
          ))}
        </div>
      )}
    </div>
  );
}
