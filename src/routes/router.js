import { createBrowserRouter } from "react-router-dom";
import MyTestNotFound from "../pages/templates/mytestnotfound/MyTestNotFound";
import MyTestLayout from "../pages/templates/mytestlayout/MyTestLayout";
import MyTestMainContainer from "../pages/templates/mytestmain/MyTestMainContainer";
import MyTestContextContainer from "../pages/templates/mytestcontext/MyTestContextContainer";
import MyTestRedux from "../pages/templates/mytestredux/MyTestRedux";
import MyTestDocs from "../pages/templates/mytestdocs/MyTestDocs";
import MyTestParameterRead from "../pages/templates/mytesturlparameter/MyTestParameterRead";
import MyTestParameterContainer from "../pages/templates/mytesturlparameter/MyTestParameterContainer";
import MyTestQueryStringRead from "../pages/templates/mytestquerystring/MyTestQueryStringRead";
import MyTestQueryStringContainer from "../pages/templates/mytestquerystring/MyTestQueryStringContainer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MyTestLayout />,
    children: [
      {
        path: "", // == index: true
        element: <MyTestMainContainer />
      },
    ]
  },
  {
    path: "/docs",
    element: <MyTestDocs />,
    children: [
      {
        path: "context", // == index: true
        element: <MyTestContextContainer />
      },
      {
        path: "redux", // == index: true
        element: <MyTestRedux />
      },
      {
        path: "url-parameter",
        element: <MyTestParameterContainer />
      },
      {
        path: "url-parameter/:id",
        element: <MyTestParameterRead />
      },
      {
        path: "query-string",
        element: <MyTestQueryStringContainer />
      },
      {
        path: "query-string/read",
        element: <MyTestQueryStringRead />
      }
    ]
  },
  {
    path: "*",
    element: <MyTestNotFound />
  },
])

export default router;