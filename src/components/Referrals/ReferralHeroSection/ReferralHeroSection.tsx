import React, { useCallback, useMemo, useState } from 'react'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded'
import ShareRoundedIcon from '@mui/icons-material/ShareRounded'
import XIcon from '@mui/icons-material/X'
import { getAnalytics } from 'decentraland-dapps/dist/modules/analytics/utils'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { shorten } from 'decentraland-ui2/dist/components/AddressField/utils'
import { Box, InputAdornment, Menu, MenuItem, Tooltip, useTabletAndBelowMediaQuery, Typography } from 'decentraland-ui2'
import LogoWithPointerImageAsset from '../../../assets/images/logo-with-pointer.webp'
import EnvelopeImageAsset from '../../../assets/images/referral-envelope.webp'
import SportsMedalImageAsset from '../../../assets/images/sports-medal.webp'
import { Events, ShareType } from '../../../modules/analytics/types'
import { config } from '../../../modules/config'
import { locations } from '../../../modules/routing/locations'
import {
  REFERRAL_CONTAINER_TEST_ID,
  REFERRAL_COPY_OPTION_TEST_ID,
  REFERRAL_HOW_IT_WORKS_BUTTON_TEST_ID,
  REFERRAL_INPUT_TEST_ID,
  REFERRAL_SHARE_BUTTON_TEST_ID,
  REFERRAL_SHARE_MENU_TEST_ID,
  REFERRAL_SHARE_X_OPTION_TEST_ID,
  REFERRAL_STEPS_CONTAINER_TEST_ID,
  REFERRAL_TOOLTIP_TEST_ID,
  REFERRAL_ARROW_DOWN_ICON_TEST_ID,
  REFERRAL_ARROW_UP_ICON_TEST_ID
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
  ReferralInput,
  ReferralButton,
  EnvelopeImage,
  EnvelopeShadow,
  HeroWrapper,
  StepTextContainer,
  HowItWorksButton,
  TooltipLink
} from './ReferralHeroSection.styled'
import { Props } from './ReferralHeroSection.types'

const INVITE_REFERRER_URL = config.get('INVITE_REFERRER_URL', '')

// eslint-disable-next-line import/no-named-as-default-member
const ReferralHeroSection = React.memo((props: Props) => {
  const { isLoading, profileAddress, avatar } = props

  const [copyTooltipOpen, setCopyTooltipOpen] = useState(false)
  const [anchorMenu, setAnchorMenu] = useState<null | HTMLElement>(null)
  const shareMenuOpen = Boolean(anchorMenu)
  const isTabletOrBelow = useTabletAndBelowMediaQuery()
  const [showSteps, setShowSteps] = useState(false)

  const inviteUrl = useMemo(() => {
    return `${INVITE_REFERRER_URL}/${avatar?.hasClaimedName ? avatar.name : profileAddress}`
  }, [INVITE_REFERRER_URL, avatar])

  const handleShareButtonClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isTabletOrBelow && typeof navigator !== 'undefined' && !!navigator.share) {
        getAnalytics()?.track(Events.CLICK_BUTTON, {
          type: ShareType.MOBILE_SHARE,
          url: inviteUrl,
          userAddress: profileAddress
        })
        await navigator.share({
          title: 'TITLE',
          text: t('referral_hero_section.share_on_x_title'),
          url: inviteUrl
        })
      } else {
        setAnchorMenu(e.currentTarget)
      }
    },
    [isTabletOrBelow, inviteUrl, getAnalytics]
  )

  const handleShareOnXClick = useCallback(() => {
    window.open(locations.twitter(t('referral_hero_section.share_on_x_title'), inviteUrl), '_blank')
    setAnchorMenu(null)
    getAnalytics()?.track(Events.CLICK_BUTTON, {
      type: ShareType.X,
      url: inviteUrl,
      userAddress: profileAddress
    })
  }, [inviteUrl, profileAddress, getAnalytics])

  const handleCopyLink = useCallback(() => {
    navigator.clipboard.writeText(inviteUrl)
    setCopyTooltipOpen(true)
    setTimeout(() => {
      setCopyTooltipOpen(false)
    }, 2000)
    setAnchorMenu(null)
    getAnalytics()?.track(Events.CLICK_BUTTON, {
      type: ShareType.COPY_LINK,
      url: inviteUrl,
      userAddress: profileAddress
    })
  }, [inviteUrl, profileAddress, getAnalytics])

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
          <Tooltip
            disableFocusListener
            arrow
            title={
              <Typography color="inherit">
                {t('referral_hero_section.tooltip_text')}
                <TooltipLink href="https://decentraland.org/referral-terms" target="_blank">
                  {t('referral_hero_section.tooltip_link_label')}
                </TooltipLink>
                .
              </Typography>
            }
            placement="top"
          >
            <InfoOutlinedIcon fontSize="small" />
          </Tooltip>
        </Subtitle>
        {!isLoading && (
          <ReferralContainer data-testid={REFERRAL_CONTAINER_TEST_ID}>
            <Box display="flex" width="100%">
              <Tooltip
                data-testid={REFERRAL_TOOLTIP_TEST_ID}
                onClose={() => setCopyTooltipOpen(false)}
                open={copyTooltipOpen}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                arrow
                title={
                  <Box display="flex" alignItems="center" gap={1}>
                    <CheckRoundedIcon /> {t('referral_hero_section.copied_to_clipboard')}
                  </Box>
                }
              >
                <ReferralInput
                  data-testid={REFERRAL_INPUT_TEST_ID}
                  value={`${INVITE_REFERRER_URL}/${avatar?.hasClaimedName ? avatar.name : shorten(profileAddress)}`}
                  onClick={handleCopyLink}
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title={t('referral_hero_section.copy_link')} placement="top" arrow>
                          <ContentCopyOutlinedIcon />
                        </Tooltip>
                      </InputAdornment>
                    )
                  }}
                />
              </Tooltip>
              <ReferralButton
                data-testid={REFERRAL_SHARE_BUTTON_TEST_ID}
                variant="contained"
                endIcon={<ShareRoundedIcon />}
                onClick={handleShareButtonClick}
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
                <MenuItem data-testid={REFERRAL_COPY_OPTION_TEST_ID} onClick={handleCopyLink}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <ContentCopyOutlinedIcon /> {t('referral_hero_section.copy_link')}
                  </Box>
                </MenuItem>
                <MenuItem data-testid={REFERRAL_SHARE_X_OPTION_TEST_ID} onClick={handleShareOnXClick}>
                  <Box display="flex" alignItems="center" gap={1}>
                    <XIcon /> {t('referral_hero_section.share_on_x')}
                  </Box>
                </MenuItem>
              </Menu>
            </Box>
          </ReferralContainer>
        )}
        <HowItWorksButton
          data-testid={REFERRAL_HOW_IT_WORKS_BUTTON_TEST_ID}
          onClick={() => {
            setShowSteps(prev => !prev)
          }}
        >
          {t('referral_hero_section.how_it_works')}{' '}
          {showSteps ? (
            <KeyboardArrowUpRoundedIcon data-testid={REFERRAL_ARROW_UP_ICON_TEST_ID} />
          ) : (
            <KeyboardArrowDownRoundedIcon data-testid={REFERRAL_ARROW_DOWN_ICON_TEST_ID} />
          )}
        </HowItWorksButton>
        <StepsContainer data-testid={REFERRAL_STEPS_CONTAINER_TEST_ID} showSteps={showSteps}>
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
      </HeroWrapper>
    </SectionContainer>
  )
})

export { ReferralHeroSection }
