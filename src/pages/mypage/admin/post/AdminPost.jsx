import React from 'react';
import AdminPostTabs from './AdminPostTabs';
import { Outlet } from 'react-router-dom';

const AdminPost = () => {
  return (
    <div>
      관리자 글 관리 페이지
      <AdminPostTabs />
      <Outlet />
    </div>
  );
};

export default AdminPost;