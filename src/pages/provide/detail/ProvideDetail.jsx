import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import PostDetailHeader from "./PostDetailHeader";
import PostContentCard from "./PostContentCard";
import BaseButton from "../../../components/button/BaseButton";
import S from "./style";
import { mockPosts } from "../../../mock/mockPosts";
import { fetchProvidePostDetail } from "../../../api/provideApi";
import { mapApiPostToPost } from "../../../mapper/postMapper";

const useMockData = true; // 서버 연결하면 false로 변경

// mock 버전 상세 조회
const getMockPostDetail = async (id) => {
  const numericId = Number(id)
  const found = mockPosts.find((post) => post.id === numericId)
  if (!found) throw new Error("Post not found")
  return found
}

// server 버전 상세 조회
const getServerPostDetail = async (id) => {
  const apiData = await fetchProvidePostDetail({ id: Number(id) })
  return mapApiPostToPost(apiData)
}

const ProvideDetail = () => {
  const { id } = useParams()

  const { data, isLoading, isError } = useQuery({
    queryKey: ["provideDetail", id, useMockData],
    queryFn: () => (useMockData ? getMockPostDetail(id) : getServerPostDetail(id)),
    enabled: !!id,
  })

  if (isLoading) return <div>로딩 중입니다.</div>
  if (isError) return <div>게시글을 불러오지 못했어요😢</div>
  if (!data) return null

  return (
    <S.ProvideDetailContainer>
      <PostDetailHeader
        category={data.category}
        title={data.title}
        createdAt={data.createdAt}
        likeCount={data.likeCount}
        bookmarkCount={data.bookmarkCount}
      />

      <PostContentCard contentHtml={data.contentHtml} />

      <Link to="/provide">
        <S.GoToList>
          <BaseButton
            type="button"
            size="bttxt"
            shape="rounded"
            variant="solid"
            backgroundColor="primary"
            color="white"
            padding="medium"
            style={{ width: "100px", height: "38px" }}
          >
            목록보기
          </BaseButton>
        </S.GoToList>
      </Link>
    </S.ProvideDetailContainer>
  );
};

export default ProvideDetail;