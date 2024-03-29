import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AccountSideNav = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <div className="useraccount">
      <div className="user-account-container">
        {auth?.user && (
          <aside className="useracc-left-nav">
            <Link className="account-link" to="/account">
              Account home
            </Link>
            <Link className="account-link" to="/account/updates">
              Update Account
            </Link>
            <Link className="account-link" to="/account/friends">
              Friends
            </Link>
          </aside>
        )}
        <main className="useracc-right-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AccountSideNav;
