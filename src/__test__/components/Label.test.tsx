/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import Label from '../../components/Label';
import '@testing-library/jest-dom';

describe('the Label component', () => {
  it('should have the correct text', () => {
    const { getByTestId } = render(<Label labelStr="Test label" forStr="" />);
    expect(getByTestId('label-element').textContent).toBe('Test label');
  });

  it('should have the correct "for" attribute', () => {
    const { getByTestId } = render(<Label labelStr="Test label" forStr="testInput" />);
    expect(getByTestId('label-element')).toHaveAttribute('for', 'testInput');
  });

  it('should match the snapshot', () => {
    const tree = renderer
      .create(<Label labelStr="Test label" forStr="" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
