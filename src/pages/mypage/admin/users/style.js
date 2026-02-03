import styled from "styled-components";

const S = {};

S.ProfileIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 40px;
	height: 40px;
	background: ${({ theme }) => theme.PALLETE.gray.greyscale02};
	border-radius: 50%;
	margin: 0 auto;

	svg {
		width: 24px;
		height: 24px;
		color: ${({ theme }) => theme.PALLETE.gray.greyscale04};
	}
`;

S.StatusBadge = styled.span`
	padding: 4px 12px;
	font-size: ${({ theme }) => theme.FONT_SIZE.h7};
	font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
	border-radius: 4px;
	background: ${({ $status, theme }) => {
		switch ($status) {
			case "활동":
				return theme.PALLETE.gray.greyscale01;
			case "임시 차단":
				return "#FEF3C7";
			case "영구 차단":
				return "#FEE2E2";
			default:
				return theme.PALLETE.gray.greyscale01;
		}
	}};
	color: ${({ $status, theme }) => {
		switch ($status) {
			case "활동":
				return theme.PALLETE.gray.greyscale05;
			case "임시 차단":
				return "#D97706";
			case "영구 차단":
				return "#DC2626";
			default:
				return theme.PALLETE.gray.greyscale05;
		}
	}};
`;

export default S;
