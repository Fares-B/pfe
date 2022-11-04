import { TextField, SimpleForm, Edit, DateField, TextInput, BooleanInput } from "react-admin"

export default function ProductsEdit() {
  return (
    <Edit>
      <SimpleForm>
        <TextField source="id" label="id" />
        <TextField source="rate" label="rate" />
        <DateField source="createdAt" label="createdAt" />
        {/* Editable */}
        <TextInput source="name" />
        <TextInput source="barcode" />
        <BooleanInput source="visible" />
      </SimpleForm>
    </Edit>
  );
}