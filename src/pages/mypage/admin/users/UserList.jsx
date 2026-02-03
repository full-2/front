import { useMemo, useState, useCallback } from "react";
import BaseTable from "../../../../components/table/BaseTable";
import BaseButton from "../../../../components/button/BaseButton";
import UserEditModal from "./UserEditModal";
import S from "./style";

// 샘플 데이터
const SAMPLE_USERS = [
	{
		id: 1,
		nickname: "오소리",
		email: "osori12@kakao.com",
		joinDate: "2026-01-01",
		region: "서울특별시 강남구 역삼동",
		reportCount: 0,
		status: "활동",
	},
	{
		id: 2,
		nickname: "고양이",
		email: "cat123@naver.com",
		joinDate: "2026-01-09",
		region: "서울특별시 광진구 화양동",
		reportCount: 0,
		status: "활동",
	},
	{
		id: 3,
		nickname: "오리너구리",
		email: "owner33@kakao.com",
		joinDate: "2026-01-22",
		region: "미지정",
		reportCount: 2,
		status: "임시 차단",
	},
	{
		id: 4,
		nickname: "강아지",
		email: "dog123@naver.com",
		joinDate: "2026-01-31",
		region: "서울특별시 성북구 안암동",
		reportCount: 0,
		status: "활동",
	},
	{
		id: 5,
		nickname: "도롱뇽",
		email: "yong22@kakao.com",
		joinDate: "2026-02-02",
		region: "광주광역시 북구 용봉동",
		reportCount: 0,
		status: "활동",
	},
	{
		id: 6,
		nickname: "하늘다람쥐",
		email: "sky321@naver.com",
		joinDate: "2026-02-11",
		region: "서울특별시 강서구 방화동",
		reportCount: 1,
		status: "활동",
	},
	{
		id: 7,
		nickname: "햄스터",
		email: "spam11@kakao.com",
		joinDate: "2026-02-18",
		region: "미지정",
		reportCount: 8,
		status: "영구 차단",
	},
	{
		id: 8,
		nickname: "호랑이",
		email: "tiger55@naver.com",
		joinDate: "2026-02-25",
		region: "미지정",
		reportCount: 0,
		status: "활동",
	},
	{
		id: 9,
		nickname: "바다표범",
		email: "sea13@kakao.com",
		joinDate: "2026-03-01",
		region: "서울특별시 동대문구 청량리동",
		reportCount: 3,
		status: "임시 차단",
	},
];

const PersonIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		fill="currentColor"
	>
		<path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
	</svg>
);

const UserList = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedUser, setSelectedUser] = useState(null);

	const handleEdit = useCallback((user) => {
		setSelectedUser(user);
		setIsModalOpen(true);
	}, []);

	const handleModalSave = useCallback((saveData) => {
		console.log("User status updated:", saveData);
		// TODO: API 호출 등 구현
		setIsModalOpen(false);
		setSelectedUser(null);
	}, []);

	const columns = useMemo(
		() => [
			{
				id: "profile",
				header: "프로필",
				cell: () => (
					<S.ProfileIcon>
						<PersonIcon />
					</S.ProfileIcon>
				),
				enableSorting: false,
			},
			{
				accessorKey: "nickname",
				header: "닉네임",
				enableSorting: false,
			},
			{
				accessorKey: "email",
				header: "이메일",
				enableSorting: false,
			},
			{
				accessorKey: "joinDate",
				header: "가입일",
				cell: ({ getValue }) => {
					const date = new Date(getValue());
					return date.toISOString().split("T")[0];
				},
			},
			{
				accessorKey: "region",
				header: "지역",
				enableSorting: false,
			},
			{
				accessorKey: "reportCount",
				header: "신고",
				enableSorting: true,
			},
			{
				accessorKey: "status",
				header: "상태",
				cell: ({ getValue }) => {
					const status = getValue();
					return <S.StatusBadge $status={status}>{status}</S.StatusBadge>;
				},
				enableSorting: false,
			},
			{
				id: "actions",
				header: "",
				cell: ({ row }) => (
					<BaseButton
						shape="rounded"
						size="linktxt"
						padding="smallMedium"
						variant="solid"
						backgroundColor="primary"
						color="white"
						onClick={() => handleEdit(row.original)}
					>
						편집
					</BaseButton>
				),
				enableSorting: false,
			},
		],
		[handleEdit],
	);

	return (
		<div>
			<BaseTable
				data={SAMPLE_USERS}
				columns={columns}
				enableRowSelection={false}
				enableSorting={true}
				enableFiltering={true}
				enablePagination={true}
				pageSize={10}
			/>

			<UserEditModal
				isOpen={isModalOpen}
				user={selectedUser}
				onClose={() => {
					setIsModalOpen(false);
					setSelectedUser(null);
				}}
				onSave={handleModalSave}
			/>
		</div>
	);
};

export default UserList;
