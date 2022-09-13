import React from 'react';
import SampleUser from '../../types/SampleUser';

interface TableProps {
  elements: SampleUser[]
}

function UserTable({ elements }: TableProps) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="row">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
        </tr>
      </thead>
      <tbody>
        {elements.map((item, idx) => (
          // FIXME: dont't use 'idx' as key: https://reactjs.org/docs/lists-and-keys.html#keys
          <tr key={idx.toString()}>
            <td>{idx}</td>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
