import React from 'react'
import { renderWithProviders } from '../../tests/tests'
import { MOCK_HERO_SECTION_TEST_ID, MOCK_JOURNEY_TEST_ID } from './__mocks__/constants'
import { REFERRALS_CONTAINER_TEST_ID, REFERRALS_HERO_SECTION_TEST_ID, REFERRALS_JOURNEY_TEST_ID } from './constants'
import Referrals from './Referrals'
import { Props } from './Referrals.types'

jest.mock('./ReferralHeroSection', () => ({
  ReferralHeroSection: () => <div data-testid={MOCK_HERO_SECTION_TEST_ID} />
}))

jest.mock('./ReferralJourney', () => ({
  ReferralJourney: () => <div data-testid={MOCK_JOURNEY_TEST_ID} />
}))

describe('Referrals', () => {
  let defaultProps: Props

  beforeEach(() => {
    defaultProps = {
      isLoading: false,
      error: null,
      profileAddress: '0x123',
      invitedUsersAccepted: 0,
      invitedUsersAcceptedViewed: 0,
      onFetchReferrals: jest.fn() as unknown as Props['onFetchReferrals']
    }
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('when rendering the component', () => {
    it('should render the main container and child components', () => {
      const { getByTestId } = renderWithProviders(<Referrals {...defaultProps} />)

      expect(getByTestId(REFERRALS_CONTAINER_TEST_ID)).toBeInTheDocument()
      expect(getByTestId(REFERRALS_HERO_SECTION_TEST_ID)).toBeInTheDocument()
      expect(getByTestId(REFERRALS_JOURNEY_TEST_ID)).toBeInTheDocument()
      expect(getByTestId(MOCK_HERO_SECTION_TEST_ID)).toBeInTheDocument()
      expect(getByTestId(MOCK_JOURNEY_TEST_ID)).toBeInTheDocument()
    })
  })

  describe('when mounting the component', () => {
    it('should call onFetchReferrals if profileAddress is provided', () => {
      renderWithProviders(<Referrals {...defaultProps} />)

      expect(defaultProps.onFetchReferrals).toHaveBeenCalled()
    })

    it('should not call onFetchReferrals if profileAddress is empty', () => {
      renderWithProviders(<Referrals {...defaultProps} profileAddress="" />)

      expect(defaultProps.onFetchReferrals).not.toHaveBeenCalled()
    })
  })
})
