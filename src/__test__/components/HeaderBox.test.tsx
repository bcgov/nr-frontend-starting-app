/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBox from '../../components/HeaderBox';

it('renders correctly', () => {
  const tree = renderer
    .create(<HeaderBox />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
