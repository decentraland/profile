import { Box, Button, TextField, Typography, styled } from 'decentraland-ui2'

const Title = styled(Typography)({
  fontWeight: 600,
  fontSize: '24px',
  lineHeight: '133%',
  letterSpacing: '0px',
  marginBottom: '32px'
})

const Subtitle = styled(Typography)({
  fontWeight: 400,
  fontSize: '18px',
  lineHeight: '100%',
  letterSpacing: '0px',
  marginBottom: '12px'
})

const ModalInputContainer = styled(Box)({
  display: 'flex',
  width: '100%'
})

const ModalInput = styled(TextField)({
  width: '100%',
  borderRadius: '8px',
  fontSize: '16px',
  marginRight: '8px',
  height: '40px',
  ['& .MuiInputBase-root']: {
    background: 'rgba(252, 252, 252, 1)',
    color: 'rgba(0, 0, 0, 1)',
    height: '40px'
  }
})

const ModalButton = styled(Button)({
  width: '158px',
  height: '42px'
})

export { Title, Subtitle, ModalInputContainer, ModalInput, ModalButton }
