import { Item } from '@dcl/schemas'
import { INITIAL_STATE } from 'decentraland-dapps/dist/modules/features/reducer'
import { getIsFeatureEnabled, hasLoadedInitialFlags } from 'decentraland-dapps/dist/modules/features/selectors'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { RootState } from '../reducer'
import { getIsAuthDappEnabled } from './selectors'
import { FeatureName } from './types'

jest.mock('decentraland-dapps/dist/modules/features/selectors', () => {
  const originalModule = jest.requireActual('decentraland-dapps/dist/modules/features/selectors')

  return {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    __esModule: true,
    ...originalModule,
    getIsFeatureEnabled: jest.fn(),
    hasLoadedInitialFlags: jest.fn()
  }
})

let state: RootState
let getIsFeatureEnabledMock: jest.MockedFunction<typeof getIsFeatureEnabled>
let hasLoadedInitialFlagsMock: jest.MockedFunction<typeof hasLoadedInitialFlags>

beforeEach(() => {
  state = {
    features: {
      ...INITIAL_STATE,
      data: {
        anItemId: {} as Item
      },
      error: 'anError',
      loading: []
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any
  getIsFeatureEnabledMock = getIsFeatureEnabled as jest.MockedFunction<typeof getIsFeatureEnabled>
  hasLoadedInitialFlagsMock = hasLoadedInitialFlags as jest.MockedFunction<typeof hasLoadedInitialFlags>
})

const waitForInitialLoadingSelectors = [
  {
    name: 'auth-dapp',
    feature: FeatureName.AUTH_DAPP,
    selector: getIsAuthDappEnabled,
    applicationName: ApplicationName.DAPPS
  }
]

waitForInitialLoadingSelectors.forEach(({ name, feature, applicationName, selector }) =>
  describe(`when getting if the ${name} feature flag is enabled`, () => {
    describe('when the initial flags have not been yet loaded', () => {
      beforeEach(() => {
        hasLoadedInitialFlagsMock.mockReturnValueOnce(false)
      })

      it('should return false', () => {
        const isEnabled = selector(state)

        expect(isEnabled).toBe(false)
        expect(getIsFeatureEnabledMock).not.toHaveBeenCalled()
      })
    })

    describe('when the initial flags have not been yet loaded', () => {
      beforeEach(() => {
        hasLoadedInitialFlagsMock.mockReturnValueOnce(true)
      })

      describe('when the feature is not enabled', () => {
        beforeEach(() => {
          getIsFeatureEnabledMock.mockReturnValueOnce(false)
        })

        afterEach(() => {
          getIsFeatureEnabledMock.mockRestore()
        })

        it('should return false', () => {
          const isEnabled = selector(state)

          expect(isEnabled).toBe(false)
          expect(getIsFeatureEnabledMock).toHaveBeenCalledWith(state, applicationName || ApplicationName.PROFILE, feature)
        })
      })

      describe('when the feature is enabled', () => {
        beforeEach(() => {
          getIsFeatureEnabledMock.mockReturnValueOnce(true)
        })

        afterEach(() => {
          getIsFeatureEnabledMock.mockRestore()
        })

        it('should return true', () => {
          const isEnabled = selector(state)

          expect(isEnabled).toBe(true)
          expect(getIsFeatureEnabledMock).toHaveBeenCalledWith(state, applicationName || ApplicationName.PROFILE, feature)
        })
      })
    })
  })
)
