import { Box, styled } from 'decentraland-ui2'

const ReferralsContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  borderRadius: '16px',
  padding: '12px',
  gap: '16px',
  backgroundColor: '#351444'
})

const ReferralJourneySectionContainer = styled(Box)(({ theme }) => ({
  width: 'calc(100% - 48px)',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 24px)'
  }
}))

export { ReferralsContainer, ReferralJourneySectionContainer }
