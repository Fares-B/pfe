import { Show, SimpleShowLayout, TextField, BooleanField, DateField } from "react-admin"

export default function ProductsShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id"/>
        <TextField source="name" />
        <TextField source="barcode" />
        <TextField source="rate" />
        <BooleanField source="deleted" label="visible" />
        <DateField source="createdAt" />
      </SimpleShowLayout>
    </Show>
  );
}