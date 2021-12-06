import React from "react";
import { Route, Switch } from "react-router-dom";

import {SubscriptionList } from "../../../Components";

function SubscriptionPage(props) {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={SubscriptionList} />
            </Switch>
        </>
    );
}

export default SubscriptionPage;
