import React, {useContext} from "react";
import UserContext from "../UserContext";

export default function NavBar() {
    const user = useContext(UserContext);

    function signIn() {
        setShowLogin(true);
    }

    return (
        <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand site-banner">
                <h1 className="site-title">Bookings</h1>
            </div>
            <div className="navbar-menu is-active">
                <div className="navbar-end">
                    {user ?
                        (<div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link">
                                {user.fullName || user.email}
                            </a>
                            <div className="navbar-dropdown is-right">
                                <a className="navbar-item" onClick={signOut}>
                                    Sign Out
                                </a>
                            </div>
                        </div>)
                        : (<a className="navbar-item" onClick={signIn}>
                            Sign In
                        </a>)
                    }
                </div>
            </div>
        </nav>
    );
}
