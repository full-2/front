import styled from "styled-components";
import { Link } from "react-router-dom";
import BaseButton from "../../../components/button/BaseButton";

const S = {};

// ProvideList

S.ProvideListContainer = styled.div`
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 30px 60px 30px;
`;

S.Button = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 40px 0;
`;

// RegionNoticeBanner

S.BannerContainer = styled.section`
  width: 100%;
  background: ${({ theme }) => theme.PALLETE.background.white};
  padding: 140px 0 10px 0;
`;

S.BannerTitle = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding: 0 20px;
`;

S.RegionNoticeContainer = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: 20px 0;
  padding: 0 20px;
`;

S.RegionNoticeBox = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  width: fit-content;
  max-width: 100%;
  padding: 12px 16px;
  background: #f3f4f6;
  border-radius: 10px;
`;

S.RegionNotice = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
`;

S.RegionText = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 14px;
  font-weight: 600;
`;

S.ChangeRegion = styled(Link)`
  flex-shrink: 0;
  font-size: 14px;
  color: #8d8d8d;
`;

S.SubText = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.h6};
  line-height: ${({ theme }) => theme.FONT_LINE.h6};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALLETE.gray.greyscale05};
  margin: 10px 0;
`;

// FilterPanel

S.FilterPanelSection = styled.section`
  width: 100%;
  border: 1px solid #d9d9d9;
  background: #ffffff;
  border-radius: 14px;
  padding: 14px 24px;
`;

S.FilterRow = styled.div`
  display: grid;
  grid-template-columns: 110px 1fr;
  gap: 18px;
  align-items: start;
  padding: 14px 0;
  & + & {
    border-top: 1px solid #f1f1f1;
  }
`;

S.FilterLabel = styled.div`
  font-size: 14px;
  padding: 6px 18px 0 0;
  border-right: 1px solid #f1f1f1;
`;

S.FilterButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

S.SearchInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

S.SearchBox = styled.input`
  width: 100%;
  height: 32px;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 0 14px;
  font-size: 12px;
  outline: none;

  &::placeholder {
    color: #b5b5b5;
  }

  &:focus {
    border-color: ${({ theme }) => theme.PALLETE?.primary?.main || "#4F6EF7"};
    box-shadow: 0 0 0 3px rgba(79, 110, 247, 0.12);
  }
`;

S.SearchActions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
`;

// Card

S.CardLink = styled(Link)`
  display: block;
  text-decoration: none;
  color: inherit;
`;

S.CardWrap = styled.article`
  width: 100%;
  background: #fff;
  border-radius: 18px;
  min-height: 360px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 22px rgba(0, 0, 0, 0.06);
  transition:
    transform 140ms ease,
    box-shadow 140ms ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.08);
  }
`;

S.Thumbnail = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #fff;
`;

S.ThumbnailImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

S.Category = styled(BaseButton)`
  position: absolute;
  top: 12px;
  left: 12px;
`;

S.CardBody = styled.div`
  padding: 14px 16px 16px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

S.CategoryText = styled.div`
  font-size: 12px;
  font-weight: 800;
  color: #2d5bff;
  margin-bottom: 6px;
`;

S.CardTitle = styled.h3`
  margin: 8px 5px;
  font-size: 16px;
  font-weight: 700;
  line-height: 1.4;
  color: #0B1215;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

S.CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
`;

S.DateText = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.h7};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: #8d8d8d;
  padding: 0 5px;
`;

S.LikeAndScrap = styled.div`
  display: flex;
  gap: 10px;
  padding: 0 5px;
`;

S.CountItems = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`;

S.Icon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: block;
`;

S.Count = styled.span`
  font-size: 12px;
  font-weight: 500;
  color: #8d8d8d;
`;

export default S;