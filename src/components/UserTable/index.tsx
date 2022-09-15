import React from 'react';
import { Button } from 'shared-components';
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
          <th scope="col" className="w-25">First</th>
          <th scope="col" className="w-25">Last</th>
          <th scope="col" className="w-25">Delete?</th>
        </tr>
      </thead>
      <tbody>
        {elements.map((item, idx) => (
          // FIXME: dont't use 'idx' as key: https://reactjs.org/docs/lists-and-keys.html#keys
          <tr key={idx.toString()}>
            <th scope="row">{idx}</th>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>
              <Button onClick={() => deleteFn(idx)} label="Delete-me" styling="bcgov-normal-white btn" />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
