import { Footer as BaseFooter, FooterProps } from 'decentraland-ui/dist/components/Footer/Footer'
import { Locale } from 'decentraland-ui/dist/components/Language/Language'
import * as translations from '../../modules/translation/locales'

const locales = Object.keys(translations)

const Footer = (props: FooterProps) => <BaseFooter locale={'en'} locales={locales as Locale[]} {...props} />

export default Footer
