import { SimpleForm, TextField, DateField, Edit, TextInput, BooleanInput } from "react-admin"

export default function UsersShow() {
  return (
    <Edit>
      <SimpleForm>
        <TextField source="id"/>
        <TextField source="role" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <DateField source="lastLogin"/>

        <TextInput source="username" />
        <TextInput source="phone" />
        <BooleanInput source="verified" />
      </SimpleForm>
    </Edit>
  );
}