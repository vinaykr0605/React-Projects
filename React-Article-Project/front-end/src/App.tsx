import './App.css'
import { AboutPage } from './pages/AboutPage'
import { ArticleListPage } from './pages/ArticleListPage'
import { ArticlePage, loader as articleLoader } from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Layout from './Layout'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'


const routes = [{
  path: '/',
  element: <Layout />,
  errorElement: <NotFoundPage />,
  children: [{
    path: '/',
    element: <HomePage />
  }, {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/articles/:name',
    element: <ArticlePage />,
    loader : articleLoader
  },
  {
    path: '/articles',
    element: <ArticleListPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path : '/signup',
    element : <SignupPage />
  }
  ]
}]



const router = createBrowserRouter(routes)

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
