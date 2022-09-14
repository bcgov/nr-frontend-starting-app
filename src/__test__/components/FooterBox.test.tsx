/* eslint-disable no-undef */
import React from 'react';
import renderer from 'react-test-renderer';
import FooterBox from '../../components/FooterBox';

// This component serves only as a 'parent' for the footer elements
// so the snapshot test is sufficient

describe('the component renders correctly', () => {
  it('should match the snapshot', () => {
    const tree = renderer
      .create(<FooterBox />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
