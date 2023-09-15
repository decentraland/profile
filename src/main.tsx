/* eslint-disable import/order */
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import * as SSO from '@dcl/single-sign-on-client'
import * as modals from './components/Modals'
import MainPage from './components/Pages/MainPage'
import SignInPage from './components/Pages/SignInPage'
import { initStore } from './modules/store'
import * as locales from './modules/translation/locales'
import { config } from './modules/config'
import WithProfile from './components/HOC/WithProfile'
import ConnectAndRedirect from './components/HOC/ConnectAndRedirect'
import './modules/analytics/track'
import './modules/analytics/sentry'
// These CSS styles must be defined last to avoid overriding other styles
import 'decentraland-ui/dist/themes/alternative/dark-theme.css'
import './index.css'

SSO.init(config.get('SSO_URL'))

const router = createBrowserRouter([
  {
    path: '/accounts/:profileAddress/:tab?',
    element: <WithProfile component={MainPage} />
  },
  {
    path: 'sign-in',
    element: <SignInPage />
  },
  {
    path: '*',
    element: <ConnectAndRedirect />
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
