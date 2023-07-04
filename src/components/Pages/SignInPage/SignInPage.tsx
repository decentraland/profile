import { useSearchParams, useNavigate } from "react-router-dom";
import { default as SignIn } from "decentraland-dapps/dist/containers/SignInPage";
import { PageLayout } from "../../PageLayout";
import { Props } from "./SignInPage.types";

const SignInPage = (props: Props) => {
  const { isConnected } = props;

  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");
  const navigate = useNavigate();

  if (redirectTo && isConnected) {
    navigate(decodeURIComponent(redirectTo));
  }

  return (
    <PageLayout>
      <SignIn />
    </PageLayout>
  );
};

export default SignInPage;
