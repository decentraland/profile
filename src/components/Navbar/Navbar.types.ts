import { NavbarProps } from "decentraland-ui";

export type Props = Partial<NavbarProps> & {
  isConnected: boolean;
};

export type MapStateProps = Pick<Props, "isConnected">;
