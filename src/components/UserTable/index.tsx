import React from 'react';
import SampleUser from '../../types/SampleUser';

interface TableProps {
  elements: SampleUser[]
}

function UserTable({ elements }: TableProps) {
  const rows = [];
  elements.forEach((element) => {
    const tableRow = (
      <tr>
        <td>{ element.firstName }</td>
        <td>{ element.lastName }</td>
      </tr>
    );

    rows.push(tableRow);
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">First</th>
          <th scope="col">Last</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

export default UserTable;
