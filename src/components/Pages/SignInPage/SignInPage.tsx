import React, { useEffect } from 'react'
import { useSearchParams, useNavigate, useHref } from 'react-router-dom'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import usePageTracking from '../../../hooks/usePageTracking'
import { config } from '../../../modules/config'
import { PageLayout } from '../../PageLayout'
import { Props } from './SignInPage.types'
import styles from './SignInPage.module.css'

const SignInPage = (props: Props) => {
  const { isConnected, isAuthDappEnabled, isConnecting, onConnect } = props

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const navigate = useNavigate()
  const redirectToHref = useHref(redirectTo || '')

  usePageTracking()

  useEffect(() => {
    if (!isConnected && !isConnecting && isAuthDappEnabled) {
      window.location.replace(`${config.get('AUTH_URL')}?redirectTo=${redirectToHref}`)
      return
    }

    if (redirectTo && isConnected) {
      navigate(decodeURIComponent(redirectTo))
    }
  }, [redirectTo, isConnected, isConnecting, isAuthDappEnabled, navigate])

  return (
    <PageLayout className={styles.signIn}>
      <SignIn isConnected={isConnected} handleLoginConnect={onConnect} />
    </PageLayout>
  )
}

export default SignInPage
