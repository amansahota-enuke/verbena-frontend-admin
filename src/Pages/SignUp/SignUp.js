import React from "react";
import { Route, Switch } from "react-router-dom";

import { SignUp, Error } from "../../Components";

const SignUpPage = (props) => {
    return (
        <>
            <Switch>
                <Route path={props.match.path} component={Error} />
            </Switch>
        </>
    );
};

export default SignUpPage;
