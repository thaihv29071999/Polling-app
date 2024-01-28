import { Link } from "react-router-dom";
import { Outlet, useNavigate } from "react-router-dom";
import { withAuthRequired } from "../util/withAuthRequired";

const Header = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };
  return (
    <>
      <nav className="flex justify-center  border-b-2">
        <div className="flex items-center">
          <Link
            to="/"
            className={
              "font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 "
            }
          >
            Home
          </Link>
          <Link
            to="/new-poll"
            className={
              "font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900 "
            }
          >
            New Poll
          </Link>
        </div>
        <div className="flex-1"></div>
        <div>
          <div className="flex justify-center items-center">
            <h1>{currentUser?.fullName}</h1>
            <button
              onClick={handleLogout}
              className="font-medium px-3 py-2 text-slate-700 rounded-lg hover:bg-slate-100 hover:text-slate-900  "
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export const AuthenLogin = withAuthRequired(Header);
