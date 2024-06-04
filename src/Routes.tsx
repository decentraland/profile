import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { usePageTracking } from 'decentraland-dapps/dist/hooks/usePageTracking'
import ConnectAndRedirect from './components/HOC/ConnectAndRedirect'
import WithProfile from './components/HOC/WithProfile'
import MainPage from './components/Pages/MainPage'
import SignInPage from './components/Pages/SignInPage'

export default function AppRoutes() {
  usePageTracking()

  return (
    <Routes>
      <Route path="/accounts/:profileAddress/:tab?" element={<WithProfile component={MainPage} />} />
      <Route path="sign-in" element={<SignInPage />} />
      <Route path="*" element={<ConnectAndRedirect />} />
    </Routes>
  )
}
