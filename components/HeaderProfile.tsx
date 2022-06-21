import React from "react";
import { AUTH, useStore } from "../store/store";

type Props = {};

export default function HeaderProfile({}: Props) {
  const { user, logout } = useStore((state) => ({
    user: state.user,
    logout: state.logout,
  }));
  return (
    <>
      {user.authed === AUTH.AUTHED ? (
        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="avatar placeholder">
                <div className="bg-neutral-focus text-neutral-content rounded-full w-8">
                  <span>{user.id?.slice(1, 3)}</span>
                </div>
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <button className="inline text-left" onClick={logout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
          <a className="btn">Get started</a>
        </div>
      )}
    </>
  );
}
