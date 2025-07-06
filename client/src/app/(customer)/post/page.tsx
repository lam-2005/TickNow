import Link from "next/link";
import Offer from "@/components/Offer/Offer";

type PostType = {
  _id: string;
  content: string;
  img: string;
  start_day: string;
  end_day: string;
};

async function getPosts(): Promise<PostType[]> {
  try {
    const res = await fetch("http://localhost:1001/post", {
      cache: "no-store",
    });
    const json = await res.json();
    return json.data?.post || [];
  } catch (error) {
    console.error("Lỗi khi fetch post:", error);
    return [];
  }
}

export default async function PostPage() {
  const posts = await getPosts();

  return (
    <div className="container mt-10">
      <h1 className="text-2xl font-bold text-white mb-6 text-center">
        Khuyến mãi và Ưu đãi
      </h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500">Không có khuyến mãi nào.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mb-10">
          {posts.map((item) => (
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
      )}
    </div>
  );
}
