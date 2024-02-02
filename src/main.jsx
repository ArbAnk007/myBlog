import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { Provider } from 'react-redux'
import { store } from "./app/store.js"
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Protected } from "./components"
import { LoginPage, SignupPage, HomePage, AllPostsPage, ContactPage, AddPostPage, PostPage, PageNotFound, EditPostPage } from "./pages"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: 
          <Protected 
          authentication={true}
          >
            <HomePage />
          </Protected>
      },
      {
        path: "/home",
        element: 
        <Protected 
        authentication={true}
        >
          <HomePage />
        </Protected>
      },
      {
        path: "/signup",
        element: 
        <Protected 
        authentication={false}
        >
          <SignupPage />
        </Protected>
      },
      {
        path: "/login",
        element: 
        <Protected 
        authentication={false}
        >
          <LoginPage />
        </Protected>
      },
      {
        path: "/all-posts",
        element: 
        <Protected 
        authentication={true}
        >
          <AllPostsPage />
        </Protected>
      },
      {
        path: "/contact",
        element: 
        <Protected 
        authentication={true}
        >
          <ContactPage />
        </Protected>
      },
      {
        path: "/add-post",
        element: 
        <Protected 
        authentication={true}
        >
          <AddPostPage />
        </Protected>
      },
      {
        path: "/post/:slug",
        element: 
        <Protected 
        authentication={true}
        >
          <PostPage />
        </Protected>
      },
      {
        path: "/edit-post/:slug",
        element: 
        <Protected 
        authentication={true}
        >
          <EditPostPage />
        </Protected>
      },
      {
        path: "/:slug",
        element: 
        <Protected 
        authentication={true}
        >
          <PageNotFound />
        </Protected>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
