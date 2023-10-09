import React from 'react'
import { RenderResult, within } from '@testing-library/react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { renderWithProviders } from '../../../tests/tests'
import MainPage from './MainPage'
import { Props } from './MainPage.types'

jest.mock('decentraland-ui/dist/components/Profile/Profile', () => {
  const module = jest.requireActual('decentraland-ui/dist/components/Profile/Profile')
  return {
    ...module,
    Profile: () => <div></div>
  }
})

// Mock tab rendering as it is including semantic-ui Container components that is not working correctly in jest
jest.mock('decentraland-ui/dist/components/Tabs/Tabs', () => {
  const module = jest.requireActual('decentraland-ui/dist/components/Tabs/Tabs')
  const Tabs = (props: { children: React.ReactNode }) => <div data-testid="main-tabs">{props.children}</div>
  Tabs.Tab = module.Tabs.Tab
  return {
    ...module,
    Tabs
  }
})

function renderMainPage(props: Partial<Props> = {}) {
  return renderWithProviders(
    <MainPage
      loggedInAddress="0xtest"
      profileAddress="0xaddress"
      isCreationsTabEnabled={false}
      isAssetsTabEnabled={false}
      isBlocked={false}
      isLoadingFeatures={false}
      {...props}
    />
  )
}

let screen: RenderResult

describe('when the creations tab FF is enabled', () => {
  let mainTabsCmp: ReturnType<typeof within>

  beforeEach(() => {
    screen = renderMainPage({ isCreationsTabEnabled: true })
    mainTabsCmp = within(screen.getByTestId('main-tabs'))
  })

  it('should show the creations tab', async () => {
    expect(mainTabsCmp.getByText(t('tabs.creations'))).toBeInTheDocument()
  })

  it('should show the overview tab', () => {
    expect(mainTabsCmp.getByText(t('tabs.overview'))).toBeInTheDocument()
  })
})

describe('when the creations tab FF is disabled', () => {
  beforeEach(() => {
    screen = renderMainPage({ isCreationsTabEnabled: false })
  })

  it('should not show the tabs section', () => {
    expect(screen.queryByTestId('main-tabs')).not.toBeInTheDocument()
  })
})

describe('when the assets tab FF is enabled', () => {
  let mainTabsCmp: ReturnType<typeof within>

  beforeEach(() => {
    screen = renderMainPage({ isAssetsTabEnabled: true })
    mainTabsCmp = within(screen.getByTestId('main-tabs'))
  })

  it('should show the assets tab', () => {
    expect(mainTabsCmp.getByText(t('tabs.assets'))).toBeInTheDocument()
  })

  it('should show the overview tab', () => {
    expect(mainTabsCmp.getByText(t('tabs.overview'))).toBeInTheDocument()
  })
})

describe('when the assets tab FF is disable', () => {
  beforeEach(() => {
    screen = renderMainPage({ isAssetsTabEnabled: false })
  })

  it('should not show the tabs section', () => {
    expect(screen.queryByTestId('main-tabs')).not.toBeInTheDocument()
  })
})
