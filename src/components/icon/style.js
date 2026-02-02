import styled from "styled-components";

export const iconMap = {
  like: "like.png",
  comment: "comment.png",
  hits: "hits.png",
  "bookmark-view": "bookmark-view.png",
  "bookmark-active": "bookmark-active.png",
  "arrow-right": "arrow-right.png",
  search: "search.png",
  like: "like.png",
  "like-active": "like-active.png",
  pin: "pin.png",
  house: "house.png",
  "plus-gray": "plus-gray.png",
  coffee: "coffee.png",
  plus: "plus.png",
  minus: "minus.png",
  "plus-gray": "plus-gray.png",
  "plus-white": "plus-white.png",
  "minus-gray": "minus-gray.png",
  "minus-white": "minus-white.png",
  kakao: "kakao.png",
  naver: "naver.png",
  "location-white": "location-white.png",
  "location-black": "location-black.png",
  "camera-white": "camera-white.png",
  "camera-black": "camera-black.png",
  "lamp-white": "lamp-white.png",
  "lamp-black": "lamp-black.png",
};

const sizeMap = {
  xsmall: "12px",
  small: "16px",
  medium: "20px",
  large: "24px",
};

export const IconImage = styled.img`
  width: ${({ size }) => sizeMap[size] || size || "20px"};
  height: ${({ size }) => sizeMap[size] || size || "20px"};
  object-fit: contain;
  transform: ${({ rotate }) => (rotate ? `rotate(${rotate}deg)` : "none")};
  cursor: ${({ onClick }) => (onClick ? "pointer" : "default")};
`;
