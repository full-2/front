// pages/SelectLocation/SelectLocation.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import SafetySearchModal from '../../components/modals/SafetySearchModal';

const SelectLocation = () => {
  const navigate = useNavigate();
  // 페이지 열자마자 모달창 오픈
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [modalKey, setModalKey] = useState(0);

  useEffect(() => {
    setIsModalOpen(true);
    setModalKey((prev) => prev + 1);
  }, []);

  const handleClose = () => {
    setIsModalOpen(false);
    navigate(-1);
  };

  return (
    <div style={pageStyles.container}>
      <Header />
      <div style={pageStyles.content}>
        <SafetySearchModal
          key={modalKey}
          isOpen={isModalOpen}
          onClose={handleClose}
        />
      </div>
    </div>
  );
};

const pageStyles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  content: {
    flex: 1,
    backgroundColor: '#FBFBFB',
    position: 'relative',
    minHeight: 'calc(100vh - 80px)',
    display: 'flex',
    alignItems: 'flex-start',
    paddingTop: '150px',
    overflowY: 'auto',
  },
};

export default SelectLocation;