
import { List, Datagrid, TextField, DateField, BooleanField, SimpleList, ShowButton, EditButton } from 'react-admin';
import { useMediaQuery } from '@mui/material';

export default function UsersList() {
  const isSmall = useMediaQuery((theme:any) => theme.breakpoints.down('sm'));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.username}
          secondaryText={record => record.phone}
          tertiaryText={record => record.verified ? "Verified" : "Not Verified"}
          linkType="show"
        />
      ) : (
        <Datagrid>
          <TextField source="id"/>
          <TextField source="username" />
          <TextField source="phone" />
          <DateField source="createdAt" />
          <DateField source="lastLogin" />
          <BooleanField source="verified" />
          <BooleanField source="isBanned" label="Banned" />
          <EditButton />
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
}


