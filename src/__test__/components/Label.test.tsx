/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import Label from '../../components/Label';

it('renders correctly', () => {
  const tree = renderer
    .create(<Label labelStr="test label" forStr="" />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
