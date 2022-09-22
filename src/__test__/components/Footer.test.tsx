/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Footer from '../../components/Footer';

describe('the Footer component', () => {
  it('should have the correct links', () => {
    const { getByTestId } = render(<Footer />);
    expect(getByTestId('footer-home').textContent).toBe('Home');
    expect(getByTestId('footer-disclaimer').textContent).toBe('Disclaimer');
    expect(getByTestId('footer-privacy').textContent).toBe('Privacy');
    expect(getByTestId('footer-acc').textContent).toBe('Accessibility');
    expect(getByTestId('footer-copyright').textContent).toBe('Copyright');
    expect(getByTestId('footer-contact').textContent).toBe('Contact Us');
    expect(getByTestId('footer-release').textContent).toBe('Release dev');
  });

  it('should match the snapshot', () => {
    const tree = renderer
      .create(<Footer />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
