import React from "react";
import S from "./style";
import Icon from "../../components/icon/Icon";

const SafetyScoreMap = () => {
  return (
    <S.SafetyScoreMap>
      <S.MapFilter>
        <S.MapFilterItem>
          <S.MapFilterItemIcon>
            <Icon name="location-black" size="small" color="white" />
            원위치
          </S.MapFilterItemIcon>
        </S.MapFilterItem>
        <S.MapFilterItem>
          <S.MapFilterItemIcon>
            <Icon name="camera-black" size="small" color="white" />
            CCTV 표시
          </S.MapFilterItemIcon>
          <S.MapFilterItemIcon>
            <Icon name="lamp-black" size="small" color="white" />
            가로등 표시
          </S.MapFilterItemIcon>
        </S.MapFilterItem>
      </S.MapFilter>
    </S.SafetyScoreMap>
  );
};

export default SafetyScoreMap;
