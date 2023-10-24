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
  let profileAddress: string
  let loggedInAddress: string

  describe('and the user is viewing its own profile', () => {
    beforeEach(() => {
      profileAddress = '0xaddress'
      loggedInAddress = profileAddress
      screen = renderMainPage({ isCreationsTabEnabled: true, loggedInAddress, profileAddress })
      mainTabsCmp = within(screen.getByTestId('main-tabs'))
    })

    it('should show the overview tab', () => {
      expect(mainTabsCmp.getByText(t('tabs.overview'))).toBeInTheDocument()
    })

    it('should show the "My Creations" tab', async () => {
      expect(mainTabsCmp.getByText(t('tabs.own_creations'))).toBeInTheDocument()
    })
  })

  describe('and the user is viewing another profile', () => {
    beforeEach(() => {
      profileAddress = '0xaddress'
      loggedInAddress = 'anotherAddress'
      screen = renderMainPage({ isCreationsTabEnabled: true, loggedInAddress, profileAddress })
      mainTabsCmp = within(screen.getByTestId('main-tabs'))
    })

    it('should show the overview tab', () => {
      expect(mainTabsCmp.getByText(t('tabs.overview'))).toBeInTheDocument()
    })

    it('should show the "Creations" tab', async () => {
      expect(mainTabsCmp.getByText(t('tabs.others_creations'))).toBeInTheDocument()
    })
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
  let profileAddress: string
  let loggedInAddress: string

  describe('and the user is viewing its own profile', () => {
    beforeEach(() => {
      profileAddress = '0xaddress'
      loggedInAddress = profileAddress
      screen = renderMainPage({ isAssetsTabEnabled: true, loggedInAddress, profileAddress })
      mainTabsCmp = within(screen.getByTestId('main-tabs'))
    })

    it('should show the overview tab', () => {
      expect(mainTabsCmp.getByText(t('tabs.overview'))).toBeInTheDocument()
    })

    it('should show the "My Assets" tab', () => {
      expect(mainTabsCmp.getByText(t('tabs.own_assets'))).toBeInTheDocument()
    })
  })

  describe('and the user is viewing another profile', () => {
    beforeEach(() => {
      profileAddress = '0xaddress'
      loggedInAddress = 'anotherAddress'
      screen = renderMainPage({ isAssetsTabEnabled: true, loggedInAddress, profileAddress })
      mainTabsCmp = within(screen.getByTestId('main-tabs'))
    })

    it('should show the "Assets" tab', () => {
      expect(mainTabsCmp.getByText(t('tabs.others_assets'))).toBeInTheDocument()
    })

    it('should show the overview tab', () => {
      expect(mainTabsCmp.getByText(t('tabs.overview'))).toBeInTheDocument()
    })
  })
})

describe('when the assets tab FF is disabled', () => {
  beforeEach(() => {
    screen = renderMainPage({ isAssetsTabEnabled: false })
  })

  it('should not show the tabs section', () => {
    expect(screen.queryByTestId('main-tabs')).not.toBeInTheDocument()
  })
})
