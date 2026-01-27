import styled from "styled-components";

const S = {};

S.TableContainer = styled.div`
	width: 100%;
`;

S.TableFilter = styled.div`
	margin-bottom: 16px;

	input {
		width: 100%;
		max-width: 300px;
		padding: 10px 16px;
		font-size: ${({ theme }) => theme.FONT_SIZE.h6};
		border: 1px solid ${({ theme }) => theme.PALLETE.gray.greyscale02};
		border-radius: 8px;
		outline: none;
		transition: border-color 0.2s ease;

		&:focus {
			border-color: ${({ theme }) => theme.PALLETE.primary};
		}

		&::placeholder {
			color: ${({ theme }) => theme.PALLETE.gray.greyscale03};
		}
	}
`;

S.Table = styled.table`
	width: 100%;
	border-collapse: collapse;
	background: ${({ theme }) => theme.PALLETE.white};
	border: 1px solid ${({ theme }) => theme.PALLETE.gray.greyscale02};
	border-radius: 8px;
	overflow: hidden;
`;

S.TableHead = styled.thead`
	background: ${({ theme }) => theme.PALLETE.gray.greyscale01};

	tr {
		border-bottom: 1px solid ${({ theme }) => theme.PALLETE.gray.greyscale02};
	}

	th {
		padding: 16px 12px;
		font-size: ${({ theme }) => theme.FONT_SIZE.linktxt};
		font-weight: ${({ theme }) => theme.FONT_WEIGHT.medium};
		color: ${({ theme }) => theme.PALLETE.gray.greyscale05};
		text-align: center;
		white-space: nowrap;

		&.sortable {
			cursor: pointer;
			user-select: none;

			&:hover {
				background: ${({ theme }) => theme.PALLETE.gray.greyscale02}60;
			}
		}
	}
`;

S.TableBody = styled.tbody`
	tr {
		border-bottom: 1px solid ${({ theme }) => theme.PALLETE.gray.greyscale01};
		transition: background-color 0.2s ease;

		&:last-child {
			border-bottom: none;
		}

		&:hover {
			background: ${({ theme }) => theme.PALLETE.gray.greyscale01}40;
		}

		&.selected {
			background: ${({ theme }) => theme.PALLETE.primary}10;
		}
	}

	td {
		padding: 20px 12px;
		font-size: ${({ theme }) => theme.FONT_SIZE.linktxt};
		color: ${({ theme }) => theme.PALLETE.gray.greyscale05};
		text-align: center;
		vertical-align: middle;
	}
`;

S.EmptyMessage = styled.td`
	padding: 40px 12px !important;
	color: ${({ theme }) => theme.PALLETE.gray.greyscale04} !important;
	font-size: ${({ theme }) => theme.FONT_SIZE.h6} !important;
`;

S.SortIndicator = styled.span`
	margin-left: 4px;
	font-size: 10px;
	color: ${({ theme }) => theme.PALLETE.gray.greyscale04};
`;

S.DetailButton = styled.button`
	display: inline-flex;
	align-items: center;
	justify-content: center;
	width: 32px;
	height: 32px;
	padding: 0;
	background: ${({ theme }) => theme.PALLETE.gray.greyscale02};
	border: none;
	border-radius: 50%;
	cursor: pointer;
	transition: background-color 0.2s ease;

	&:hover {
		background: ${({ theme }) => theme.PALLETE.gray.greyscale03};
	}

	svg,
	span {
		color: ${({ theme }) => theme.PALLETE.gray.greyscale05};
		font-size: 14px;
	}
`;

S.Pagination = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 8px;
	margin-top: 24px;

	button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-width: 36px;
		height: 36px;
		padding: 0 12px;
		font-size: ${({ theme }) => theme.FONT_SIZE.linktxt};
		color: ${({ theme }) => theme.PALLETE.gray.greyscale05};
		background: ${({ theme }) => theme.PALLETE.white};
		border: 1px solid ${({ theme }) => theme.PALLETE.gray.greyscale02};
		border-radius: 6px;
		cursor: pointer;
		transition: all 0.2s ease;

		&:hover:not(:disabled) {
			background: ${({ theme }) => theme.PALLETE.gray.greyscale01};
			border-color: ${({ theme }) => theme.PALLETE.gray.greyscale03};
		}

		&:disabled {
			opacity: 0.4;
			cursor: not-allowed;
		}
	}

	select {
		height: 36px;
		padding: 0 12px;
		font-size: ${({ theme }) => theme.FONT_SIZE.linktxt};
		color: ${({ theme }) => theme.PALLETE.gray.greyscale05};
		background: ${({ theme }) => theme.PALLETE.white};
		border: 1px solid ${({ theme }) => theme.PALLETE.gray.greyscale02};
		border-radius: 6px;
		outline: none;
		cursor: pointer;

		&:focus {
			border-color: ${({ theme }) => theme.PALLETE.primary};
		}
	}
`;

S.PageInfo = styled.span`
	padding: 0 12px;
	font-size: ${({ theme }) => theme.FONT_SIZE.linktxt};
	color: ${({ theme }) => theme.PALLETE.gray.greyscale04};
`;

S.SelectionInfo = styled.div`
	margin-top: 12px;
	font-size: ${({ theme }) => theme.FONT_SIZE.linktxt};
	color: ${({ theme }) => theme.PALLETE.gray.greyscale04};
	text-align: right;
`;

S.Checkbox = styled.input`
	width: 18px;
	height: 18px;
	cursor: pointer;
	accent-color: ${({ theme }) => theme.PALLETE.primary};
`;

export default S;
