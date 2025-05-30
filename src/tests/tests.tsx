import React from 'react'
import { Provider } from 'react-redux'
import { MemoryRouterProps, RouterProvider, createMemoryRouter, useLocation } from 'react-router-dom'
import { render } from '@testing-library/react'
import flatten from 'flat'
import { Store } from 'redux'
import { en as dappsEn } from 'decentraland-dapps/dist/modules/translation/defaults'
import { mergeTranslations } from 'decentraland-dapps/dist/modules/translation/utils'
import TranslationProvider from 'decentraland-dapps/dist/providers/TranslationProvider'
import { darkTheme, DclThemeProvider } from 'decentraland-ui2'
import { RootState } from '../modules/reducer'
import * as locales from '../modules/translation/locales'
import { initTestStore } from './store'

export const LOCATION_DISPLAY_TEST_ID = 'location-display'

export function renderWithProviders(
  component: JSX.Element,
  { preloadedState, store, router }: { preloadedState?: Partial<RootState>; store?: Store; router?: MemoryRouterProps } = {}
) {
  const initializedStore =
    store ||
    initTestStore({
      ...(preloadedState || {}),
      storage: { loading: false },
      translation: {
        data: { en: mergeTranslations<any>(flatten(dappsEn), flatten(locales.en)) },
        locale: 'en'
      }
    })

  const LocationDisplay = () => {
    const location = useLocation()

    return <div data-testid={LOCATION_DISPLAY_TEST_ID}>{location.pathname + location.search.toString()}</div>
  }

  const memoryRouter = (component: React.ReactNode) =>
    createMemoryRouter(
      [
        {
          path: '*',
          element: (
            <>
              {component}
              <LocationDisplay />
            </>
          )
        }
      ],
      {
        initialEntries: router?.initialEntries ?? ['/'],
        initialIndex: router?.initialIndex ?? 1
      }
    )

  function AppProviders({ children }: { children: React.ReactNode }) {
    return (
      <Provider store={initializedStore}>
        <TranslationProvider locales={['en']}>
          <DclThemeProvider theme={darkTheme}>
            <RouterProvider router={memoryRouter(children)} />
          </DclThemeProvider>
        </TranslationProvider>
      </Provider>
    )
  }

  return render(component, { wrapper: AppProviders })
}
