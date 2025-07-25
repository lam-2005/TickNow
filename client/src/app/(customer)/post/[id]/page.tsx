import { PostType } from "@/interfaces/post.interface";
import { getPostList } from "@/services/post.service";
import CopyBtn from "./CopyBtn";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const res = await getPostList(`/${id}`);
  const post: PostType = res?.data;

  if (!post) {
    return {
      title: "Không tìm thấy khuyến mãi",
      description: "Bài viết không tồn tại hoặc đã bị xóa.",
    };
  }

  return {
    title: `${post.title}`,
    description:
      post?.description ||
      "Thông tin chi tiết về chương trình khuyến mãi tại TickNow.",
  };
}

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

          {post.voucher && <CopyBtn code={post.voucher} />}

          <div className="mb-4 mt-2">
            <div
              className="[&_.fr-fic]:mx-auto [&_.fr-fic]:block"
              dangerouslySetInnerHTML={{ __html: post.content || "" }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
