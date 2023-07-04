import React from 'react'
import ReactDOM from 'react-dom'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import 'decentraland-ui/dist/themes/alternative/dark-theme.css'
import 'decentraland-ui/dist/themes/base-theme.css'
import Root from './components/Pages/MainPage/MainPage'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />
  }
])

const component = (
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

ReactDOM.render(component, document.getElementById('root') as HTMLElement)
