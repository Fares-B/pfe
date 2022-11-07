import { Switch } from '@mui/material';
import { List, Datagrid, TextField, DateField, EditButton, useRecordContext, useUpdate, ShowButton } from 'react-admin';


const HandleDeleteButton = (props: any) => {
  const record = useRecordContext();
  // update the record in the database
  const [update, { isLoading, data }]: any = useUpdate(
    "products",
    { id: record.id, data: { visible: !record.visible }, previousData: record },
  );

  return <Switch
    checked={data === undefined ? record.visible : data.visible}
    onChange={() => update()}
  />;
  }


export default function ProductsList() {
  return (
    <List>
      <Datagrid>
        <TextField source="id"/>
        <TextField source="name" />
        <TextField source="barcode" />
        <TextField source="rate" />
        <DateField source="createdAt" />
        <HandleDeleteButton label="Visible" />
        <EditButton />
        <ShowButton />
        {/* <DeleteButton /> */}
      </Datagrid>
    </List>
  );
}
