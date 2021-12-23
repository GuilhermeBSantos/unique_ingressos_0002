import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardHeader } from 'reactstrap'

const StylishDiv = styled.div`
    width: 100vw;
    height: 100vh;
    background: #6C7A89;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .card{
        width: 50%;
    }

    @media only screen and (max-width: 600px) {
        .card{
            width: 95%;
        }
    }
`;

const Authenticate = ({ children }) => {
    return (
    <React.Fragment>
        <StylishDiv>
            <Card>
                <CardHeader>
                    Unique Ingressos
                </CardHeader>
                <CardBody>
                    {children}
                </CardBody>
            </Card>
        </StylishDiv>
    </React.Fragment>
    );
};

export default Authenticate;