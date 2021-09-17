import React from "react";
import { Route, Switch } from "react-router-dom";

import { ProviderList, ProviderDetail } from "../../../Components";

function ProviderPage(props) {
    return (
        <>
            <Switch>
                <Route
                    path={`${props.match.path}/:id`}
                    component={ProviderDetail}
                />
                <Route path={props.match.path} component={ProviderList} />
            </Switch>
        </>
    );
}

export default ProviderPage;
