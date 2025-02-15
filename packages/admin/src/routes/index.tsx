import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { lazy } from "react";

const PostDetail = lazy(() => import("../pages/PostDetail/PostDetail"));
const Post = lazy(() => import("../pages/Post/Post"));
const Login = lazy(() => import("../pages/Login/Login"));
const Comment = lazy(() => import("../pages/Comment/Comment"));
const Sentence = lazy(() => import("../pages/Sentence/Sentence"));
const SentenceDetail = lazy(() => import("../pages/SentenceDetail/SentenceDetail"));

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Post />,
      },
      {
        path: "/comment",
        element: <Comment />,
      },
      {
        path: "/sentence",
        element: <Sentence />,
      },
      {
        path: "/sentence/:id",
        element: <SentenceDetail />,
      },
      {
        path: "/:postId",
        element: <PostDetail />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <div>404 Not Found</div>,
      },
    ],
  },
];
