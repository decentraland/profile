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

const ReferralHeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '1605px',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 24px)'
  }
}))

const ReferralJourneySectionContainer = styled(Box)(({ theme }) => ({
  width: 'calc(100% - 8px)',
  display: 'flex',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 24px)'
  }
}))

export { ReferralsContainer, ReferralHeroContainer, ReferralJourneySectionContainer }
