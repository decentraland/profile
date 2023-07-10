/* eslint-disable import/order */
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import 'decentraland-ui/dist/themes/alternative/dark-theme.css'
import * as modals from './components/Modals'
import MainPage from './components/Pages/MainPage'
import SignInPage from './components/Pages/SignInPage'
import { initStore } from './modules/store'
import * as locales from './modules/translation/locales'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />
  },
  {
    path: 'sign-in',
    element: <SignInPage />
  }
])

const component = (
  <React.StrictMode>
    <Provider store={initStore()}>
      <WalletProvider>
        <TranslationProvider locales={Object.keys(locales)}>
          <ModalProvider components={modals}>
            <RouterProvider router={router} />
          </ModalProvider>
        </TranslationProvider>
      </WalletProvider>
    </Provider>
  </React.StrictMode>
)

ReactDOM.render(component, document.getElementById('root') as HTMLElement)

// Adding the theme and the CSS after loading all files to prevent overwriting the CSS
import './index.css'
