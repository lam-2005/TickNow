import HeadingCard from "@/admin_components/HeadingCard/HeadingCard";
import AddPostBtn from "@/admin_components/PostManagenmentComponents/AddForm/ButtonOpenForm";
import SearchPost from "@/admin_components/PostManagenmentComponents/FilterPost/SearchPost";
import PostList from "@/admin_components/PostManagenmentComponents/PostList";
import { getPost } from "@/services/post.service";
import { getVoucherList } from "@/services/vouchers.service";
import React, { Suspense } from "react";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Quản lí bài viết",
};

const PostManagenment = async () => {
  const posts = await getPost(1, 5);
  const vouchers = await getVoucherList("?active=true");
  return (
    <div className="card">
      <HeadingCard title="Quản Lý Bài viết">
        <AddPostBtn vouchers={vouchers.voucher} />
      </HeadingCard>
      <SearchPost />
      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <PostList initData={posts} voucherList={vouchers.voucher} />
      </Suspense>
    </div>
  );
};

export default PostManagenment;
