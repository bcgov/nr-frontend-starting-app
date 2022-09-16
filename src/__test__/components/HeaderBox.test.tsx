/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBox from '../../components/HeaderBox';

// This component serves only as a 'parent' to style correctly the header
// so the snapshot test is sufficient

describe('the HeaderBox component', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(<HeaderBox />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
