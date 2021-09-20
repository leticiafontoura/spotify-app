import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Home from "./home";
import Profile from "./profile";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/profile" component={Profile} />
            </Switch>
        </BrowserRouter>
        
    )
}