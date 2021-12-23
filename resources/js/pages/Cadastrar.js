import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Form, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import { store_user } from '../request/user';

const Cadastrar = () => {
    const [form_values, setForm] = useState({
        full_name: '',
        full_name_invalid: false,
        email: '',
        email_invalid: false,
        password: '',
        password_invalid: false,
        request_message: ''
    });

    const history = useHistory();

    const valid_email = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const valid_fields = () => {
        var count_invalid = 0;

        if(form_values.full_name.length > 3){
            setForm(prevState => ({...prevState, full_name_invalid: false }))
        }
        else{
            setForm(prevState => ({...prevState, full_name_invalid: true }));
            count_invalid++;
        }

        if(valid_email(form_values.email)){
            setForm(prevState => ({...prevState, email_invalid: false }));
        }
        else{
            setForm(prevState => ({...prevState, email_invalid: true }));
            count_invalid++;
        }

        let numbers_password = (form_values.password.match(/\d/g) || []).length;
        let letters_password = form_values.password.replace(/\s+/g, '').length;
        
        if(form_values.password.length > 8 && numbers_password > 1 && letters_password > 1){
            setForm(prevState => ({...prevState, password_invalid: false }));
        }
        else{
            setForm(prevState => ({...prevState, password_invalid: true }));
            count_invalid++;
        }

        if(count_invalid > 0){
            return false;
        }

        return true;
    }
    
    const store = () => {
        if(valid_fields() === true){
            store_user(form_values, callback_store);
        }
    }
    const callback_store = (data) => {
        if(data.success === true){
            alert(data.message);
            history.push("/login");
        }
        else{
            setForm(prevState => ({...prevState, request_message: data.errors }))
        }
    }
    return (
        <Form>
            <h5>Cadastro</h5>
            <hr/>
            <FormGroup>
                <Input
                    placeholder="Nome Completo"
                    value={form_values.full_name}
                    invalid={form_values.full_name_invalid}
                    onChange={e => setForm(prevState => ({...prevState, full_name: e.target.value }))}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    placeholder="Email"
                    value={form_values.email}
                    invalid={form_values.email_invalid}
                    onChange={e => setForm(prevState => ({...prevState, email: e.target.value }))}
                />
            </FormGroup>
            <FormGroup>
                <Input
                    type="password"
                    placeholder="Senha"
                    value={form_values.password}
                    invalid={form_values.password_invalid}
                    onChange={e => setForm(prevState => ({...prevState, password: e.target.value }))}
                />
            </FormGroup>
            {form_values.request_message.length > 0 ?
                <FormGroup>
                    <h6 style={{color: 'red'}}>{form_values.request_message}</h6>
                </FormGroup>
            : ''}
            <FormGroup>
                <Button onClick={() => store()}>Cadastrar</Button>
                <Link to="/">
                    <Button color="danger">Voltar</Button>
                </Link>
            </FormGroup>
        </Form>
    );
}

export default Cadastrar;