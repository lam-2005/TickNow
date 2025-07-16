import { PostType } from "@/interfaces/post.interface";
import { getPostList } from "@/services/post.service";
import Image from "next/image";

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await getPostList(`/${id}`);
  const post: PostType = res?.data;
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
  };
  return (
    <div className="container mx-auto px-4 py-10 text-white">
      {!post ? (
        <p className="text-center text-gray-400">Không tìm thấy bài viết.</p>
      ) : (
        <div className="bg-zinc-900 p-6 rounded-xl shadow-lg">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-400 text-center">
            {post.title}
          </h1>

          <p className="mb-4 text-sm text-gray-400 italic text-center">
            Từ {formatDate(post.start_day)} đến {formatDate(post.end_day)}
          </p>

          <div className="mb-4 leading-relaxed whitespace-pre-line">
            <div
              className=""
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>

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
