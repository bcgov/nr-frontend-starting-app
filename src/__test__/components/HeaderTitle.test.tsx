/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderTitle from '../../components/HeaderTitle';

describe('the component', () => {
  it('should have the correct text', () => {
    const { getByTestId } = render(
      <HeaderTitle data-testid="header-title">
        Test Title
      </HeaderTitle>
    );
    expect(getByTestId('header-title').textContent).toBe('Test Title');
  });
});

describe('the component renders correctly', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(<HeaderTitle />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
