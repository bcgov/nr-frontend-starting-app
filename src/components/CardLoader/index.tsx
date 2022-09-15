import React from 'react';
import styled from 'styled-components';
import { Loader } from 'shared-components';

const LoaderDiv = styled.div`
  background: #003366;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid transparent;
  border-radius: 0.25rem;
  text-align: center;
  color: #FFF;
`;

function CardLoader() {
  return (
    <LoaderDiv>
      Please, wait!

      <Loader />
    </LoaderDiv>
  );
}

export default CardLoader;
