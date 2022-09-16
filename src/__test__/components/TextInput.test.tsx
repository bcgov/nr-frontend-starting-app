/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../../components/TextInput';

describe('the TextInput component', () => {
  it('should have no feedback message when none is set', () => {
    const { getByTestId } = render(<TextInput id="test1" />);
    expect(getByTestId('feedback-element').textContent).toBe('');
  });

  it('should have the correct valid feedback message', () => {
    const { getByTestId } = render(<TextInput id="test2" isValid feedback="valid field" />);
    expect(getByTestId('feedback-element').textContent).toBe('valid field');
  });

  it('should have the correct invalid feedback message', () => {
    const { getByTestId } = render(<TextInput id="test3" isValid={false} feedback="invalid field" />);
    expect(getByTestId('feedback-element').textContent).toBe('invalid field');
  });

  it('should match the snapshot for the neutral input', () => {
    const tree = renderer
      .create(<TextInput id="test1" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match the snapshot for the success input', () => {
    const tree = renderer
      .create(<TextInput id="test2" isValid feedback="valid field" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should match the snapshot for the fail input', () => {
    const tree = renderer
      .create(<TextInput id="test3" isValid={false} feedback="invalid field" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
