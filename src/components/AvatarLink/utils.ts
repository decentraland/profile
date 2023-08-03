import { StrictIconProps } from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'
import { DOMAIN_INDEX, KNOWN_DOMAINS, URI_REGEX } from './constants'

type SemanticICONS = StrictIconProps['name']

// Get the icon based on the url (maybe using a regex)
export const getLinkIcon = (url: string): SemanticICONS => {
  const match = url.match(URI_REGEX)
  if (match) {
    const domain = match[DOMAIN_INDEX].replace('www.', '').toLowerCase()
    return KNOWN_DOMAINS.includes(domain) ? (domain as SemanticICONS) : 'linkify'
  }

  return 'linkify'
}
