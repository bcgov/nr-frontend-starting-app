/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderImage from '../../components/HeaderImage';

it('renders correctly', () => {
  const tree = renderer
    .create(<HeaderImage />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
