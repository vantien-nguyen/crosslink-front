import { useCookies } from "react-cookie";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { accessToken } from "../../api/axios";
import { signOut } from "../../api/UserAPIs";
import Logo from "../../assets/icons/logo.png";
import SignOutIcon from "../../assets/icons/signout.svg";
import {
  NAVIGATION_ITEM_SETTING,
  NAVIGATIONS,
  SETTINGS,
} from "../../constant/Constant";
import useAuth from "../../hooks/useAuth";
import {
  changeNavigation,
  changeView,
  setOpenSidebarMd,
} from "../../reducers/SidebarSlice";
import { RootState } from "../../store";
import { getNavigation, getView } from "../../utils";

import SideBarItem from "./SideBarItem";

export default function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuthenticated } = useAuth();
  const [cookies, _, removeCookie] = useCookies([
    "shopId",
    "shopName",
    "shopUrl",
    "logoUrl",
    "refresh",
  ]);
  const currentHref = window.location.href.slice(
    process.env.REACT_APP_API_URL?.length,
  );
  const view = useSelector((state: RootState) => state.sidebar.view);
  const navigation = useSelector(
    (state: RootState) => state.sidebar.navigation,
  );
  const openSidebarMd = useSelector(
    (state: RootState) => state.sidebar.openSidebarMd,
  );

  if (view === undefined) {
    dispatch(changeView(getView(currentHref)));
  }

  if (navigation === -1) {
    dispatch(changeNavigation(getNavigation(currentHref)));
  }

  function handleUpdateView(href: string) {
    dispatch(changeView(getView(href)));
    dispatch(changeNavigation(getNavigation(href)));
    if (openSidebarMd) {
      dispatch(setOpenSidebarMd(false));
    }
  }

  const signoutMutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      accessToken.value = "";
      setAuthenticated(false);
      removeCookie("shopId");
      removeCookie("shopName");
      removeCookie("shopUrl");
      removeCookie("logoUrl");
      removeCookie("refresh");
      navigate("/signin", { replace: true });
    },
    onError: (error) => {
      console.log(error.message);
    },
  });

  function handleSignOut() {
    signoutMutation.mutate();
  }

  return (
    <>
      <nav
        className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700
          dark:bg-gray-800"
      >
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100
                  focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400
                  dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
                onClick={() => dispatch(setOpenSidebarMd(!openSidebarMd))}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="h-6 w-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>
              <div className="ms-2 flex md:me-24 hidden sm:inline-flex">
                <img src={Logo} className="me-3 h-8" alt="Crosslink Logo" />
                <span
                  className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl
                    hidden md:block"
                >
                  CrossLink
                </span>
              </div>
            </div>
            <div>
              <h1 className="truncate">{cookies.shopUrl}</h1>
            </div>
            <div className="flex items-center">
              <div className="ms-3 flex items-center">
                <div>
                  <button
                    type="button"
                    className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300
                      dark:focus:ring-gray-600"
                    aria-expanded="true"
                    data-dropdown-toggle="dropdown-user"
                    disabled={true}
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={cookies.logoUrl}
                      alt="user photo"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div
        id="logo-sidebar"
        className={`${openSidebarMd && "translate-x-0"} fixed left-0 top-0 z-40 h-screen w-64
        -translate-x-full border-r border-gray-200 pt-20 transition-transform
        dark:border-gray-700 dark:bg-gray-800 md:translate-x-0 bg-white`}
        aria-label="Sidebar"
      >
        <div className="h-full overflow-y-auto px-3 pb-4 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {NAVIGATIONS.slice(0, -1).map(
              (nav: {
                id: number;
                name: string;
                href: string;
                icon: string;
              }) => {
                return (
                  <SideBarItem
                    navigation={navigation}
                    key={nav.id}
                    id={nav.id}
                    name={nav.name}
                    href={nav.href}
                    icon={nav.icon}
                    handleUpdateView={handleUpdateView}
                  />
                );
              },
            )}
          </ul>
          <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 font-medium dark:border-gray-700">
            {
              <SideBarItem
                navigation={navigation}
                key={SETTINGS}
                id={SETTINGS}
                name={NAVIGATION_ITEM_SETTING.name}
                href={NAVIGATION_ITEM_SETTING.href}
                icon={NAVIGATION_ITEM_SETTING.icon}
                handleUpdateView={handleUpdateView}
              />
            }
            <li>
              <a
                href=""
                className="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100
                  dark:text-white dark:hover:bg-gray-700"
                onClick={handleSignOut}
              >
                <img
                  className="mr-3 w-5 flex-shrink-0"
                  aria-hidden="true"
                  src={SignOutIcon}
                ></img>
                <span className="ms-3 flex-1 whitespace-nowrap">Sign Out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      {openSidebarMd && (
        <div
          className="fixed w-full top-0 right-0 bottom-0 left-0 bg-gray-900 opacity-50 z-30
            md:opacity-0"
          onClick={() => dispatch(setOpenSidebarMd(false))}
        ></div>
      )}

      <div className={"my-16 mx-0 p-4 md:ml-64"}>{view}</div>
    </>
  );
}
