/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import FooterLink from '../../components/FooterLink';

it('renders correctly', () => {
  const tree = renderer
    .create(<FooterLink />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
