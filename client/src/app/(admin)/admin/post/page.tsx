import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import AddPostBtn from "@/admin_components/PostManagenmentComponents/AddForm/ButtonOpenForm";
import SearchPost from "@/admin_components/PostManagenmentComponents/FilterPost/SearchPost";
import PostList from "@/admin_components/PostManagenmentComponents/PostList";
import { getPost } from "@/services/post.service";
import React, { Suspense } from "react";

const PostManagenment = async () => {
  const posts = await getPost(1, 5);

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Bài viết">
        <AddPostBtn />
      </HeadingCard>
      <SearchPost />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <PostList initData={posts} />
      </Suspense>
    </div>
  );
};

export default PostManagenment;
