import './App.css'
import { AboutPage } from './pages/AboutPage'
import { ArticleListPage } from './pages/ArticleListPage'
import { ArticlePage } from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom"
import Layout from './Layout'
import NotFoundPage from './pages/NotFoundPage'

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
    element: <ArticlePage />
  },
  {
    path: '/articles',
    element: <ArticleListPage />
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
