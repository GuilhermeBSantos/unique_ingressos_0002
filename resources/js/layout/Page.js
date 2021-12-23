import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, CardHeader } from 'reactstrap'

const StylishDiv = styled.div`
    width: 100vw;
    height: 100vh;
    padding: 15px;
    text-align: center;
`;

const Page = ({ children }) => {
    return (
    <React.Fragment>
        <StylishDiv>
            {children}
        </StylishDiv>
    </React.Fragment>
    );
};

export default Page;