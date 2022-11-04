import { SimpleForm, Create, TextInput, BooleanInput } from "react-admin"


export default function ProductsEdit() {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="barcode" />
        <BooleanInput source="visible" />
      </SimpleForm>
    </Create>
  );
}
