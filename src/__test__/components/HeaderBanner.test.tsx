/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import HeaderBanner from '../../components/HeaderBanner';

// This component serves only as a 'parent' for the header title and image
// so the snapshot test is sufficient

describe('the component renders correctly', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(<HeaderBanner />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
