import React, { useState } from 'react';
import SafetySearchModal from './SafetySearchModal';
import LocationSettingModal from './LocationSettingModal';

const TempTest = () => {
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  return (
    <div style={containerStyle}>
      <h1 style={{ color: '#333' }}>모달 확인 테스트 페이지</h1>
      <p style={{ color: '#666' }}>테스트용 페이지입니다.</p>
      
      <div style={buttonSection}>
        {/* 이미지 1, 2번 (세로형) */}
        <button onClick={() => setIsModal1Open(true)} style={btnStyle}>
          1. 상단용 세로 모달 (SafetySearchModal)
        </button>

        {/* 이미지 3, 4번 (가로형) */}
        <button onClick={() => setIsModal2Open(true)} style={{...btnStyle, backgroundColor: '#10b981'}}>
          2. 중단용 가로 모달 (LocationSettingModal)
        </button>
      </div>

      <div style={guideStyle}>
        <p>💡 <b>확인 포인트:</b></p>
        <ul style={{ textAlign: 'left', display: 'inline-block' }}>
          <li>주소 입력 전/후 상태 변화가 잘 일어나는가?</li>
          <li>디자인 이미지(1~4번)와 여백, 폰트가 일치하는가?</li>
          <li>닫기 버튼을 누르면 잘 닫히는가?</li>
        </ul>
      </div>

      {/* 제작한 모달 컴포넌트들 연결 */}
      <SafetySearchModal 
        isOpen={isModal1Open} 
        onClose={() => setIsModal1Open(false)} 
      />
      <LocationSettingModal 
        isOpen={isModal2Open} 
        onClose={() => setIsModal2Open(false)} 
      />
    </div>
  );
};

// 간단한 인라인 스타일
const containerStyle = {
  padding: '100px 20px',
  textAlign: 'center',
  backgroundColor: '#f8fafc',
  minHeight: '100vh'
};

const buttonSection = {
  display: 'flex',
  gap: '20px',
  justifyContent: 'center',
  margin: '40px 0'
};

const btnStyle = {
  padding: '16px 24px',
  fontSize: '16px',
  fontWeight: 'bold',
  backgroundColor: '#2563eb',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  cursor: 'pointer',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
};

const guideStyle = {
  marginTop: '50px',
  padding: '20px',
  border: '1px dashed #cbd5e1',
  borderRadius: '12px',
  color: '#475569'
};

export default TempTest;