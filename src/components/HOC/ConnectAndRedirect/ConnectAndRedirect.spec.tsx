import React from 'react'
import { LOCATION_DISPLAY_TEST_ID, renderWithProviders } from '../../../tests/tests'
import { LOADING_PAGE_TEST_ID } from '../../Pages/LoadingPage/constants'
import ConnectAndRedirect from './ConnectAndRedirect'
import { Props } from './ConnectAndRedirect.types'

function renderConnectAndRedirect(props: Partial<Props> = {}) {
  return renderWithProviders(<ConnectAndRedirect isUserLoggedIn={false} isUserLoggingIn={false} {...props} />)
}

let renderedComponent: ReturnType<typeof renderConnectAndRedirect>

describe('when rendering the connect and redirect component with a user logging in', () => {
  beforeEach(() => {
    renderedComponent = renderConnectAndRedirect({ isUserLoggingIn: true })
  })

  it('should render the loading page', () => {
    const { getByTestId } = renderedComponent
    expect(getByTestId(LOADING_PAGE_TEST_ID)).toBeInTheDocument()
  })
})

describe('when rendering the connect and redirect component with a logged in user', () => {
  let address: string

  beforeEach(() => {
    address = '0x0'
    renderedComponent = renderConnectAndRedirect({ isUserLoggedIn: true, userAddress: address })
  })

  it("should redirect the site to the account path with the user's address", () => {
    const { getByTestId } = renderedComponent
    expect(getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent(`/accounts/${address}`)
  })
})

describe('when rendering the connect and redirect component with a logged out user', () => {
  beforeEach(() => {
    renderedComponent = renderConnectAndRedirect()
  })

  it('should redirect the site to the sign in path', () => {
    const { getByTestId } = renderedComponent
    expect(getByTestId(LOCATION_DISPLAY_TEST_ID)).toHaveTextContent('/sign-in')
  })
})
