import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter as Router,
    Route 
} from 'react-router-dom'
import { LoginContext } from '../context/LoginContext';
import Authenticate from '../layout/Authenticate';
import Page from '../layout/Page';
import Cadastrar from '../pages/Cadastrar';
import Login from '../pages/Login';
import Welcome from '../pages/Welcome';
import { get_token, info, remove_token, set_token } from '../request/user';

const AppReact = () => {
    const [login_details, setLoginDetails] = useState({});
    const [is_token, setIsToken] = useState(get_token());

    const set_logged = (user, token) => {
        set_token(token);
        setIsToken(token);
        setLoginDetails(user);
    }

    const set_info = (user) => {
        setLoginDetails(user);
    }

    const logout = () => {
        remove_token();
        setIsToken(null);
        setLoginDetails({});
    }

    useEffect(() => {
        if(is_token !== null){
            info(set_info, logout);
        }
    }, []);
    

    return (
        <Router>
            <LoginContext.Provider value={{ nome: login_details.full_name, is_token, set_logged, logout }}>
                {is_token === null ?
                    <Authenticate>
                        <Route
                            exact
                            path="/"
                            component={Login}
                        />
                        <Route
                            exact
                            path="/login"
                            component={Login}
                        />
                        <Route
                            exact
                            path="/store"
                            component={Cadastrar}
                        />
                    </Authenticate>
                    :
                    <Page>
                        <Route
                            exact
                            path="/"
                            component={Welcome}
                        />
                    </Page>
                }
            </LoginContext.Provider>
        </Router>
    );
}

export default AppReact;

if (document.getElementById('app_react')) {
    ReactDOM.render(<AppReact />, document.getElementById('app_react'));
}
