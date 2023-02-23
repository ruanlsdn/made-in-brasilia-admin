import { useAuthControlContext } from "../../../contexts/AuthControlContext";
import { Login } from "../../../pages";

type ProtectedLayoutProps = {
  children: JSX.Element;
};

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  const { currentUser } = useAuthControlContext();

  if (!currentUser) {
    return <Login />;
  }

  return children;
};

export default ProtectedLayout;
