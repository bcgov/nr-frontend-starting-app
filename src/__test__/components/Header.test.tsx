/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import Header from '../../components/Header';

describe('the Header component', () => {
  it('should have the correct title', () => {
    const { getByTestId } = render(<Header />);
    expect(getByTestId('header-title').textContent).toBe('NR Sample App');
  });

  it('should match the snapshot', () => {
    const tree = renderer
      .create(<Header />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
