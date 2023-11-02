import React, { useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import ConnectAndRedirect from './components/HOC/ConnectAndRedirect'
import WithProfile from './components/HOC/WithProfile'
import MainPage from './components/Pages/MainPage'
import SignInPage from './components/Pages/SignInPage'

export default function AppRoutes() {
  const location = useLocation()

  useEffect(() => {
    console.log('HELLO', location)
    const analytics = getAnalytics()

    if (analytics) {
      analytics.page()
    }
  }, [location])

  return (
    <Routes>
      <Route path="/accounts/:profileAddress/:tab?" element={<WithProfile component={MainPage} />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="*" element={<ConnectAndRedirect />} />
    </Routes>
  )
}
