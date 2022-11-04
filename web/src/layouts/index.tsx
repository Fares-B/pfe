import { Admin, Resource } from "react-admin";
import { Person, List as ListIcon } from '@mui/icons-material';
import authProvider from "../providers/auth";
import dataProvider from "../providers/data";
import { Users, Products } from "../ressources";
import { ReactQueryDevtools } from 'react-query/devtools';

const MyLayout = (props:any) => <div>
  {props.children}
  <ReactQueryDevtools initialIsOpen={true} />
</div>;



const Layout: React.FC = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider} /* layout={MyLayout} */>
      <Resource
        name="users"
        list={Users.list}
        show={Users.show}
        edit={Users.edit}
        icon={Person}
        recordRepresentation={record => record.username}
      />
      <Resource
        name="products"
        list={Products.list}
        show={Products.show}
        edit={Products.edit}
        create={Products.create}
        icon={ListIcon}
        recordRepresentation={record => record.name}
      />
    </Admin>
  );
};

export default Layout;
