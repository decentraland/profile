/* eslint-disable import/order */
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import ModalProvider from 'decentraland-dapps/dist/providers/ModalProvider'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import WalletProvider from 'decentraland-dapps/dist/providers/WalletProvider'
import { darkTheme, DclThemeProvider } from 'decentraland-ui2'
import * as modals from './components/Modals'
import { initStore } from './modules/store'
import * as locales from './modules/translation/locales'
import AppRoutes from './Routes'
import './modules/analytics/track'
import './modules/analytics/sentry'
// These CSS styles must be defined last to avoid overriding other styles
import 'decentraland-ui/dist/themes/alternative/dark-theme.css'
import './index.css'

const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/profile' : '/'
const component = (
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Provider store={initStore()}>
        <WalletProvider>
          <TranslationProvider locales={Object.keys(locales)}>
            <DclThemeProvider theme={darkTheme}>
              <ModalProvider components={modals}>
                <AppRoutes />
              </ModalProvider>
            </DclThemeProvider>
          </TranslationProvider>
        </WalletProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
)

ReactDOM.render(component, document.getElementById('root') as HTMLElement)
