import classNames from "classnames";
import Navbar from "../Navbar";
import { Footer } from "../Footer";
// import { Navigation } from '../Navigation'
import { Props } from "./PageLayout.types";
import styles from "./PageLayout.module.css";

const PageLayout = ({ children, className }: Props) => {
  return (
    <div className={classNames(styles.page, className)}>
      <Navbar
        isConnected={false}
        hasPendingTransactions={false}
        className={styles.navbar}
        isFullscreen
      />
      {/* <Navigation activeTab={activeTab} /> */}
      <div className={styles.content}>{children}</div>
      <Footer className={styles.footer} />
    </div>
  );
};

export default PageLayout;
