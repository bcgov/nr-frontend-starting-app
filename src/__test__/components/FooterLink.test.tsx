/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import FooterLink from '../../components/FooterLink';

describe('the FooterLink component', () => {
  it('should have the correct text link', () => {
    const { getByTestId } = render(
      <FooterLink data-testid="footer-test" href="#">
        Test FooterLink
      </FooterLink>
    );
    expect(getByTestId('footer-test').textContent).toBe('Test FooterLink');
  });

  it('should match the snapshot', () => {
    const tree = renderer
      .create(<FooterLink />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
