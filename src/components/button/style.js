import styled, { css } from "styled-components";

const colorMap = {
  primary: "#3461F5",
  secondary: "#111827",
  white: "#FFFFFF",
  gray01: "#F9FAFB",
  gray02: "#F3F4F6",
  gray03: "#E5E7EB",
  gray04: "#D1D5DB",
  gray05: "#9CA3AF",
  error: "#EF4444",
  sky: "#38BDF8",
};

const sizeMap = {
  h1: "32px",
  h2: "28px",
  h3: "24px",
  h4: "20px",
  h5: "18px",
  h6: "16px",
  h7: "15px",
  h8: "14px",
  h9: "13px",
  medium: "14px",
  bttxt: "14px",
  linktxt: "13px",
};

const paddingMap = {
  small: "4px 10px",
  mediumSmall: "6px 12px",
  smallMedium: "8px 12px",
  medium: "10px 16px",
  large: "12px 20px",
  full: "0",
};

const shapeMap = {
  square: "0",
  rounded: "8px",
  pill: "999px",
  square: "4px",
};

const borderWidthMap = {
  thin: "1px",
  medium: "2px",
  thick: "3px",
};

const getColor = (value, theme) => {
  if (!value) return undefined;
  if (colorMap[value]) return colorMap[value];
  if (theme?.PALLETE?.[value]) return theme.PALLETE[value];
  return value;
};

export const BaseButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  border-radius: ${({ shape }) => shapeMap[shape] || "6px"};
  font-size: ${({ size }) => sizeMap[size] || size || "14px"};
  font-weight: ${({ fontWeight }) => fontWeight || 600};
  padding: ${({ padding }) => paddingMap[padding] || "8px 12px"};
  border: ${({ border, borderWidth, theme }) => {
    if (!border || border === "none") return "none";
    const width = borderWidthMap[borderWidth] || "1px";
    return `${width} solid ${getColor(border, theme) || "#D1D5DB"}`;
  }};
  color: ${({ color, theme }) => getColor(color, theme) || "#111827"};
  background-color: ${({ backgroundColor, variant, theme }) => {
    if (variant === "outline" || variant === "ghost") return "transparent";
    return getColor(backgroundColor, theme) || "transparent";
  }};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.6 : 1)};

  ${({ variant }) =>
    variant === "ghost" &&
    css`
      border: none;
    `}
`;

export const ButtonContent = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  ${({ $iconPosition }) =>
    $iconPosition === "right"
      ? css`
          flex-direction: row-reverse;
        `
      : null}
`;
