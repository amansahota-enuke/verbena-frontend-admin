import React, { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";

import CommonPage from "../Pages/common";
import {
    AppointmentPage,
    DashboardPage,
    PatientPage,
    PaymentPage,
    ProfilePage,
    ProviderPage,
    SubscriptionPage,
} from "../Pages";
import { Header, LeftMenu, Error } from "../Components";

const Layout = ({ match }) => {
    const [show, setShow] = useState(false);
    const handleToggle = () => {
        setShow(!show);
    };

    return (
        <>
            <Header handleToggle={handleToggle} />
            <div className={`main-panel relative ${show ? "expanded" : ""}`}>
                <LeftMenu show={show} />
                <Switch>
                    <Route
                        exact
                        path={`${match.path}`}
                        render={() => (
                            <Redirect to={`${match.path}/dashboard`} />
                        )}
                    />
                    <Route
                        path={`${match.path}/dashboard`}
                        component={DashboardPage}
                    />
                    <Route
                        path={`${match.path}/common`}
                        component={CommonPage}
                    />
                    <Route
                        path={`${match.path}/profile`}
                        component={ProfilePage}
                    />
                    <Route
                        path={`${match.path}/appointments`}
                        component={AppointmentPage}
                    />
                    <Route
                        path={`${match.path}/providers`}
                        component={ProviderPage}
                    />
                    <Route
                        path={`${match.path}/patients`}
                        component={PatientPage}
                    />
                    <Route
                        path={`${match.path}/payments`}
                        component={PaymentPage}
                    />
                    <Route
                        path={`${match.path}/subscriptions`}
                        component={SubscriptionPage}
                    />
                    <Route component={Error} />
                </Switch>
            </div>
        </>
    );
};

export default Layout;
