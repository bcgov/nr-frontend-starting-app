import React from 'react';
import { Loader } from 'shared-components';
import LoaderBox from '../LoaderBox';

function CardLoader() {
  return (
    <LoaderBox>
      Please, wait!

      <Loader />
    </LoaderBox>
  );
}

export default CardLoader;
