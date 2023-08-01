import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

// eslint-disable-next-line @typescript-eslint/naming-convention
const withRouter = (Component: React.ReactElement | any) => {
  function ComponentWithRouterProp(props: any) {
    const location = useLocation()
    const navigate = useNavigate()
    const params = useParams()
    return <Component {...props} router={{ location, navigate, params }} />
  }

  return ComponentWithRouterProp
}

export type RouterProps = {
  location: ReturnType<typeof useLocation>
  params: ReturnType<typeof useParams>
}

export default withRouter
