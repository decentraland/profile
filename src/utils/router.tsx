import React from 'react'
import { createBrowserRouter as rrdCreateBrowserRouter } from 'react-router-dom'
import WithPageView from '../components/HOC/WithPageView'

export function createBrowserRouter(...args: Parameters<typeof rrdCreateBrowserRouter>) {
  const [routes, opts] = args

  const mappedRoutes = routes.map(route => {
    if (!route.element) {
      return route
    }

    return {
      ...route,
      element: <WithPageView>{route.element}</WithPageView>
    }
  })

  return rrdCreateBrowserRouter(mappedRoutes, opts)
}
