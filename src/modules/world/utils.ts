import { World } from './types'

export const sortByDeploymentTime = (a: World, b: World) => {
  if (a.deployTime < b.deployTime) {
    return 1
  } else if (a.deployTime > b.deployTime) {
    return -1
  }
  return 0
}
