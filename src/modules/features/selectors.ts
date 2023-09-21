import { getIsFeatureEnabled, hasLoadedInitialFlags } from 'decentraland-dapps/dist/modules/features/selectors'
import { ApplicationName } from 'decentraland-dapps/dist/modules/features/types'
import { RootState } from '../reducer'
import { FeatureName } from './types'

export const getIsCreationsTabEnabled = (state: RootState) => {
  return false
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.PROFILE, FeatureName.CREATIONS)
  }
  return false
}

export const getIsAssetsTabEnabled = (state: RootState) => {
  if (hasLoadedInitialFlags(state)) {
    return getIsFeatureEnabled(state, ApplicationName.PROFILE, FeatureName.ASSETS)
  }
  return false
}
