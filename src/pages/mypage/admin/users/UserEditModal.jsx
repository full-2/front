import React, { useState, useEffect } from "react";
import S from "../../../../components/modals/style";

const STATUS_OPTIONS = [
	{ value: "활동", label: "활동" },
	{ value: "임시 차단", label: "임시 차단" },
	{ value: "영구 차단", label: "영구 차단" },
];

const UserEditModal = ({ isOpen, user, onClose, onSave }) => {
	const [status, setStatus] = useState("활동");
	const [reason, setReason] = useState("");

	useEffect(() => {
		if (user) {
			setStatus(user.status || "활동");
			setReason("");
		}
	}, [user]);

	if (!isOpen || !user) return null;

	const handleSave = () => {
		onSave?.({
			userId: user.id,
			status,
			reason,
		});
		setReason("");
	};

	const handleClose = () => {
		setStatus(user?.status || "활동");
		setReason("");
		onClose?.();
	};

	return (
		<S.ModalOverlay onClick={handleClose}>
			<S.ModalContainer onClick={(e) => e.stopPropagation()}>
				<S.CloseButton type="button" onClick={handleClose}>
					×
				</S.CloseButton>
				<S.Title>사용자 상태 편집</S.Title>

				<S.Section>
					<S.Label>현재 상태</S.Label>
					<S.Select value={status} onChange={(e) => setStatus(e.target.value)}>
						{STATUS_OPTIONS.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</S.Select>
				</S.Section>

				<S.Section>
					<S.Label>차단(해제) 사유</S.Label>
					<S.Textarea
						value={reason}
						onChange={(e) => setReason(e.target.value)}
						placeholder="입력된 내용은 사용자 이메일로 전송됩니다."
						rows={4}
					/>
				</S.Section>

				<S.ButtonRow>
					<S.ConfirmButton type="button" onClick={handleSave}>
						저장
					</S.ConfirmButton>
				</S.ButtonRow>
			</S.ModalContainer>
		</S.ModalOverlay>
	);
};

export default UserEditModal;
