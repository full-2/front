import React, { useState, useEffect, useMemo } from "react";
import RegionNoticeBanner from "./RegionNoticeBanner";
import FilterPanel from "./FilterPanel";
import CardGrid from "./CardGrid";
import IconButton from "../../../components/button/IconButton";
import S from "./style";
import { mockPosts } from "../../../mock/mockPosts";
import { fetchProvidePosts } from "../../../api/provideApi";
import { mapApiPostToPost } from "../../../mapper/postMapper";

const pageSize = 16
const useMockData = true // 서버 연결하면 false로 변경

const defaultFilters = { category: ["전체"], sort: "최신순", keyword: "" }

// HTML에서 태그 제거(검색용)
const stripHtml = (html = "") =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim()

// 서버 API 파라미터로 변환
const buildServerQueryParams = (filters) => {
  const keyword = (filters.keyword || "").trim()
  return {
    // 서버가 받는 파라미터 key 이름이 다를 수 있으니 나중에 확인 필요
    category: filters.category?.includes("전체") ? undefined : filters.category,
    sort: filters.sort,
    keyword: keyword ? keyword : undefined,
  }
}

const ProvideList = () => {
  const [region, setRegion] = useState(null)

  // localStorage에 저장된 region 불러옴
  useEffect(() => {
    const savedRegion = localStorage.getItem("region")
    if (savedRegion) {
      setRegion(savedRegion)
    }
  }, [])

  // mock / server 공통 state
  const [posts, setPosts] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)

  // 필터 상태
  const [filters, setFilters] = useState(defaultFilters)

  // mock / server 공통 loader
  const loadServerPage = async ({ nextPage, replace }) => {
    setLoading(true)
    try {
      const filterParams = buildServerQueryParams(filters)
      const apiData = await fetchProvidePosts({
        page: nextPage,
        pageSize,
        ...filterParams,
      })

      const mapped = apiData.map(mapApiPostToPost)

      if (replace) {
        setPosts(mapped)
      } else {
        setPosts((prev) => [...prev, ...mapped])
      }

      setPage(nextPage)
      if (mapped.length < pageSize) setHasMore(false)
      else setHasMore(true)
    } finally {
      setLoading(false)
    }
  };

  // ProvideList 첫 진입 시 초기 데이터 로드
  useEffect(() => {
    const loadFirst = async () => {
      if (useMockData) {
        setPosts(mockPosts)
        setHasMore(mockPosts.length > pageSize)
        return
      }
      // 서버: 현재의 필터 조건 포함해서 1페이지 데이터 달라 요청
      setHasMore(true)
      await loadServerPage({ nextPage: 1, replace: true })
    }

    loadFirst()
  }, [])

  // useMockData 기준 로컬 필터링/정렬
  const filteredPosts = useMemo(() => {
    // server 모드에선 서버가 이미 필터링해서 내려준다고 가정(추가 로컬 필터 X)
    if (!useMockData) return posts
    let result = [...posts]

    // 1) 카테고리
    const selectedCategories = filters.category || ["전체"]
    if (!selectedCategories.includes("전체")) {
      result = result.filter((p) => selectedCategories.includes(p.category))
    }

    // 2) 검색어: 제목이나 본문에 일치하는 내용 검색
    const kw = (filters.keyword || "").trim().toLowerCase()
    if (kw) {
      result = result.filter((p) => {
        const title = (p.title || "").toLowerCase()
        const contentText = stripHtml(p.contentHtml || "").toLowerCase()
        return title.includes(kw) || contentText.includes(kw)
      })
    }

    // 3) 정렬
    switch (filters.sort) {
      case "최신순":
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break;
      case "스크랩순":
        result.sort((a, b) => (b.bookmarkCount ?? 0) - (a.bookmarkCount ?? 0))
        break;
      case "좋아요순":
        result.sort((a, b) => (b.likeCount ?? 0) - (a.likeCount ?? 0))
        break;
      default:
        break;
    }

    return result
  }, [posts, filters])

  // "검색" 눌렀을 때
  const handleApplyFilters = async (nextFilters) => {
    setFilters(nextFilters)

    if (useMockData) {
      // mock: 로컬 필터용. 페이지 리셋
      setPage(1)
      setHasMore(mockPosts.length > pageSize)
      return
    }

    // server: 필터 변경 시 1페이지부터 재요청
    if (loading) return
    setHasMore(true)
    setPosts([])
    setPage(1)
    setLoading(true)
    try {
      const filterParams = buildServerQueryParams(nextFilters)
      const apiData = await fetchProvidePosts({
        page: 1,
        pageSize,
        ...filterParams,
      })
      const mapped = apiData.map(mapApiPostToPost)
      setPosts(mapped)
      if (mapped.length < pageSize) setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  // 더보기
  const handleLoadMore = async () => {
    if (loading || !hasMore) return

    if (useMockData) {
      const nextPage = page + 1
      setPage(nextPage)
      setHasMore(nextPage * pageSize < filteredPosts.length)
      return
    }

    const nextPage = page + 1
    await loadServerPage({ nextPage, replace: false })
  }

  // 렌더링 데이터
  const visiblePosts = useMockData
    ? filteredPosts.slice(0, page * pageSize)
    : filteredPosts; // server 모드는 서버가 페이지로 준 만큼만 posts에 쌓임

  // mock: 필터 바뀌면 hasMore 재계산(필터 결과 기준)
  useEffect(() => {
    if (!useMockData) return
    setHasMore(page * pageSize < filteredPosts.length)
  }, [filteredPosts, page])

  return (
    <S.ProvideListContainer>
      <RegionNoticeBanner region={region} />
      <FilterPanel onApply={handleApplyFilters} />
      <CardGrid posts={visiblePosts} />
      {hasMore && (
        <S.Button>
          <IconButton
            iconName="plus-gray"
            iconSize="xsmall"
            iconColor="gray03"
            border="gray03"
            borderWidth="medium"
            color="gray05"
            size="medium"
            shape="pill"
            padding="medium"
            backgroundColor="white"
            onClick={handleLoadMore}
            disabled={loading}
            style={{ width: "108px", height: "38px" }}
          >
            {loading ? "불러오는 중..." : "더보기"}
          </IconButton>
        </S.Button>
      )}
    </S.ProvideListContainer>
  );
};

export default ProvideList;