import React, { useContext, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Button, Card, CardBody, CardColumns, CardHeader, Input, Label, Row } from 'reactstrap';
import { LoginContext } from '../context/LoginContext';
import { list, list_vendas, purchase_ticket } from '../request/user';

/* const columns = [];
 */
const columns = [
    {
        name: 'Nome completo',
        selector: 'full_name',
    },
    {
        name: 'Nome de Login',
        selector: 'user_name',
    },
    {
        name: 'Email',
        selector: 'email',
    },
    {
        name: 'CEP',
        selector: 'cep',
    },
];

const Welcome = () => {
    const [data, setData] = useState([]);
    const [data_vendas, setDataVendas] = useState([]);
    const [search, setSearch] = useState('');
    const [selector_search, setSelectorSearch] = useState('fullname');

    const { nome, logout } = useContext(LoginContext);
    
    useEffect(() => {
        list(null, setData);
        list_vendas(setDataVendas);
    }, []);

    const handleChange = (number, index) => {
        var is_data = data;
        is_data[index].quantity = number;

        setData([...is_data]);
    }

    const onPurchase = (response) => {
        if(response.success == true){
            alert(response.message);
            list(null, setData);
            list_vendas(setDataVendas);
        }
        else{
            alert(response.errors);
        }
    }

    return (
        <>
            <h5>Bem Vindo, {nome} - <a href="#" onClick={() => logout()}>Sair</a></h5>
            
            <Card>
                <CardHeader>
                    Minhas Compras
                </CardHeader>
                <CardBody>
                <CardColumns>
                    {data_vendas.map((e, i) => (
                        <Card>
                            <CardBody>
                                <center>
                                    <h5>{e.ticket.name_ticket}</h5>
                                    <h5>Quantidade: {e.quantity}</h5>
                                    <h5>Valor Pago: {parseFloat(e.amount).toFixed(2).replace('.', ',')}</h5>
                                </center>
                            </CardBody>
                        </Card>
                    ))}

                </CardColumns>
                </CardBody>
            </Card>
            <br/>
            <Card>
                <CardHeader>
                    Adquirir Ingressos
                </CardHeader>
                <CardBody>
                <CardColumns>
                    {data.map((e, i) => (
                        <Card>
                            <CardBody>
                                <center>
                                    <h5>{e.name_ticket}</h5>
                                    <h5>{parseFloat(e.amount).toFixed(2).replace('.', ',')}</h5>
                                    <Input
                                        max={e.max_per_user}
                                        type='number'
                                        defaultValue={1}
                                        min={1}
                                        value={e.quantity ? e.quantity : 1}
                                        onChange={e => handleChange(e.target.value, i)}
                                        style={{width: '200px'}}
                                    />
                                    <br/>
                                    <Button onClick={() => purchase_ticket(e, onPurchase)}>Comprar</Button>
                                </center>
                            </CardBody>
                        </Card>
                    ))}

                </CardColumns>
                </CardBody>
            </Card>
        </>
    );
}

export default Welcome;