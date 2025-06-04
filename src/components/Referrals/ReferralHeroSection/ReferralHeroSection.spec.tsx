/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react'
import { fireEvent, waitFor, act } from '@testing-library/react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { config } from '../../../modules/config'
import { locations } from '../../../modules/routing/locations'
import { renderWithProviders } from '../../../tests/tests'
import {
  REFERRAL_CONTAINER_TEST_ID,
  REFERRAL_COPY_OPTION_TEST_ID,
  REFERRAL_INPUT_TEST_ID,
  REFERRAL_SHARE_BUTTON_TEST_ID,
  REFERRAL_SHARE_MENU_TEST_ID,
  REFERRAL_SHARE_X_OPTION_TEST_ID,
  REFERRAL_STEPS_CONTAINER_TEST_ID
} from './constants'
import { ReferralHeroSection } from './ReferralHeroSection'
import { Props } from './ReferralHeroSection.types'

const INVITE_REFERRER_URL = config.get('INVITE_REFERRER_URL', '')

jest.mock('../../modules/routing/locations', () => ({
  locations: {
    twitter: jest.fn()
  }
}))

describe('ReferralHeroSection', () => {
  const profileAddress = '0x123456789abcdef'
  const inviteUrl = `${INVITE_REFERRER_URL}/${profileAddress}`

  const renderReferralHeroSection = (props: Partial<Props> = {}) => {
    return renderWithProviders(<ReferralHeroSection profileAddress={profileAddress} isLoading={false} {...props} />)
  }

  beforeEach(() => {
    jest.useFakeTimers()
    Object.assign(navigator, {
      clipboard: {
        writeText: jest.fn().mockImplementation(() => Promise.resolve())
      }
    })
  })

  afterEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  describe('when rendering the component', () => {
    it('should display title and subtitle', () => {
      const { getByText } = renderReferralHeroSection()
      expect(getByText(t('referral_hero_section.title'))).toBeInTheDocument()
      expect(getByText(t('referral_hero_section.subtitle'))).toBeInTheDocument()
    })

    it('should display the three steps', () => {
      const { getByTestId, getByText } = renderReferralHeroSection()
      expect(getByTestId(REFERRAL_STEPS_CONTAINER_TEST_ID)).toBeInTheDocument()
      expect(getByText(t('referral_hero_section.step_1'))).toBeInTheDocument()
      expect(getByText(t('referral_hero_section.step_2'))).toBeInTheDocument()
      expect(getByText(t('referral_hero_section.step_3'))).toBeInTheDocument()
    })
  })

  describe('when the component is loading', () => {
    let renderedComponent: ReturnType<typeof renderReferralHeroSection>

    beforeEach(() => {
      renderedComponent = renderReferralHeroSection({ isLoading: true })
    })

    it('should not display the referral container', () => {
      const { queryByTestId } = renderedComponent
      expect(queryByTestId(REFERRAL_CONTAINER_TEST_ID)).not.toBeInTheDocument()
    })
  })

  describe('when the component is not loading', () => {
    let renderedComponent: ReturnType<typeof renderReferralHeroSection>

    beforeEach(() => {
      renderedComponent = renderReferralHeroSection({ isLoading: false })
    })

    it('should display the referral container', () => {
      const { getByTestId } = renderedComponent
      expect(getByTestId(REFERRAL_CONTAINER_TEST_ID)).toBeInTheDocument()
    })

    describe('when clicking the copy button', () => {
      let clickInput: (getByTestId: (id: string) => HTMLElement) => Promise<void>

      beforeEach(() => {
        clickInput = async (getByTestId: (id: string) => HTMLElement) => {
          const input = getByTestId(REFERRAL_INPUT_TEST_ID)
          act(() => {
            fireEvent.click(input)
          })
        }
      })

      it('should copy the link to clipboard', async () => {
        const { getByTestId } = renderedComponent
        await clickInput(getByTestId)
        await waitFor(() => {
          expect(navigator.clipboard.writeText).toHaveBeenCalledWith(inviteUrl)
        })
      })

      it('should show and hide the copied tooltip', async () => {
        const { getByTestId, findByText, queryByText } = renderedComponent
        await clickInput(getByTestId)
        const tooltip = await findByText(t('referral_hero_section.copied_to_clipboard'))
        expect(tooltip).toBeInTheDocument()
        await act(async () => jest.advanceTimersByTime(2000))
        await waitFor(() => expect(queryByText(t('referral_hero_section.copied_to_clipboard'))).not.toBeInTheDocument())
      })
    })

    describe('when interacting with the share menu', () => {
      let openShareMenu: (
        getByTestId: (id: string) => HTMLElement,
        findByTestId: (id: string) => Promise<HTMLElement>
      ) => Promise<HTMLElement>
      let mockTwitterUrl: string
      let mockOpen: jest.SpyInstance

      beforeEach(() => {
        openShareMenu = async (getByTestId: (id: string) => HTMLElement, findByTestId: (id: string) => Promise<HTMLElement>) => {
          const shareButton = getByTestId(REFERRAL_SHARE_BUTTON_TEST_ID)
          act(() => {
            fireEvent.click(shareButton)
          })
          return await findByTestId(REFERRAL_SHARE_MENU_TEST_ID)
        }

        mockTwitterUrl = 'https://twitter.com/test'
        ;(locations.twitter as jest.Mock).mockReturnValue(mockTwitterUrl)
        mockOpen = jest.spyOn(window, 'open').mockImplementation(() => null)
      })

      afterEach(() => {
        mockOpen.mockRestore()
      })

      describe('when clicking the share button', () => {
        it('should open the menu', async () => {
          const { getByTestId, findByTestId } = renderedComponent
          const menu = await openShareMenu(getByTestId, findByTestId)
          expect(menu).toBeInTheDocument()
        })
      })

      describe('when clicking the copy option', () => {
        it('should copy the link', async () => {
          const { getByTestId, findByTestId } = renderedComponent
          await openShareMenu(getByTestId, findByTestId)
          const copyOption = await findByTestId(REFERRAL_COPY_OPTION_TEST_ID)
          act(() => {
            fireEvent.click(copyOption)
          })
          await waitFor(() => {
            expect(navigator.clipboard.writeText).toHaveBeenCalledWith(inviteUrl)
          })
        })
      })

      describe('when clicking the share on X option', () => {
        it('should open Twitter', async () => {
          const { getByTestId, findByTestId } = renderedComponent
          await openShareMenu(getByTestId, findByTestId)
          const twitterOption = await findByTestId(REFERRAL_SHARE_X_OPTION_TEST_ID)
          act(() => {
            fireEvent.click(twitterOption)
          })
          await waitFor(() => {
            expect(locations.twitter).toHaveBeenCalledWith(t('referral_hero_section.share_on_x_title'), inviteUrl)
            expect(mockOpen).toHaveBeenCalledWith(mockTwitterUrl, '_blank')
          })
        })
      })
    })
  })
})
