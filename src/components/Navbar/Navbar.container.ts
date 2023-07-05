import { connect } from "react-redux";
import { isConnected } from "decentraland-dapps/dist/modules/wallet/selectors";

import { RootState } from "../../modules/reducer";
import { MapStateProps } from "./Navbar.types";
import Navbar from "./Navbar";

const mapState = (state: RootState): MapStateProps => ({
  isConnected: isConnected(state),
});

export default connect(mapState)(Navbar);
