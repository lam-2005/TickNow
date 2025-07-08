import PopupContainer from "@/admin_components/PopupContainer";
import { PostType } from "@/interfaces/post.interface";
import { getPostList } from "@/services/post.service";
import React, { useEffect, useState } from "react";

const DetailPost = ({
  id,
  closeForm,
}: {
  id: string;
  closeForm: () => void;
}) => {
  const [loading, setLoading] = useState(true);
  const [getInfo, setGetInfo] = useState<PostType | null>(null);
  useEffect(() => {
    const getPostDetail = async (id: string) => {
      try {
        const res = await getPostList(`/${id}`);
        const data = res?.data;
        setGetInfo(data);
      } catch (error) {
        console.error("Failed to fetch post detail", error);
      } finally {
        setLoading(false);
      }
    };

    getPostDetail(id);
  }, [id]);
  if (loading) return <p>Loading...</p>;
  return (
    <PopupContainer
      closeForm={closeForm}
      title={getInfo?.title || "Thông tin bài viết"}
    >
      <p className="px-5 pb-5">
        {" "}
        <div dangerouslySetInnerHTML={{ __html: getInfo?.content || "" }} />
      </p>
    </PopupContainer>
  );
};

export default DetailPost;
