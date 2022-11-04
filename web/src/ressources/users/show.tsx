import { Show, SimpleShowLayout, TextField, BooleanField, DateField } from "react-admin"

export default function UsersShow() {
  return (
    <Show>
      <SimpleShowLayout>
        <TextField source="id"/>
        <TextField source="username" />
        <TextField source="phone" />
        <TextField source="role" />
        <DateField source="createdAt" />
        <DateField source="updatedAt" />
        <DateField source="lastLogin"/>
        <BooleanField source="verified" />
      </SimpleShowLayout>
    </Show>
  );
}