export const locations = {
  root: () => "/",
  signIn: (redirectTo?: string) => {
    return `/sign-in${
      redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ""
    }`;
  },
};
