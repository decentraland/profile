import { Footer as BaseFooter } from "decentraland-ui/dist/components/Footer/Footer";
import * as translations from "../../modules/translation/locales";

const locales = Object.keys(translations);

const Footer = (props: any) => (
  <BaseFooter locale={"en"} locales={locales} {...props} />
);

export default Footer;
