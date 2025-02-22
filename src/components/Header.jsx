import { ThemeBtn, Container, Logo } from "./index";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { logout } from "../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    authService.logOut().then(() => {
      dispatch(logout());
    });
  };
  // const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];
  return (
    <header className=" shadow bg-gray-200 dark:bg-gray-900 dark:text-white">
      <Container>
        <nav className="flex items-center justify-between flex-wrap bg-teal-400 dark:bg-teal-800 p-1">
          <div className="flex items-center flex-shrink-0 text-white dark:text-gray-200 mr-6">
            <Link to="/">
              <Logo height="80px" width="80px" />
            </Link>
            <span className="font-semibold text-xl tracking-tight ml-2">
              WriteNow
            </span>
          </div>

          {/* Mobile menu button */}
          <div className="block lg:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center px-3 py-2 border rounded text-white dark:text-gray-200 border-white dark:border-gray-200 hover:text-teal-400 hover:border-teal-400"
            >
              <svg
                className="fill-current h-3 w-3"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
              </svg>
            </button>
          </div>

          {/* Navigation Items */}
          <div
            className={`w-full lg:flex lg:items-center lg:w-auto transition-all duration-300 ${
              menuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col lg:flex-row lg:ml-auto">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li
                      key={item.name}
                      onClick={() => navigate(item.slug)}
                      className="mt-4 lg:mt-0 lg:ml-6"
                    >
                      <button className="text-white dark:text-gray-200 hover:text-teal-100 dark:hover:text-teal-300">
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li
                  key="logout"
                  onClick={logoutHandler}
                  className="mt-4 lg:mt-0 lg:ml-6"
                >
                  <button className="text-white dark:text-gray-200 hover:text-teal-100 dark:hover:text-teal-300">
                    Logout
                  </button>
                </li>
              )}
              <li key="themeBtm" className="mt-4 lg:mt-0 lg:ml-6">
                <button className="text-white dark:text-gray-200 hover:text-teal-100 dark:hover:text-teal-300">
                  <ThemeBtn />
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
