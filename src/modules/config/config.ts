import { Env, createConfig } from "@dcl/ui-env";
import dev from "./env/dev.json";
import stg from "./env/stg.json";
import prod from "./env/prod.json";

export const config = createConfig(
  {
    [Env.DEVELOPMENT as string]: dev,
    [Env.STAGING as string]: stg,
    [Env.PRODUCTION as string]: prod,
  },
  {
    systemEnvVariables: {
      REACT_APP_DCL_DEFAULT_ENV: import.meta.env.VITE_REACT_APP_DCL_DEFAULT_ENV,
    },
  }
);
