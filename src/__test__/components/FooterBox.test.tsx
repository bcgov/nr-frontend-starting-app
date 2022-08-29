/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import FooterBox from '../../components/FooterBox';

it('renders correctly', () => {
  const tree = renderer
    .create(<FooterBox />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
