/* eslint-disable import/no-named-as-default-member */
import React from 'react'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { REFERRAL_REWARD_REACHED_TEST_ID } from './constants'
import {
  AnimatedBackground,
  PreTitle,
  RewardContainer,
  RewardImage,
  RewardImageLabel,
  RewardReachedModal,
  RewardWrapper,
  Subtitle,
  RewardImageContainer,
  Title,
  GradientBorder
} from './ReferralRewardReached.styled'
import { getBackgroundImage } from './utils'
import { ReferralRewardReachedProps } from './ReferralRewardReached.types'

const ReferralRewardReached = React.memo((props: ReferralRewardReachedProps) => {
  const { reward, open, onClick } = props
  const { image, rarity, description, invitesAccepted } = reward
  const backgroundImg = getBackgroundImage(rarity)

  return (
    <RewardReachedModal open={open} onClose={onClick} onClick={onClick} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.modal}>
      <RewardContainer data-testid={REFERRAL_REWARD_REACHED_TEST_ID.container}>
        <AnimatedBackground backgroundImg={backgroundImg} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.animatedBackground} />
        <RewardWrapper data-testid={REFERRAL_REWARD_REACHED_TEST_ID.wrapper}>
          <PreTitle data-testid={REFERRAL_REWARD_REACHED_TEST_ID.preTitle}>{t('referral_reward_reached.reward')}</PreTitle>
          <Title data-testid={REFERRAL_REWARD_REACHED_TEST_ID.title}>{t('referral_reward_reached.new_item_unlocked')}</Title>
          <Subtitle data-testid={REFERRAL_REWARD_REACHED_TEST_ID.subtitle}>
            {t('referral_reward_reached.invites_accepted', { count: invitesAccepted })}
          </Subtitle>
        </RewardWrapper>
        <GradientBorder rarity={rarity} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.gradientBorder}>
          <RewardImageContainer rarity={rarity} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.imageContainer}>
            <RewardImage src={image} alt={`${rarity}-reward`} open={open} data-testid={REFERRAL_REWARD_REACHED_TEST_ID.image} />
          </RewardImageContainer>
        </GradientBorder>
        <RewardImageLabel data-testid={REFERRAL_REWARD_REACHED_TEST_ID.description}>{description}</RewardImageLabel>
      </RewardContainer>
    </RewardReachedModal>
  )
})

export { ReferralRewardReached }
