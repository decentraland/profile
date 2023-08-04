export const URI_REGEX = new RegExp('^((https?:)?\\/\\/)?([\\da-z.-]+)\\.([a-z.]{2,6})([\\/\\w .%()\\-]*)*\\/?$') // RFC-3986: Uniform Resource Identifier (URI): Generic Syntax // Parsing a URI Reference with a Regular Expression
export const DOMAIN_INDEX = 3

export const KNOWN_DOMAINS = [
  'discord',
  'facebook',
  'github',
  'instagram',
  'linkedin',
  'pinterest',
  'reddit',
  'telegram',
  'twitter',
  'whatsapp',
  'youtube'
]
