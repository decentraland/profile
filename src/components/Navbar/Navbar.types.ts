// import { NavbarProps } from "decentraland-ui";

export type Props = Partial<any> & {
  isConnected: boolean;
  hasPendingTransactions: boolean;
  enablePartialSupportAlert?: boolean;
};

export type OwnProps = Pick<Props, "enablePartialSupportAlert">;
