/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBanner from '../../components/HeaderBanner';

it('renders correctly', () => {
  const tree = renderer
    .create(<HeaderBanner />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
