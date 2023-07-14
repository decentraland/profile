import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { t } from 'decentraland-dapps/dist/modules/translation/utils'
import { Button } from 'decentraland-ui/dist/components/Button/Button'
import { Profile } from 'decentraland-ui/dist/components/Profile/Profile'
import Copy from '../../assets/icons/Copy.svg'
import People from '../../assets/icons/People.svg'
import Share from '../../assets/icons/Share.svg'
import Wallet from '../../assets/icons/Wallet.svg'
import WorldsButton from '../WorldsButton'
import styles from './ProfileInformation.module.css'

const ProfileInformation = () => {
  return (
    <div className={styles.ProfileInformation}>
      <div className={styles.basicRow}>
        <Profile size="massive" imageOnly address="0xd4fEC88A49EB514e9347eC655D0481D8483a9AE0" />
        <div className={styles.profileData}>
          <span className={styles.userNumber}>
            <span className={styles.userName}>Florencia</span>&nbsp; #222
          </span>
          <div className={styles.wallet}>
            <img src={Wallet} className="iconSize" />
            <Profile textOnly address="0xd4fEC88A49EB514e9347eC655D0481D8483a9AE0" />
            <img src={Copy} className="iconSize" />
          </div>
          <div className={styles.basicCenteredRow}>
            <img src={People} className="iconSize" />
            &nbsp; 714 {t('profile_information.friends')}
          </div>
          <span className={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </span>
        </div>
      </div>
      <div className={styles.actions}>
        <WorldsButton address="0xeDaE96F7739aF8A7fB16E2a888C1E578E1328299" />
        <Button primary className={styles.smallButton}>
          <img src={Share} className="iconSize" />
        </Button>
        <Button inverted className={styles.smallButton}>
          <Icon name="ellipsis horizontal"></Icon>
        </Button>
      </div>
    </div>
  )
}

export default ProfileInformation
