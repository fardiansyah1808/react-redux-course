import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedPage(props) {
  const userSelector = useSelector((state) => state.user);

  if (!userSelector.id) {
    return <Navigate to="/auth/login" />;
  }

  return <div>{props.children}</div>;
}
