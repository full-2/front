import React from "react";
import { Link } from "react-router-dom";
import S from "./style";
import Title from "../../../components/title/Title";
import IconButton from "../../../components/button/IconButton";
import ProvideBox from "../../../components/provideBox/ProvideBox";
import Icon from "../../../components/icon/Icon";

const RegionNoticeBanner = ({ region }) => {
  const isRegionSet = Boolean(region)

  return (
    <S.BannerContainer>
      <S.BannerTitle>
        <Title
          highlightText={isRegionSet ? region : ""}
          text="자취 정보"
          iconName="search"
          iconSize="xlarge"
          subtitle="내가 찾던 자취 정보가 한 곳에!"
        ></Title>
      </S.BannerTitle>

      <S.RegionNoticeContainer>
        {!isRegionSet ? (
          <>
            <S.RegionNoticeBox>
              <S.RegionNotice>
                <Icon name="pin" size="xsmall"></Icon>
                <S.RegionText>아직 지역이 설정되지 않았어요</S.RegionText>
              </S.RegionNotice>
              <S.ChangeRegion to="/select-location">
                내 지역 설정하기 →
              </S.ChangeRegion>
            </S.RegionNoticeBox>
            <S.SubText>
              내 지역을 설정하면 우리 동네 자취정보만 모아볼 수 있어요.
            </S.SubText>
          </>
        ) : (
          <>
            <S.RegionNoticeBox className="RegionNoticeBox">
              <S.RegionNotice className="RegionNotice">
                <Icon name="pin" size="xsmall"></Icon>
                <span>현재 지역: {region}</span>
              </S.RegionNotice>
              <S.ChangeRegion to="/select-location" className="ChangeRegion">
                지역 변경하기 →
              </S.ChangeRegion>
            </S.RegionNoticeBox>
            <S.SubText>
              이 지역 기준으로 자취정보를 보여드리고 있어요.
            </S.SubText>
          </>
        )}
      </S.RegionNoticeContainer>
    </S.BannerContainer>
  );
};

export default RegionNoticeBanner;
