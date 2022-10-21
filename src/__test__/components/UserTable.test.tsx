/* eslint-disable no-undef */
import { render } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import UserTable from '../../components/UserTable';
import SampleUser from '../../types/SampleUser';

describe('the UserTable component', () => {
  const users: SampleUser[] = [{
    firstName: 'User1FirstName',
    lastName: 'User1LastName'
  }, {
    firstName: 'User2FirstName',
    lastName: 'User2LastName'
  }];
  const tableHeaders: string[] = ['Column1', 'Column2', 'Column3'];

  it('should have the correct headers', () => {
    const { getByTestId } = render(
      <UserTable elements={users} deleteFn={() => {}} headers={tableHeaders} />
    );
    tableHeaders.forEach((element, i) => {
      expect(getByTestId(`header-${element}-${i}`).textContent).toBe(element);
    });
  });

  it('should match the snapshot', () => {
    const tree = renderer
      .create(<UserTable elements={users} deleteFn={() => {}} headers={tableHeaders} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
