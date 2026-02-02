import styled from "styled-components";

const S = {};

S.SafetyScoreContainer = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.PALLETE.background.white};
  `;

S.SafetyScoreInner = styled.div`
  width: 100%;
  max-width: 1520px;
  margin: 0 auto;
  padding: 180px 0 80px;
`;

S.SafetyScoreTitle = styled.h2`
  font-size: ${({ theme }) => theme.FONT_SIZE.h1};
  font-weight: ${({ theme }) => theme.FONT_WEIGHT.bold};
  line-height: ${({ theme }) => theme.FONT_LINE.h1};
  color: ${({ theme }) => theme.PALLETE.black};
  display: flex;
  align-items: center;
  gap: 20px;
`;

S.SafetyScoreMap = styled.div`
  width: 100%;
  height: 600px;
  background-color: ${({ theme }) => theme.PALLETE.gray.greyscale01};
  border-radius: 20px;
  margin-top: 30px;
  position: relative;
`;

S.MapFilter = styled.div`
  position: absolute;
  top: 28px;
  left: 28px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

S.MapFilterItem = styled.div`
  border-radius: 8px;
  display: flex;
  background-color: ${({ theme }) => theme.PALLETE.white};
  cursor: pointer;
  overflow: hidden;

  
  & >:not(:last-child) {
    border-right: 1px solid ${({ theme }) => theme.PALLETE.gray.greyscale02};
  }
  `;

S.MapFilterItemIcon = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  gap: 8px;
  padding: 10px 12px;

  &:active {
    background-color: ${({ theme }) => theme.PALLETE.primary};
    color: ${({ theme }) => theme.PALLETE.white};
  }
`;

export default S;