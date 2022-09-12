/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../../components/Card';

it('renders correctly', () => {
  const tree = renderer
    .create(<Card title="Test card" text="This is just a test text." />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
