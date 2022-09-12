/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import TextInput from '../../components/TextInput';

describe('renders correctly', () => {
  it('neutral input', () => {
    const tree = renderer
      .create(<TextInput id="test1" isValid feedback="valid field" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('success input', () => {
    const tree = renderer
      .create(<TextInput id="test2" isValid feedback="valid field" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('fail input', () => {
    const tree = renderer
      .create(<TextInput id="test3" isValid={false} feedback="invalid field" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
