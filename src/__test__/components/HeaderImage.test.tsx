/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderImage from '../../components/HeaderImage';
import '@testing-library/jest-dom';

describe('the component', () => {
  it('should have the correct image', () => {
    const { getByTestId } = render(<HeaderImage data-testid="header-image" src="https://developer.gov.bc.ca/static/BCID_H_rgb_rev-20eebe74aef7d92e02732a18b6aa6bbb.svg" />);
    expect(getByTestId('header-image')).toHaveAttribute('src', 'https://developer.gov.bc.ca/static/BCID_H_rgb_rev-20eebe74aef7d92e02732a18b6aa6bbb.svg');
  });
});

describe('the component renders correctly', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(<HeaderImage />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
