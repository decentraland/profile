import React from 'react'
import { renderWithProviders } from '../../../tests/tests'
import { NOT_FOUND_PAGE_DATA_TEST_ID } from '../../Pages/NotFoundPage'
import type { RouterProps } from '../WithRouter/WithRouter'
import WithProfile from './WithProfile'
import type { Props } from './WithProfile.types'

function renderConnectAndRedirect(props: Partial<Props> = {}) {
  return renderWithProviders(
    <WithProfile
      addressOrName="0x1"
      error={null}
      isLoading={false}
      hasLoadedProfile={false}
      isAddress={false}
      isLoggedIn={false}
      component={() => <div></div>}
      router={{ location: { pathname: '/' } as RouterProps<{ profileAddress: string }>['location'], params: {} }}
      onFetchProfile={jest.fn()}
      {...props}
    />
  )
}

let renderedComponent: ReturnType<typeof renderConnectAndRedirect>

describe('when rendering the with profile component', () => {
  const RENDERED_COMPONENT_TEST_ID = 'RenderedComponent'
  let addressOrName: string
  let isLoading: boolean
  let hasLoadedProfile: boolean
  let error: string | null
  let isAddress: boolean
  let onFetchProfile: jest.Mock
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let component: React.FunctionComponent<any>

  beforeEach(() => {
    onFetchProfile = jest.fn()
    component = () => <div data-testid={RENDERED_COMPONENT_TEST_ID}></div>
  })

  describe('and the address or name prop is a name', () => {
    beforeEach(() => {
      isAddress = false
      addressOrName = 'aName'
    })

    describe('and the profile is not being loaded', () => {
      beforeEach(() => {
        isLoading = false
      })

      describe('and the profile has not been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = false
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should load the not found page component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(NOT_FOUND_PAGE_DATA_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })

      describe('and the profile has been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = true
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should load the not found page component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(NOT_FOUND_PAGE_DATA_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })
    })

    describe('and the profile is being loaded', () => {
      beforeEach(() => {
        isLoading = true
      })

      describe('and the profile has not been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = false
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })

      describe('and the profile has been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = true
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })
    })
  })

  describe('and the address or name prop is an address', () => {
    beforeEach(() => {
      isAddress = true
      addressOrName = '0x1'
    })

    describe('and the profile is not being loaded', () => {
      beforeEach(() => {
        isLoading = false
      })

      describe('and the profile has not been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = false
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })

      describe('and the profile has been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = true
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })
    })

    describe('and the profile is being loaded', () => {
      beforeEach(() => {
        isLoading = true
      })

      describe('and the profile has not been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = false
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })

      describe('and the profile has been loaded', () => {
        beforeEach(() => {
          hasLoadedProfile = true
        })

        describe("and there's no error", () => {
          beforeEach(() => {
            error = null
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })

        describe("and there's an error", () => {
          beforeEach(() => {
            error = 'anError'
            renderedComponent = renderConnectAndRedirect({
              addressOrName,
              isLoading,
              hasLoadedProfile,
              error,
              isAddress,
              component,
              onFetchProfile
            })
          })

          it('should render the provided component and not call the onFetchProfile method prop', () => {
            const { getByTestId } = renderedComponent
            expect(getByTestId(RENDERED_COMPONENT_TEST_ID)).toBeInTheDocument()
            expect(onFetchProfile).not.toHaveBeenCalledWith(addressOrName)
          })
        })
      })
    })
  })
})
