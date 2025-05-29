import React, { useMemo, useState } from 'react'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import XIcon from '@mui/icons-material/X'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { shorten } from 'decentraland-ui2/dist/components/AddressField/utils'
import { Box, InputAdornment, Menu, MenuItem, Tooltip } from 'decentraland-ui2'
import LogoWithPointerImageAsset from '../../assets/images/logo-with-pointer.png'
import EnvelopeImageAsset from '../../assets/images/referral-envelope.png'
import SportsMedalImageAsset from '../../assets/images/sports-medal.png'
import { config } from '../../modules/config'
import { locations } from '../../modules/routing/locations'
import {
  REFERRAL_CONTAINER_TEST_ID,
  REFERRAL_COPY_OPTION_TEST_ID,
  REFERRAL_INPUT_TEST_ID,
  REFERRAL_SHARE_BUTTON_TEST_ID,
  REFERRAL_SHARE_MENU_TEST_ID,
  REFERRAL_SHARE_X_OPTION_TEST_ID,
  REFERRAL_STEPS_CONTAINER_TEST_ID,
  REFERRAL_TOOLTIP_TEST_ID
} from './constants'
import {
  SectionContainer,
  EnvelopeImageContainer,
  Title,
  Subtitle,
  StepsContainer,
  Step,
  StepNumber,
  StepText,
  StepImage,
  ReferralContainer,
  ReferralTitle,
  ReferralInput,
  ReferralButton,
  EnvelopeImage,
  EnvelopeShadow,
  HeroWrapper,
  StepTextContainer
} from './ReferralHeroSection.styled'
import { Props } from './ReferralHeroSection.types'

const INVITE_REFERRER_URL = config.get('INVITE_REFERRER_URL', '')

const ReferralHeroSection = (props: Props) => {
  const { isLoading, profileAddress } = props

  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false)
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null)
  const shareMenuOpen = Boolean(anchorMenu)

  const inviteUrl = useMemo(() => {
    return `${INVITE_REFERRER_URL}/${profileAddress}`
  }, [INVITE_REFERRER_URL])

  return (
    <SectionContainer>
      <EnvelopeImageContainer>
        <EnvelopeShadow />
        <EnvelopeImage src={EnvelopeImageAsset} alt="Envelope" />
      </EnvelopeImageContainer>
      <HeroWrapper>
        <Title variant="h3">{t('referral_hero_section.title')}</Title>
        <Subtitle>
          {t('referral_hero_section.subtitle')}
          <Tooltip disableFocusListener title="Some information" placement="right">
            <InfoOutlinedIcon fontSize="small" />
          </Tooltip>
        </Subtitle>
        <StepsContainer data-testid={REFERRAL_STEPS_CONTAINER_TEST_ID}>
          <Step>
            <StepTextContainer>
              <StepNumber variant="h5">1</StepNumber>
              <StepText variant="body1">{t('referral_hero_section.step_1')}</StepText>
            </StepTextContainer>
            <StepImage src={EnvelopeImageAsset} alt="Step 1" />
          </Step>
          <Step>
            <StepTextContainer>
              <StepNumber variant="h5">2</StepNumber>
              <StepText variant="body1">{t('referral_hero_section.step_2')}</StepText>
            </StepTextContainer>
            <StepImage src={LogoWithPointerImageAsset} alt="Step 2" />
          </Step>
          <Step>
            <StepTextContainer>
              <StepNumber variant="h5">3</StepNumber>
              <StepText variant="body1">{t('referral_hero_section.step_3')}</StepText>
            </StepTextContainer>
            <StepImage src={SportsMedalImageAsset} alt="Step 3" />
          </Step>
        </StepsContainer>
        {!isLoading && (
          <ReferralContainer data-testid={REFERRAL_CONTAINER_TEST_ID}>
            <ReferralTitle variant="subtitle1">{t('referral_hero_section.your_referral_link')}</ReferralTitle>
            <Box display="flex" width="100%">
              <Tooltip
                data-testid={REFERRAL_TOOLTIP_TEST_ID}
                onClose={() => setCopyTooltipOpen(false)}
                open={copyTooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckRoundedIcon /> {t('referral_hero_section.copied_to_clipboard')}
                  </Box>
                }
              >
                <ReferralInput
                  data-testid={REFERRAL_INPUT_TEST_ID}
                  value={`${INVITE_REFERRER_URL}/${shorten(profileAddress)}`}
                  onClick={() => {
                    navigator.clipboard.writeText(inviteUrl)
                    setCopyTooltipOpen(true)
                    setTimeout(() => {
                      setCopyTooltipOpen(false)
                    }, 2000)
                  }}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <ContentCopyOutlinedIcon />
                      </InputAdornment>
                    )
                  }}
                />
              </Tooltip>
              <ReferralButton
                data-testid={REFERRAL_SHARE_BUTTON_TEST_ID}
                variant="contained"
                endIcon={<ShareRoundedIcon />}
                onClick={e => setAnchorMenu(e.currentTarget)}
              >
                {t('referral_hero_section.share')}
              </ReferralButton>
              <Menu
                data-testid={REFERRAL_SHARE_MENU_TEST_ID}
                id="basic-menu"
                anchorEl={anchorMenu}
                open={shareMenuOpen}
                onClose={() => setAnchorMenu(null)}
                MenuListProps={{
                  ['aria-labelledby']: 'share-button'
                }}
              >
                <MenuItem
                  data-testid={REFERRAL_COPY_OPTION_TEST_ID}
                  onClick={() => {
                    navigator.clipboard.writeText(inviteUrl)
                    setCopyTooltipOpen(true)
                    setTimeout(() => {
                      setCopyTooltipOpen(false)
                    }, 2000)
                    setAnchorMenu(null)
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <ContentCopyOutlinedIcon /> {t('referral_hero_section.copy_link')}
                  </Box>
                </MenuItem>
                <MenuItem
                  data-testid={REFERRAL_SHARE_X_OPTION_TEST_ID}
                  onClick={() => {
                    window.open(locations.twitter(t('referral_hero_section.share_on_x_title'), 'https://decentraland.org'), '_blank')
                    setAnchorMenu(null)
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <XIcon /> {t('referral_hero_section.share_on_x')}
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </ReferralContainer>
        )}
      </HeroWrapper>
    </SectionContainer>
  )
}

export default ReferralHeroSection
