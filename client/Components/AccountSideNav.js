import React from "react"
import { Link, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AccountSideNav = () => {
	const auth = useSelector((state) => state.auth);

	return (
		<div className="useraccount">
      <h1 className="user-account-h1">My Account</h1>
      <div className="user-account-container">
        {auth.user ? (
          <aside className="useracc-left-nav">
						 <Link className="account-link" to="/account">
              Account home
            </Link>
            <Link className="account-link" to="/updateAccount">
              Update Account info
            </Link>
            <Link className="genrepref-link" to="/followers">
              Followers
            </Link>
						<Link className="genrepref-link" to="/following">
              Following
            </Link>
          </aside>
        ) : (
          <p>please log in...</p>
        )}
        <main className="useracc-right-main">
          <Outlet />
        </main>
      </div>
    </div>
	)
}

export default AccountSideNav
