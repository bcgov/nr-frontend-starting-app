import React from 'react';
import { Button } from 'shared-components';
import { hashObject } from 'react-hash-string';
import SampleUser from '../../types/SampleUser';

interface TableProps {
  elements: SampleUser[],
  deleteFn: Function
}

function UserTable({ elements, deleteFn }: TableProps) {
  return (
    <table className="table">
      <thead className="thead-dark">
        <tr>
          <th scope="col" className="w-25">#</th>
          <th scope="col" className="w-25">First name</th>
          <th scope="col" className="w-25">Last name</th>
          <th scope="col" className="w-25">Delete?</th>
        </tr>
      </thead>
      <tbody>
        {elements.map((item, idx) => (
          <tr key={hashObject(item)}>
            <th scope="row">{idx}</th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>
              <Button onClick={() => deleteFn(idx)} label="Delete me" styling="bcgov-normal-white btn" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
