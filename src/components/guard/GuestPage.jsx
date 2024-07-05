import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function GuestPage(props) {
  const userSelector = useSelector((state) => state.user);

  if (userSelector.id) {
    return <Navigate to="/" />;
  }

  return <div>{props.children}</div>;
}
