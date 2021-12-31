import React from "react";
import { Route, Switch } from "react-router-dom";

import {NewsletterSubscription } from "../../../Components";

function NewsletterSubscriptionPage(props) {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={NewsletterSubscription} />
            </Switch>
        </>
    );
}

export default NewsletterSubscriptionPage;
