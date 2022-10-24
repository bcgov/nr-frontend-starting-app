/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import BCHeader from '../../components/BCHeader';

describe('the Header component', () => {
  it('should have the correct title', () => {
    const { getByTestId } = render(<BCHeader />);

    // Carbon Header component uses &nbsp; to break the space between the prefix
    // (BC Gov's) and the title (NR Sample App), so it's necessary to use \xA0
    // to validate correctly
    expect(getByTestId('header-name').textContent).toBe('BC Gov\'s\xA0NR Sample App');
  });

  it('should match the snapshot', () => {
    const tree = renderer
      .create(<BCHeader />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
