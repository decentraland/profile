import React from 'react'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Tooltip } from 'decentraland-ui2'
import type { ReferralTier } from '../../../modules/referrals/types'
import {
  REFERRAL_REWARD_CARD_TEST_ID,
  REFERRAL_REWARD_TIER_TEST_ID,
  REFERRAL_REWARD_IMAGE_TEST_ID,
  REFERRAL_REWARD_RARITY_TEST_ID,
  REFERRAL_REWARD_SWAG_CONTAINER_TEST_ID,
  REFERRAL_REWARD_DESCRIPTION_TEST_ID,
  REFERRAL_REWARD_CLAIM_BUTTON_TEST_ID
} from './constants'
import {
  GradientBorder,
  CardContainer,
  ClaimButton,
  Description,
  RewardRarity,
  RewardImage,
  RewardLabel,
  RewardImageContainer,
  SwagRarityContainer
} from './ReferralRewardCard.styled'

// eslint-disable-next-line import/no-named-as-default-member
const ReferralRewardCard = React.memo((props: ReferralTier) => {
  const { invitesAccepted, rarity, completed, image, claim } = props

  return (
    <GradientBorder completed={completed} data-testid={REFERRAL_REWARD_CARD_TEST_ID}>
      <CardContainer completed={completed}>
        <RewardLabel variant="subtitle1" data-testid={REFERRAL_REWARD_TIER_TEST_ID}>
          {t('referral_reward_card.tier', { count: invitesAccepted })}
        </RewardLabel>
        <RewardImageContainer>
          <RewardImage src={image} alt={t('referral_reward_card.image_alt')} data-testid={REFERRAL_REWARD_IMAGE_TEST_ID} />
        </RewardImageContainer>
        {rarity && (
          <RewardRarity rarity={rarity} data-testid={REFERRAL_REWARD_RARITY_TEST_ID}>
            {rarity === 'SWAG' ? (
              <SwagRarityContainer data-testid={REFERRAL_REWARD_SWAG_CONTAINER_TEST_ID}>
                {t('referral_reward_card.swag')}
                <Tooltip disableFocusListener title="Some information" placement="right">
                  <InfoOutlinedIcon fontSize="small" />
                </Tooltip>
              </SwagRarityContainer>
            ) : (
              rarity.toUpperCase()
            )}
          </RewardRarity>
        )}
        {!claim && (
          <Description data-testid={REFERRAL_REWARD_DESCRIPTION_TEST_ID}>
            {completed ? t('referral_reward_card.unlocked') : t('referral_reward_card.unlock')}
          </Description>
        )}
        {completed && claim && (
          <ClaimButton variant="contained" data-testid={REFERRAL_REWARD_CLAIM_BUTTON_TEST_ID}>
            {t('referral_reward_card.claim')}
          </ClaimButton>
        )}
      </CardContainer>
    </GradientBorder>
  )
})

export { ReferralRewardCard }
