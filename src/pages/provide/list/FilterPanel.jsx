// FilterPanel.jsx
import React, { useState, useEffect } from "react";
import S from "./style";
import BaseButton from "../../../components/button/BaseButton";

const categoryOptions = [
  "전체",
  "생활정보",
  "정부 지원 사업",
  "주거·계약",
  "안전·치안",
  "기타",
]
const sortOptions = ["최신순", "스크랩순", "좋아요순"]

const FilterPanel = ({ onApply }) => {
  const [category, setCategory] = useState(["전체"])
  const [sort, setSort] = useState("최신순")
  const [keyword, setKeyword] = useState("")
  const [appliedKeyword, setAppliedKeyword] = useState("")

  const ALL = "전체"
  const nonAllCategories = categoryOptions.filter((c) => c !== ALL)

  const toggleCategory = (clicked) => {
    // 현재 선택 prev, 다음 선택 next
    setCategory((prev) => {
      // 1) '전체' 클릭 => 전체만 선택됨
      if (clicked === ALL) return [ALL]

      // 2) 전체 선택 상태에서 다른 항목 클릭 => 전체 해제 후 클릭된 항목 선택
      const hasAll = prev.includes(ALL)
      if (hasAll) return [clicked]

      // 3) 일반 선택/해제
      const next = prev.includes(clicked)
        ? prev.filter((c) => c !== clicked)
        : [...prev, clicked]

      // 4) 아무 선택 X => 자동으로 전체 선택
      if (next.length === 0) return [ALL]

      // 5) 전체 제외 나머지 항목 전부 선택 => 자동으로 전체 선택
      const allSelected = nonAllCategories.every((c) => next.includes(c))
      if (allSelected) return [ALL]

      return next
    })
  }

  const handleReset = () => {
    setCategory(["전체"])
    setSort("최신순")
    setKeyword("")
    setAppliedKeyword("")
    onApply?.({ category: ["전체"], sort: "최신순", keyword: "" })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = keyword.trim()
    setAppliedKeyword(trimmed)
    onApply?.({ category, sort, keyword: trimmed })
  }

  useEffect(() => {
    onApply?.({ category, sort, keyword: appliedKeyword })
  }, [category, sort])

  const filterButton = ({ label, active, onClick }) => (
    <BaseButton
      type="button"
      size="12px"
      shape="pill"
      variant="solid"
      backgroundColor={active ? "primary" : "gray02"}
      color={active ? "white" : "black"}
      border="none"
      padding="smallMedium"
      font="semiBold"
      onClick={onClick}
    >
      {label}
    </BaseButton>
  )

  return (
    <S.FilterPanelSection>
      <form onSubmit={handleSubmit}>
        <S.FilterRow>
          <S.FilterLabel>자취 정보 분류</S.FilterLabel>
          <S.FilterButtons>
            {categoryOptions.map((opt) => (
              <React.Fragment key={opt}>
                {filterButton({
                  label: opt,
                  active: category.includes(opt),
                  onClick: () => toggleCategory(opt),
                })}
              </React.Fragment>
            ))}
          </S.FilterButtons>
        </S.FilterRow>

        <S.FilterRow className="FilterRow">
          <S.FilterLabel>필터</S.FilterLabel>
          <S.FilterButtons>
            {sortOptions.map((opt) => (
              <React.Fragment key={opt}>
                {filterButton({
                  label: opt,
                  active: sort === opt,
                  onClick: () => setSort(opt),
                })}
              </React.Fragment>
            ))}
          </S.FilterButtons>
        </S.FilterRow>

        <S.FilterRow className="FilterRow">
          <S.FilterLabel>검색어</S.FilterLabel>
          <S.SearchInput>
            <S.SearchBox
              className="SearchBox"
              placeholder="검색어 입력"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </S.SearchInput>
        </S.FilterRow>

        <S.SearchActions>
          <BaseButton
            type="button"
            size="bttxt"
            shape="rounded"
            variant="solid"
            backgroundColor="gray03"
            color="black"
            padding="medium"
            onClick={handleReset}
            style={{ width: "80px", height: "32px" }}
          >
            초기화
          </BaseButton>

          <BaseButton
            type="submit"
            size="bttxt"
            shape="rounded"
            variant="solid"
            backgroundColor="primary"
            color="white"
            padding="medium"
            style={{ width: "80px", height: "32px" }}
          >
            검색
          </BaseButton>
        </S.SearchActions>
      </form>
    </S.FilterPanelSection>
  );
};

export default FilterPanel;
