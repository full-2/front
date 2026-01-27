import { createBrowserRouter } from "react-router-dom";
import MyTestNotFound from "../pages/templates/mytestnotfound/MyTestNotFound";
// import MyTestLayout from "../pages/templates/mytestlayout/MyTestLayout";
// import MyTestMainContainer from "../pages/templates/mytestmain/MyTestMainContainer";
// import MyTestContextContainer from "../pages/templates/mytestcontext/MyTestContextContainer";
// import MyTestDocs from "../pages/templates/mytestdocs/MyTestDocs";
// import MyTestParameterRead from "../pages/templates/mytesturlparameter/MyTestParameterRead";
// import MyTestParameterContainer from "../pages/templates/mytesturlparameter/MyTestParameterContainer";
// import MyTestQueryStringRead from "../pages/templates/mytestquerystring/MyTestQueryStringRead";
// import MyTestQueryStringContainer from "../pages/templates/mytestquerystring/MyTestQueryStringContainer";
import Main from "../pages/main/Main";
import Layout from "../pages/layout/Layout";
import MemberLogin from "../pages/member/MemberLogin";
import MemberJoin from "../pages/member/MemberJoin";
import GeneralMyPageLayout from "../pages/mypage/general/GeneralMyPageLayout";
import AdminMyPageLayout from "../pages/mypage/admin/AdminMyPageLayout";
import Profile from "../pages/mypage/general/profile/Profile";
import MyArea from "../pages/mypage/general/myarea/MyArea";
import MyActivity from "../pages/mypage/general/myactivity/MyActivity";
import Notify from "../pages/mypage/general/notify/Notify";
import Setting from "../pages/mypage/general/setting/Setting";
import Dashboard from "../pages/mypage/admin/dashboard/Dashboard";
import PostList from "../pages/mypage/admin/post/PostList";
import WritePost from "../pages/mypage/admin/post/WritePost";
import UserList from "../pages/mypage/admin/users/UserList";
import ReportList from "../pages/mypage/admin/report/ReportList";
import ProvideList from "../pages/provide/list/ProvideList";
import SelectLocation from "../pages/selectlocation/SelectLocation";
import SafetyScore from "../pages/safetyscore/SafetyScore";
import AdminCommunityList from "../pages/mypage/admin/community/AdminCommunityList";
import CommunityList from "../pages/community/list/CommunityList";
import MemberJoinSns from "../pages/member/MemberJoinSns";
import MyPosts from "../pages/mypage/general/myactivity/MyPosts";
import MyComments from "../pages/mypage/general/myactivity/MyComments";
import CommentsOnMyPosts from "../pages/mypage/general/myactivity/CommentsOnMyPosts";
import BookmarkedPosts from "../pages/mypage/general/myactivity/BookmarkedPosts";
import LikedPosts from "../pages/mypage/general/myactivity/LikedPosts";
import AdminPost from "../pages/mypage/admin/post/AdminPost";
import ProvideDetail from "../pages/provide/detail/ProvideDetail";
import CommunityDetail from "../pages/community/detail/CommunityDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "", // == index: true
        element: <Main />
      },
      // 정보제공
      {
        path: "/provide",
        element: <ProvideList />
      },
      // 정보제공 글 상세
      {
        path: "/provide/detail",
        element: <ProvideDetail />
      },
      // 커뮤니티
      {
        path: "/community",
        element: <CommunityList />
      },
      // 커뮤니티 글 상세
      {
        path: "/community/detail",
        element: <CommunityDetail />
      },
      // 안전점수
      {
        path: "/safety-score",
        element: <SafetyScore />
      },
      // 지역선택
      {
        path: "/select-location",
        element: <SelectLocation />
      },
      // 로그인
      {
        path: "/login",
        element: <MemberLogin />
      },
      // 회원가입
      {
        path: "/join",
        element: <MemberJoin />
      },
      // SNS회원가입 후 닉네임 입력
      {
        path: "/join-sns",
        element: <MemberJoinSns/>
      }
    ]
  },
  // 마이페이지
  {
    path: "/mypage",
    element: <GeneralMyPageLayout />,
    children:[
      // 프로필
      {
        path: "",
        element: <Profile />
      },
      // 내 지역
      {
        path: "area",
        element: <MyArea />
      },
      // 내 활동
      {
        path: "my-activity",
        element: <MyActivity/>,
        children: [
          // 내 글
          {
            path: "",
            element: <MyPosts />
          },
          // 내 댓글
          {
            path: "",
            element: <MyComments />
          },
          // 내 글의 댓글
          {
            path: "",
            element: <CommentsOnMyPosts />
          },
          // 스크랩한 글
          {
            path: "",
            element: <BookmarkedPosts />
          },
          // 좋아요한 글
          {
            path: "",
            element: <LikedPosts />
          },
        ]
      },
      // 알림
      {
        path: "notify",
        element: <Notify/>
      },
      // 설정
      {
        path: "setting",
        element: <Setting/>
      },
    ]
  },
  // 관리자페이지
  {
    path: "/admin",
    element: <AdminMyPageLayout />,
    children:[
      // 대시보드
      {
        path: "",
        element: <Dashboard />
      },
      // 커뮤니티 관리
      {
        path: "community",
        element: <AdminCommunityList />
      },
      // 정보제공 글 리스트
      {
        path: "post/list",
        element: <PostList />
      },
      // 정보제공 글 작성
      {
        path: "post",
        element: <AdminPost />,
        children: [
          {
            path: "",
            element: <PostList />
          },
          {
            path: "write",
            element: <WritePost />
          },
        ]
      },
      // 사용자
      {
        path: "users",
        element: <UserList />
      },
      // 신고
      {
        path: "report",
        element: <ReportList />
      },
    ]
  },
  // {
  //   path: "/docs",
  //   element: <MyTestDocs />,
  //   children: [
  //     {
  //       path: "context", // == index: true
  //       element: <MyTestContextContainer />
  //     },
  //     {
  //       path: "url-parameter",
  //       element: <MyTestParameterContainer />
  //     },
  //     {
  //       path: "url-parameter/:id",
  //       element: <MyTestParameterRead />
  //     },
  //     {
  //       path: "query-string",
  //       element: <MyTestQueryStringContainer />
  //     },
  //     {
  //       path: "query-string/read",
  //       element: <MyTestQueryStringRead />
  //     },
  //   ]
  // },
  {
    path: "*",
    element: <MyTestNotFound />
  },
])

export default router;