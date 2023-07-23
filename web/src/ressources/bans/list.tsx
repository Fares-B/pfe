
import { List, Datagrid, TextField, DateField, BooleanField, SimpleList, ShowButton, EditButton } from 'react-admin';
import { useMediaQuery } from '@mui/material';

export default function BansList() {
  const isSmall = useMediaQuery((theme:any) => theme.breakpoints.down('sm'));
  return (
    <List>
      {isSmall ? (
        <SimpleList
          primaryText={record => record.id}
          // secondaryText={record => record.phone}
          // tertiaryText={record => record.verified ? "Verified" : "Not Verified"}
          linkType="show"
        />
      ) : (
        <Datagrid>
          <TextField source="id"/>
          <TextField source="username"/>

          {/*
          <TextField source="phone" />
          <DateField source="createdAt" />
          <DateField source="lastLogin" />
          <BooleanField source="verified" /> */}
          <ShowButton />
        </Datagrid>
      )}
    </List>
  );
}


