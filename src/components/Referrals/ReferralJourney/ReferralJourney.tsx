import React, { useEffect, useState, useRef, useMemo } from 'react'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Tooltip, Typography } from 'decentraland-ui2'
import { ReferralRewardCard } from '../ReferralRewardCard'
import { ReferralRewardReached } from '../ReferralRewardReached'
import { TIERS, REFERRAL_JOURNEY_TEST_ID } from './constants'
import {
  SectionContainer,
  JourneyStep,
  JourneyStepper,
  JourneyStepIcon,
  JourneyStepLine,
  GradientBorder,
  TitleContainer,
  SubtitleContainer,
  Subtitle,
  JourneyContainer,
  JourneyWrapper
} from './ReferralJourney.styled'
import { ANIMATION_DURATION } from './utils'
import { AnimationPhase as AnimationPhase, ReferralJourneyProps } from './ReferralJourney.types'

// eslint-disable-next-line import/no-named-as-default-member
const ReferralJourney = React.memo((props: ReferralJourneyProps) => {
  const { invitedUsersAccepted, onSetReferralEmail } = props
  const [animatedStep, setAnimatedStep] = useState(TIERS.filter(tier => tier.invitesAccepted <= invitedUsersAccepted).length)
  const [open, setOpen] = useState(false)
  const [journeyTiers, setJourneyTiers] = useState(
    TIERS.map(tier => ({ ...tier, completed: tier.invitesAccepted <= invitedUsersAccepted }))
  )
  const [animationPhase, setAnimationPhase] = useState<AnimationPhase>(AnimationPhase.WAITING_NEXT_TIER)
  const totalSteps = TIERS.length
  const journeyStepRefs = useRef<(Element | null)[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const tooltipTitle = useMemo(() => {
    const nextTier = TIERS.find(tier => invitedUsersAccepted < tier.invitesAccepted) ?? null

    if (!nextTier) {
      return <Typography>{t('referral_journey.tooltip_title', { count: invitedUsersAccepted })}</Typography>
    }

    const friendsNeeded = nextTier.invitesAccepted - invitedUsersAccepted
    return (
      <Typography>
        {t('referral_journey.tooltip_title', { count: invitedUsersAccepted })}
        <br />
        {t('referral_journey.tooltip_subtitle', { count: friendsNeeded })}
      </Typography>
    )
  }, [invitedUsersAccepted])

  useEffect(() => {
    const currentTierIndex = TIERS.findIndex(tier => invitedUsersAccepted < tier.invitesAccepted)
    const maxTierIndex = currentTierIndex === -1 ? totalSteps : currentTierIndex

    if (animatedStep >= maxTierIndex) return

    const isTierReached = animationPhase === AnimationPhase.TIER_REACHED && !open
    const isWaitingNextTier = animationPhase === AnimationPhase.WAITING_NEXT_TIER && !open

    if (!isTierReached && !isWaitingNextTier) return

    if (animatedStep !== maxTierIndex && !isTierReached) {
      if (sectionRef.current) {
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      setAnimationPhase(AnimationPhase.TIER_REACHED)
      setAnimatedStep(prev => prev + 1)
    }
  }, [animatedStep, totalSteps, animationPhase, open, invitedUsersAccepted])

  useEffect(() => {
    if (animationPhase !== AnimationPhase.TIER_REACHED) return

    const timeout = setTimeout(() => {
      setOpen(true)
    }, ANIMATION_DURATION)

    return () => {
      if (timeout) {
        clearTimeout(timeout)
      }
    }
  }, [animationPhase])

  useEffect(() => {
    if (animatedStep > 1 && journeyStepRefs.current[animatedStep - 1]) {
      journeyStepRefs.current[animatedStep - 1]?.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      })
    }

    setJourneyTiers(
      TIERS.map((tier, i) => ({
        ...tier,
        completed: i < animatedStep
      }))
    )
  }, [animatedStep])

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setAnimationPhase(AnimationPhase.WAITING_NEXT_TIER)
    }, 10)
  }

  return (
    <SectionContainer ref={sectionRef} data-testid={REFERRAL_JOURNEY_TEST_ID.sectionContainer}>
      <TitleContainer data-testid={REFERRAL_JOURNEY_TEST_ID.titleContainer}>
        <Typography variant="h4" data-testid={REFERRAL_JOURNEY_TEST_ID.title}>
          {t('referral_journey.title')}
        </Typography>
      </TitleContainer>
      <SubtitleContainer data-testid={REFERRAL_JOURNEY_TEST_ID.subtitleContainer}>
        <Subtitle variant="h6" data-testid={REFERRAL_JOURNEY_TEST_ID.subtitle}>
          🤍 {t('referral_journey.invites_accepted', { count: invitedUsersAccepted })}
        </Subtitle>
      </SubtitleContainer>
      <JourneyContainer data-testid={REFERRAL_JOURNEY_TEST_ID.journeyContainer}>
        <JourneyWrapper data-testid={REFERRAL_JOURNEY_TEST_ID.journeyWrapper}>
          <JourneyStepper data-testid={REFERRAL_JOURNEY_TEST_ID.journeyStepper}>
            <Tooltip title={tooltipTitle} followCursor arrow>
              <JourneyStepLine
                activeStep={animatedStep}
                totalSteps={totalSteps}
                phase={animationPhase}
                invitedUsersAccepted={invitedUsersAccepted}
                data-testid={REFERRAL_JOURNEY_TEST_ID.journeyStepLine}
              />
            </Tooltip>
            {journeyTiers.map((tier, i) => (
              <JourneyStep
                key={i}
                ref={(el: Element | null) => (journeyStepRefs.current[i] = el)}
                data-testid={`${REFERRAL_JOURNEY_TEST_ID.journeyStep}-${i}`}
              >
                <GradientBorder
                  completed={tier.completed}
                  showAnimation={animationPhase === AnimationPhase.TIER_REACHED && animatedStep === i + 1}
                  data-testid={`${REFERRAL_JOURNEY_TEST_ID.gradientBorder}-${i}`}
                >
                  <JourneyStepIcon data-testid={`${REFERRAL_JOURNEY_TEST_ID.journeyStepIcon}-${i}`}>
                    {tier.completed && <CheckRoundedIcon fontSize="medium" data-testid={REFERRAL_JOURNEY_TEST_ID.checkRoundedIcon} />}
                  </JourneyStepIcon>
                </GradientBorder>
                <ReferralRewardCard
                  {...tier}
                  onSetReferralEmail={onSetReferralEmail}
                  data-testid={`${REFERRAL_JOURNEY_TEST_ID.referralRewardCard}-${i}`}
                />
              </JourneyStep>
            ))}
          </JourneyStepper>
        </JourneyWrapper>
      </JourneyContainer>
      <ReferralRewardReached
        reward={journeyTiers[Math.max(animatedStep - 1, 0)]}
        open={open}
        onClick={handleClose}
        onSetReferralEmail={onSetReferralEmail}
        data-testid={REFERRAL_JOURNEY_TEST_ID.rewardModal}
      />
    </SectionContainer>
  )
})

export { ReferralJourney }
