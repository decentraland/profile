import React, { useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { default as SignIn } from 'decentraland-dapps/dist/containers/SignInPage'
import { config } from '../../../modules/config'
import { PageLayout } from '../../PageLayout'
import { Props } from './SignInPage.types'
import styles from './SignInPage.module.css'

const SignInPage = (props: Props) => {
  const { isConnected, isConnecting, onConnect } = props

  const [searchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirectTo')
  const navigate = useNavigate()

  useEffect(() => {
    if (!isConnected && !isConnecting) {
      const basename = /^decentraland.(zone|org|today)$/.test(window.location.host) ? '/profile' : ''
      window.location.replace(`${config.get('AUTH_URL')}/login?redirectTo=${encodeURIComponent(`${basename}${redirectTo || '/'}`)}`)
      return
    }

    if (redirectTo && isConnected) {
      navigate(decodeURIComponent(redirectTo))
    }
  }, [redirectTo, isConnected, isConnecting, navigate])

  return (
    <PageLayout className={styles.signIn}>
      <SignIn isConnected={isConnected} handleLoginConnect={onConnect} />
    </PageLayout>
  )
}

export default SignInPage
