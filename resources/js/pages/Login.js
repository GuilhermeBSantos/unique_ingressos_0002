import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input } from 'reactstrap'
import { LoginContext } from '../context/LoginContext';
import { login } from '../request/user';

const Login = () => {
    const [email, setEmail] = useState('');
    const [invalid_email, setInvalidEmail] = useState(false);
    const [password, setPassword] = useState('');
    const [invalid_password, setInvalidPassword] = useState(false);
    const [request_message, setRequestMessage] = useState('');

    const { set_logged } = useContext(LoginContext);
    
    const valid_email = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const valid_fields = () => {
        var count_invalid = 0;

        if(valid_email(email)){
            setInvalidEmail(false);
        }
        else{
            setInvalidEmail(true);
            count_invalid++;
        }

        let numbers_password = (password.match(/\d/g) || []).length;
        let letters_password = password.replace(/\s+/g, '').length;
        
        if(password.length > 8 && numbers_password > 1 && letters_password > 1){
            setInvalidPassword(false);
        }
        else{
            setInvalidPassword(true);
            count_invalid++;
        }

        if(count_invalid > 0){
            return false;
        }

        return true;

    }

    const logged = () => {
        if(valid_fields() === true){
            var form_values = {
                email: email,
                password: password
            }

            login(form_values, callback_login);
        }
    }

    const callback_login = (data) => {
        if(data.success === true){
            /* alert(data.message);
            history.push("/login"); */
            setRequestMessage('');
            set_logged(data.user, data.access_token)
        }
        else{
            setRequestMessage(data.errors);
            //setForm(prevState => ({...prevState, request_message: data.errors }))
        }
    }
    return (
        <Form>
            <h5>Login</h5>
            <hr/>
            <FormGroup>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    invalid={invalid_email}
                    onChange={e => setEmail(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    invalid={invalid_password}
                    onChange={e => setPassword(e.target.value)}
                />
            </FormGroup>
            {request_message.length > 0 ?
                <FormGroup>
                    <h6 style={{color: 'red'}}>{request_message}</h6>
                </FormGroup>
            : ''}
            <FormGroup>
                <Button onClick={() => logged()}>
                    Entrar
                </Button>
                <Link to="/store">
                    <Button color="info">Cadastrar</Button>
                </Link>
            </FormGroup>
        </Form>
    );
}

export default Login;