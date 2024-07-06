import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminPage(props) {
  const userSelector = useSelector((state) => state.user);

  if (userSelector.role !== "admin") {
    return <Navigate to="/" />;
  }

  return <div>{props.children}</div>;
}
