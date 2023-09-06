import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import usePageTracking from '../../../hooks/usePageTracking'
import { PageLayout } from '../../PageLayout'
import { Props } from './SignInPage.types'
import styles from './SignInPage.module.css'

const SignInPage = (props: Props) => {
  const { isConnected, onConnect } = props

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const navigate = useNavigate()

  usePageTracking()

  useEffect(() => {
    if (redirectTo && isConnected) {
      navigate(decodeURIComponent(redirectTo))
    }
  }, [redirectTo, isConnected, navigate])

  return (
    <PageLayout className={styles.signIn}>
      <SignIn isConnected={isConnected} handleLoginConnect={onConnect} />
    </PageLayout>
  )
}

export default SignInPage
