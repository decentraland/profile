import React, { useEffect } from 'react'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { useLocation } from 'react-router-dom'
import { Props } from './WithPageView.types'

const WithPageView = ({ children }: Props) => {
  const location = useLocation()

  useEffect(() => {
    getAnalytics().page()
  }, [location])

  return <>{children}</>
}

export default WithPageView
