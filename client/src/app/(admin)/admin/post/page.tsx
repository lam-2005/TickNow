'use client';
import React, { Suspense } from 'react';
import HeadingCard from '@/admin_components/HeadingCard/HeadingCard';
// import AddPostBtn from '@/admin_components/PostManagementComponents/AddPost/ButtonOpenPost';
import FilterPost from '@/admin_components/PostManagementComponents/FilterPost/FilterPost';
import PostList from '@/admin_components/PostManagementComponents/PostList';
import { getPostList } from '@/services/post.service';

export const getPosts = async (
  page: number,
  limit: number,
  startDate: string | null = null,
  endDate: string | null = null,
  status: string | null = null,
  user: string | null = null,
) => {
  let queries = `?page=${page}&limit=${limit}`;

  if (startDate) {
    queries += `&start_date=${startDate}`;
  }

  if (endDate) {
    queries += `&end_date=${endDate}`;
  }

  if (user) {
    queries += `&user=${user}`;
  }

  if (status) {
    queries += `&status=${status}`;
  }

  const res = await getPostList(queries);

  return {
    posts: res?.post,
    total: res?.pagination.total,
    currentPage: res?.pagination.page,
    totalPages: res?.pagination.totalPages,
    startDate: startDate,
    endDate: endDate,
    status: status,
    user: user,
  };
};

const PostManagement = () => {
  const postData = getPosts(1, 5); 

  return (
    <div className="card">
      <HeadingCard title="Quản Lý Bài Viết">
        {/* <AddPostBtn /> */}
      </HeadingCard>

      <FilterPost />

      <Suspense fallback={<p className="text-center">Đang tải dữ liệu...</p>}>
        <PostList initData={postData} />
      </Suspense>
    </div>
  );
};

export default PostManagement;
