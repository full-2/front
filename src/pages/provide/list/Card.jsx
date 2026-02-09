import React from "react";
import S from "./style";

const Card = ({ post }) => {
  if (!post) return null
  const {
    id,
    category = "",
    title = "",
    createdAt = "",
    likeCount = 0,
    bookmarkCount = 0,
    imageSrc = "",
  } = post

  return (
    <S.CardLink to={`/provide/detail/${id}`} aria-label={`${title} 상세 보기`}>
      <S.CardWrap>
        <S.Thumbnail>
          <S.ThumbnailImg
            src={imageSrc || "/assets/images/provide-default.png"}
            alt={`${category} 썸네일`}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = "/assets/images/provide-default.png"
            }}
          />
          <S.Category
            type="button"
            size="12px"
            shape="pill"
            variant="solid"
            backgroundColor="primary"
            color="white"
            border="none"
            padding="smallMedium"
            font="semiBold"
          >
            {category}
          </S.Category>
        </S.Thumbnail>

        <S.CardBody>
          <S.CardTitle>{title}</S.CardTitle>
          <S.CardFooter>
            <S.DateText>{formatDate(createdAt)}</S.DateText>
            <S.LikeAndScrap>
              <S.CountItems>
                <S.Icon src="/assets/images/icons/like.png" alt="좋아요" />
                <S.Count>{likeCount}</S.Count>
              </S.CountItems>
              <S.CountItems>
                <S.Icon src="/assets/images/icons/bookmark-view.png" alt="북마크" />
                <S.Count>{bookmarkCount}</S.Count>
              </S.CountItems>
            </S.LikeAndScrap>
          </S.CardFooter>
        </S.CardBody>
      </S.CardWrap>
    </S.CardLink>
  );
};

function formatDate(value) {
  const d = value instanceof Date ? value : new Date(value)
  if (Number.isNaN(d.getTime())) return String(value)

  const yy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${yy}. ${mm}. ${dd}`
}

export default Card;