/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderTitle from '../../components/HeaderTitle';

it('renders correctly', () => {
  const tree = renderer
    .create(<HeaderTitle />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
