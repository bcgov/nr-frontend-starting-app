import React from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Tile,
  Button,
  FlexGrid,
  Column,
  Row,
  Stack
} from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';

const Home = () => {
  const navigate = useNavigate();

  const goToTable = () => {
    navigate('/table');
  };

  const goToForm = () => {
    navigate('/form');
  };

  return (
    <FlexGrid container spacing={4}>
      <Stack gap={6}>
        <Row>
          <Column sm={4}>
            <Stack gap={3}>
              <h1 data-testid="home-title">NR Front End Testing App</h1>
              <p data-testid="home-desc">
                This is a sample application with the purpose of checking BC Gov&apos;s design
                system, themes and react components. The app will also be used to validate
                code style, infrastructe, tech stack, tests, deployment and others.
              </p>
            </Stack>
          </Column>
        </Row>
        <Row>
          <Column sm={4} md={4}>
            <Tile data-testid="card-form">
              <h3 data-testid="card-form__title">Sample User Form</h3>
              <br />
              <p data-testid="card-form__desc">
                This is a simple form to validate the user&apos;s inputs.
              </p>
              <br />
              <Button
                onClick={goToForm}
                size="md"
                renderIcon={ArrowRight}
                data-testid="card-form__button"
              >
                Go!
              </Button>
            </Tile>
          </Column>
          <Column sm={4} md={4}>
            <Tile data-testid="card-table">
              <h3 data-testid="card-table__title">Sample Search</h3>
              <br />
              <p data-testid="card-table__desc">
                This is a simple table showing results of a simulated search.
              </p>
              <br />
              <Button
                onClick={goToTable}
                size="md"
                renderIcon={ArrowRight}
                data-testid="card-table__button"
              >
                Go!
              </Button>
            </Tile>
          </Column>
        </Row>
      </Stack>
    </FlexGrid>
  );
};

export default Home;
