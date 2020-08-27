import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import Auth from "../components/Auth";

const NotFound = () => <h1>Page Not Found</h1>;

export default function Outlet() {
    return (
        <div className="container box">
            <Switch>
                <Redirect exact from="/" to="/authorize" />
                    <Route path="/authorize" component={Auth} />
                <Route component={NotFound} />
            </Switch>
        </div>
    );
}
