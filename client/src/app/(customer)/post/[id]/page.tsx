import Image from "next/image";

type PostType = {
  _id: string;
  title: string;
  image: string;
  date: string;
  content: string;
};

async function getPostById(id: string): Promise<PostType | null> {
  try {
    const res = await fetch(`http://localhost:1001/post/${id}`, {
      cache: "no-store",
    });
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error("Lỗi khi fetch chi tiết post:", error);
    return null;
  }
}

type Props = {
  params: {
    id: string;
  } | Promise<{ id: string }>; // phòng trường hợp params là Promise
};

export default async function PostDetailPage(props: Props) {
  const params = await Promise.resolve(props.params); // await params nếu là Promise
  const post = await getPostById(params.id);

  return (
    <div className="container mx-auto px-4 py-10 text-white">
      {!post ? (
        <p className="text-center text-gray-400">Không tìm thấy bài viết.</p>
      ) : (
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400 text-center">
            {post.title}
          </h1>

          <p className="mb-4 text-sm text-gray-400 italic text-center">{post.date}</p>

          <p className="mb-4 leading-relaxed whitespace-pre-line">
            {post.content || "Không có nội dung mô tả."}
          </p>

          {post.image && (
            <div className="mt-8 flex justify-center">
              <Image
                src={post.image}
                alt={post.title}
                width={800}
                height={500}
                className="rounded-xl shadow-md"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
