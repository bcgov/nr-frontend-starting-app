/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import Card from '../../components/Card';

describe('the component', () => {
  it('should have the correct title and text', () => {
    const { getByTestId } = render(<Card title="Test card" text="This is just a test text." />);
    expect(getByTestId('card-title').textContent).toBe('Test card');
    expect(getByTestId('card-text').textContent).toBe('This is just a test text.');
  });
});

describe('the component renders correctly', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(<Card title="Test card" text="This is just a test text." />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
