import React from 'react';

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Button,
  InlineLoading
} from '@carbon/react';
import { TrashCan } from '@carbon/icons-react';

import { hashObject } from 'react-hash-string';
import SampleUser from '../../types/SampleUser';

interface TableProps {
  elements: SampleUser[],
  deleteFn: Function,
  headers: String[]
}

const UserTable = ({ elements, deleteFn, headers }: TableProps) => {
  const [loading, setLoading] = React.useState(false);
  const [loadDesc, setLoadDesc] = React.useState('Deleting...');
  const [success, setSuccess] = React.useState('');

  /**
   * Calls the delete function and set the loading state.
   *
   * @param id the id of the user that will be deleted
   */
  const deleteEntry = (id: number) => {
    setLoading(true);
    setSuccess('active');

    if (deleteFn(id)) {
      setSuccess('finished');
      setLoadDesc('Deleted!');
    } else {
      setSuccess('error');
      setLoadDesc('Failed!');
    }

    // Reset value for next delete
    setTimeout(() => {
      setLoading(false);
      setLoadDesc('Deleting...');
      setSuccess('active');
    }, 1000);
  };

  return (
    <Table size="lg" useZebraStyles={false}>
      <TableHead>
        <TableRow>
          {headers.map((header) => (
            <TableHeader key={header}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {elements.map((item, idx) => (
          <TableRow key={hashObject(item)}>
            <TableCell>{idx}</TableCell>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>
              {
                loading ? (
                  <InlineLoading
                    description={loadDesc}
                    status={success}
                  />
                ) : (
                  <Button
                    onClick={() => deleteEntry(idx)}
                    size="md"
                    renderIcon={TrashCan}
                  >
                    Delete
                  </Button>
                )
              }
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
