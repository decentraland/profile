/* eslint-disable @typescript-eslint/naming-convention */
import { NotificationType } from '@dcl/schemas'
import { RootState } from '../reducer'
import { getSubscriptionsSettingsRequest } from './actions'
import { SubscriptionSettingsState, buildInitialState } from './reducer'
import {
  getEmail,
  getSubscriptionSettingByNotificationType,
  getSubscriptionSettings,
  hasEmail,
  isIgnoringAllEmail,
  isIgnoringAllInApp,
  isLoadingSubscriptions
} from './selectors'

let subscriptionSettings: SubscriptionSettingsState

let state: RootState

beforeEach(() => {
  subscriptionSettings = buildInitialState()
  state = {
    subscriptionSettings: subscriptionSettings
  } as RootState
})

describe('when selecting the email', () => {
  it('should return the email from the state', () => {
    expect(getEmail(state)).toBe(subscriptionSettings.email)
  })
})

describe('when asking whether the state has email', () => {
  describe('and the state doesn`t have an email', () => {
    it('should return false', () => {
      expect(hasEmail(state)).toBe(false)
    })
  })
  describe('and the state has an email', () => {
    it('should return true', () => {
      expect(hasEmail({ ...state, subscriptionSettings: { ...subscriptionSettings, email: 'example@mail.com' } })).toBe(true)
    })
  })
})

describe('when selecting the subscription settings', () => {
  it('should return the subscription settings from the state', () => {
    expect(getSubscriptionSettings(state)).toBe(subscriptionSettings.subscriptionDetails)
  })
})

describe('when asking whether the state is ignoring all email', () => {
  describe('and the state is ignoring all email', () => {
    it('should return true', () => {
      expect(isIgnoringAllEmail(state)).toBe(true)
    })
  })
  describe('and the state is not ignoring all email', () => {
    it('should return false', () => {
      expect(
        isIgnoringAllEmail({
          ...state,
          subscriptionSettings: {
            ...subscriptionSettings,
            subscriptionDetails: { ...subscriptionSettings.subscriptionDetails, ignore_all_email: false }
          }
        })
      ).toBe(false)
    })
  })
})

describe('when asking whether the state is ignoring all in-app notifications', () => {
  describe('and the state is ignoring all in-app notifications', () => {
    it('should return true', () => {
      expect(
        isIgnoringAllInApp({
          ...state,
          subscriptionSettings: {
            ...subscriptionSettings,
            subscriptionDetails: { ...subscriptionSettings.subscriptionDetails, ignore_all_in_app: true }
          }
        })
      ).toBe(true)
    })
  })
  describe('and the state is not ignoring all in-app notifications', () => {
    it('should return false', () => {
      expect(isIgnoringAllInApp(state)).toBe(false)
    })
  })
})

describe('when selecting the subscription setting by notification type', () => {
  it('should return the setting for the given notification type', () => {
    const getSetting = getSubscriptionSettingByNotificationType(state)
    expect(getSetting(NotificationType.BID_ACCEPTED)).toBe(
      subscriptionSettings.subscriptionDetails.message_type[NotificationType.BID_ACCEPTED]
    )
  })
})

describe('when asking whether the state is loading subscriptions', () => {
  describe('and the state is loading subscriptions', () => {
    beforeEach(() => {
      state.subscriptionSettings.loading = [getSubscriptionsSettingsRequest()]
    })
    it('should return true', () => {
      expect(isLoadingSubscriptions(state)).toBe(true)
    })
  })
  describe('and the state is not loading subscriptions', () => {
    it('should return false', () => {
      expect(isLoadingSubscriptions(state)).toBe(false)
    })
  })
})
