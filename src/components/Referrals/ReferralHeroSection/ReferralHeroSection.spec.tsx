/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react'
import { fireEvent, waitFor, act } from '@testing-library/react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { config } from '../../../modules/config'
import { Avatar } from '../../../modules/profile/types'
import { locations } from '../../../modules/routing/locations'
import { renderWithProviders } from '../../../tests/tests'
import {
  REFERRAL_CONTAINER_TEST_ID,
  REFERRAL_COPY_OPTION_TEST_ID,
  REFERRAL_HOW_IT_WORKS_BUTTON_TEST_ID,
  REFERRAL_INPUT_TEST_ID,
  REFERRAL_SHARE_BUTTON_TEST_ID,
  REFERRAL_SHARE_MENU_TEST_ID,
  REFERRAL_SHARE_X_OPTION_TEST_ID,
  REFERRAL_STEPS_CONTAINER_TEST_ID,
  REFERRAL_ARROW_DOWN_ICON_TEST_ID,
  REFERRAL_ARROW_UP_ICON_TEST_ID
} from './constants'
import { ReferralHeroSection } from './ReferralHeroSection'
import { Props } from './ReferralHeroSection.types'

const INVITE_REFERRER_URL = config.get('INVITE_REFERRER_URL', '')

jest.mock('../../../modules/routing/locations', () => ({
  locations: {
    twitter: jest.fn()
  }
}))

describe('ReferralHeroSection', () => {
  let profileAddress: string
  let inviteUrl: string

  beforeEach(() => {
    profileAddress = '0x123456789abcdef'
    inviteUrl = `${INVITE_REFERRER_URL}/${profileAddress}`
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

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

    it('should display the steps container with hidden steps initially', () => {
      const { getByTestId, queryByText } = renderReferralHeroSection()
      const stepsContainer = getByTestId(REFERRAL_STEPS_CONTAINER_TEST_ID)

      expect(stepsContainer).toBeInTheDocument()
      expect(stepsContainer).toHaveStyle({ opacity: '0' })
      expect(stepsContainer).toHaveStyle({ visibility: 'hidden' })
      expect(stepsContainer).toHaveStyle({ maxHeight: '0px' })

      expect(queryByText(t('referral_hero_section.step_1'))).toBeInTheDocument()
      expect(queryByText(t('referral_hero_section.step_2'))).toBeInTheDocument()
      expect(queryByText(t('referral_hero_section.step_3'))).toBeInTheDocument()
    })

    it('should display the how it works button', () => {
      const { getByTestId } = renderReferralHeroSection()
      expect(getByTestId(REFERRAL_HOW_IT_WORKS_BUTTON_TEST_ID)).toBeInTheDocument()
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

    it('should display shortened address in input when no avatar provided', () => {
      const { getByTestId } = renderedComponent
      const textField = getByTestId(REFERRAL_INPUT_TEST_ID)
      const input = textField.querySelector('input') as HTMLInputElement
      expect(input.value).toContain('0x1234...')
    })

    describe('when clicking the how it works button', () => {
      it('should toggle the steps visibility', () => {
        const { getByTestId } = renderedComponent
        const howItWorksButton = getByTestId(REFERRAL_HOW_IT_WORKS_BUTTON_TEST_ID)
        const stepsContainer = getByTestId(REFERRAL_STEPS_CONTAINER_TEST_ID)

        expect(stepsContainer).toHaveStyle({ opacity: '0' })

        act(() => {
          fireEvent.click(howItWorksButton)
        })

        expect(stepsContainer).toHaveStyle({ opacity: '1' })

        act(() => {
          fireEvent.click(howItWorksButton)
        })

        expect(stepsContainer).toHaveStyle({ opacity: '0' })
      })

      it('should change the arrow icon when toggling', () => {
        const { getByTestId } = renderedComponent
        const howItWorksButton = getByTestId(REFERRAL_HOW_IT_WORKS_BUTTON_TEST_ID)

        expect(getByTestId(REFERRAL_ARROW_DOWN_ICON_TEST_ID)).toBeInTheDocument()

        act(() => {
          fireEvent.click(howItWorksButton)
        })

        expect(getByTestId(REFERRAL_ARROW_UP_ICON_TEST_ID)).toBeInTheDocument()

        act(() => {
          fireEvent.click(howItWorksButton)
        })

        expect(getByTestId(REFERRAL_ARROW_DOWN_ICON_TEST_ID)).toBeInTheDocument()
      })
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

  describe('when avatar has claimed name', () => {
    let renderedComponentWithAvatar: ReturnType<typeof renderReferralHeroSection>
    let mockAvatarWithClaimedName: Avatar

    beforeEach(() => {
      mockAvatarWithClaimedName = {
        userId: profileAddress,
        name: 'testuser',
        hasClaimedName: true,
        profilePictureUrl: 'https://example.com/avatar.png'
      } as unknown as Avatar
      renderedComponentWithAvatar = renderReferralHeroSection({ avatar: mockAvatarWithClaimedName })
    })

    it('should display claimed name in input field', () => {
      const { getByTestId } = renderedComponentWithAvatar
      const textField = getByTestId(REFERRAL_INPUT_TEST_ID)
      const input = textField.querySelector('input') as HTMLInputElement
      expect(input.value).toContain(mockAvatarWithClaimedName.name)
    })

    describe('when clicking the input', () => {
      it('should copy the link with claimed name to clipboard', async () => {
        const inviteUrlWithName = `${INVITE_REFERRER_URL}/${mockAvatarWithClaimedName.name}`
        const { getByTestId } = renderedComponentWithAvatar
        const input = getByTestId(REFERRAL_INPUT_TEST_ID)
        act(() => {
          fireEvent.click(input)
        })
        await waitFor(() => {
          expect(navigator.clipboard.writeText).toHaveBeenCalledWith(inviteUrlWithName)
        })
      })
    })
  })

  describe('when avatar has no claimed name', () => {
    let renderedComponentWithoutClaimed: ReturnType<typeof renderReferralHeroSection>
    let mockAvatarWithoutClaimedName: Avatar

    beforeEach(() => {
      mockAvatarWithoutClaimedName = {
        userId: profileAddress,
        name: 'testuser',
        hasClaimedName: false,
        profilePictureUrl: 'https://example.com/avatar.png'
      } as unknown as Avatar
      renderedComponentWithoutClaimed = renderReferralHeroSection({ avatar: mockAvatarWithoutClaimedName })
    })

    it('should display shortened address in input field', () => {
      const { getByTestId } = renderedComponentWithoutClaimed
      const textField = getByTestId(REFERRAL_INPUT_TEST_ID)
      const input = textField.querySelector('input') as HTMLInputElement
      expect(input.value).toContain('0x1234...')
    })

    describe('when clicking the input', () => {
      it('should copy the link with address', async () => {
        const { getByTestId } = renderedComponentWithoutClaimed
        const input = getByTestId(REFERRAL_INPUT_TEST_ID)
        act(() => {
          fireEvent.click(input)
        })
        await waitFor(() => {
          expect(navigator.clipboard.writeText).toHaveBeenCalledWith(inviteUrl)
        })
      })
    })
  })
})
