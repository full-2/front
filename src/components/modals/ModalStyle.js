import styled from "styled-components";

const S = {};

S.ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.55);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  z-index: 999;
  font-family: "Pretendard", sans-serif;
`;

S.ModalContainer = styled.div`
  width: 100%;
  max-width: ${({ $variant }) => ($variant === "horizontal" ? "980px" : "520px")};
  background: #ffffff;
  border-radius: 18px;
  padding: 32px;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.18);
  position: relative;
`;

S.CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  border: none;
  background: none;
  font-size: 25px;
  color: #8d8d8d;
  cursor: pointer;
`;

S.Title = styled.h2`
  margin: 0 0 10px;
  font-size: 28px;
  font-weight: 700;
  color: #0b1215;
  width: 100%;
  text-align: left;
`;

S.Subtitle = styled.p`
  width: 100%;
  text-align: left;
  margin: 0 0 24px;
  font-size: 16px;
  color: #8d8d8d;
`;

S.Section = styled.div`
  margin-bottom: 20px;
  color: #666666;
`;

S.Label = styled.label`
  width: 100%;
  text-align: left;
  display: block;
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 550;
  color: #666666;
`;

S.Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: 8px;
  border: 1px solid #d1d5db;
  font-size: 16px;
  color: #666666;
  outline: none;
  transition: border-color 0.2s ease;
  background-color: #fbfbfb;

  &:focus {
    border-color: #2563eb;
  }

  &::placeholder {
    color: #b5b5b5;
  }
`;

S.MapPanel = styled.div`
  width: ${({ $width }) => $width || "100%"};
  height: ${({ $height }) => $height || "234px"};
  width: 100%;
  min-height: 234px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  position: relative;
  overflow: hidden;
  transition: height 0.25s ease;
  ${({ $fullHeight }) => ($fullHeight ? "flex: 1; height: 100%;" : "")}
`;

S.MapCanvas = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
`;

S.MapPinWrapper = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
  z-index: 2;
  pointer-events: none;
`;

S.MapPin = styled.div`
  width: 20px;
  height: 20px;
  background: #2563eb;
  border-radius: 50% 50% 50% 0;
  transform: rotate(-45deg);
  position: relative;

  &::after {
    content: "";
    width: 8px;
    height: 8px;
    background: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 6px;
    left: 6px;
  }
`;

S.MapText = styled.span`
  font-size: 14px;
  color: #000000;
  opacity: 40%;
  z-index: 2;
`;

S.MapLink = styled.button`
  border: none;
  background: none;
  font-size: 14px;
  color: #2563eb;
  cursor: pointer;
  padding: 0;
  text-decoration: underline;
  z-index: 2;
`;

S.MapHelper = styled.div`
  font-size: 14px;
  color: #000000;
  display: flex;
  justify-content: center;
  gap: 8px;
  opacity: 60%;
  margin-top: 4px;
`;

S.MapHelperRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

S.MapStack = styled.div`
  display: flex;
  flex-direction: column;
  transition: margin-top 0.25s ease;
`;

S.CheckboxRow = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  color: #4b5563;
  cursor: pointer;
`;

S.Checkbox = styled.input`
  width: 18px;
  height: 18px;
  color: #666666;
`;

S.PrimaryButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: ${({ $active }) => ($active ? "#ffffff" : "#ffffff")};
  background: ${({ $active }) => ($active ? "#356CFF" : "#e5e7eb")};
  cursor: ${({ $active }) => ($active ? "pointer" : "not-allowed")};
  transition: all 0.2s ease;
  margin-top: ${({ $stickBottom }) => ($stickBottom ? "auto" : "0")};
`;

S.HorizontalLayout = styled.div`
  display: flex;
  gap: 28px;
  align-items: flex-end;
`;

S.MapColumn = styled.div`
  flex: 1;
  max-width: 440px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  transition: height 0.25s ease;
`;

S.ContentColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

S.MapGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr auto;
  column-gap: 28px;
  row-gap: 0;
`;

S.MapTopColumn = styled.div`
  grid-column: 1 / 2;
  grid-row: ${({ $spanAll }) => ($spanAll ? "1 / 3" : "1 / 2")};
  display: flex;
  flex-direction: column;
`;

S.MapBottomRow = styled.div`
  grid-column: 1 / 2;
  grid-row: 2 / 3;
  padding-top: 6px;
`;

S.ContentTopColumn = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / 2;
  display: flex;
  flex-direction: column;
`;

S.ButtonRow = styled.div`
  grid-column: 2 / 3;
  grid-row: 2 / 3;
`;

S.ResultPanel = styled.div`
  border: 1px dashed #d1d5db;
  border-radius: 12px;
  padding: 16px;
  min-height: 160px;
  background: #fafafa;
  max-height: 250px;
  overflow-y: auto;
`;

S.ResultEmpty = styled.div`
  font-size: 14px;
  color: #9ca3af;
  text-align: center;
  margin-top: 40px;
`;

S.ResultList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

S.ResultItem = styled.li`
  padding: 12px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid ${({ $selected }) => ($selected ? "#2563eb" : "#e5e7eb")};
  font-size: 13px;
  color: #666666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

S.ResultBadge = styled.span`
  font-size: 12px;
  color: #2563eb;
  font-weight: 600;
`;

export default S;
