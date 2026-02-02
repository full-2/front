import React from "react";
import S from "./style";
import IconButton from "../../components/button/IconButton";
import SafetyScoreMap from "./SafetyScoreMap";

const SafetyScore = () => {
  return (
    <S.SafetyScoreContainer>
      <S.SafetyScoreInner>
        <S.SafetyScoreTitle>
          경남 창원시 진해구 명제로 478
          <IconButton
            iconName="location-white"
            iconSize="xsmall"
            color="white"
            size="medium"
            shape="rounded"
            padding="smallMedium"
            backgroundColor="primary"
            border="primary"
            borderWidth="medium"
          >
            지역 선택하기
          </IconButton>
        </S.SafetyScoreTitle>
        <SafetyScoreMap />
      </S.SafetyScoreInner>
    </S.SafetyScoreContainer>
  );
};

export default SafetyScore;
