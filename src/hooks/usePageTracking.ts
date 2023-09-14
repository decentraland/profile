import { useEffect } from 'react'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'

const usePageTracking = () => {
  useEffect(() => {
    const analytics = getAnalytics()

    if (analytics) {
      analytics.page()
    }
  }, [])
}

export default usePageTracking
