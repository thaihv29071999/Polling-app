import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function withAuthRequired(Component) {
  return function () {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    console.log('Component: ', Component)

    useEffect(() => {
      if (!token) {
        navigate("/login");
      }
    });
    return <Component/>;
  };
}
