import React from "react";
import { Route, Switch } from "react-router-dom";

import { PaymentList, PaymentDetail } from "../../../Components";

function PaymentPage(props) {
    return (
        <>
            <Switch>
                <Route
                    path={`${props.match.path}/:id`}
                    component={PaymentDetail}
                />
                <Route path={props.match.path} component={PaymentList} />
            </Switch>
        </>
    );
}

export default PaymentPage;
