import React from 'react';

import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell
} from '@carbon/react';
import { TrashCan } from '@carbon/icons-react';
import { useKeycloak } from '@react-keycloak/web';

import { hashObject } from 'react-hash-string';

import LoadingButton from '../LoadingButton';
import SampleUser from '../../types/SampleUser';
import { kcUserHasRole } from '../../service/AuthService';

interface TableProps {
  elements: SampleUser[],
  deleteFn: Function,
  headers: string[]
}

const UserTable = ({ elements, deleteFn, headers }: TableProps) => {
  const loadingStatus = {
    loading: 'Deleting...',
    success: 'Deleted!',
    error: 'Error'
  };

  const { keycloak, initialized } = useKeycloak();

  return (
    <Table size="lg" useZebraStyles={false}>
      <TableHead>
        <TableRow>
          {headers.map((header, idx) => (
            <TableHeader key={header} id={`header-${header}-${idx}`} data-testid={`header-${header}-${idx}`}>
              {header}
            </TableHeader>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {elements.map((item, idx) => (
          <TableRow key={hashObject(item)} id={`row${idx}`}>
            <TableCell>{idx}</TableCell>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>
              {!kcUserHasRole(keycloak, initialized, 'user_write')
                ? 'Some Text' : (
                  <LoadingButton
                    id={`delete-${idx}`}
                    clickFn={() => deleteFn(idx)}
                    label="Delete"
                    status={loadingStatus}
                    icon={TrashCan}
                  />
                )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
