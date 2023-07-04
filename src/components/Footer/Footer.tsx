import { FooterProps } from "decentraland-ui";
import { Footer as BaseFooter } from "decentraland-dapps/dist/containers";
import * as translations from "../../modules/translation/locales";

const locales = Object.keys(translations);

const Footer = (props: FooterProps) => (
  <BaseFooter locales={locales} {...props} />
);

export default Footer;
