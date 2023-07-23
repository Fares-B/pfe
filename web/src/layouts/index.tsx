import { Admin, Resource } from "react-admin";
import { Person, List as ListIcon, Balance } from '@mui/icons-material';
import authProvider from "../providers/auth";
import dataProvider from "../providers/data";
import { Users, Products, Reports, Bans } from "../ressources";
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
        options={{ label: 'Users' }}
        list={Users.list}
        show={Users.show}
        edit={Users.edit}
        icon={Person}
        recordRepresentation={record => record.username}
      />
      <Resource
        name="products"
        options={{ label: 'Products' }}
        list={Products.list}
        show={Products.show}
        edit={Products.edit}
        create={Products.create}
        icon={ListIcon}
        recordRepresentation={record => record.name}
      />

      <Resource
        name="reports"
        options={{ label: 'Reports' }}
        list={Reports.list}
        show={Reports.show}
        // recordRepresentation={record => `${record.user.username}`}
      />
      <Resource
        name="bans"
        options={{ label: 'Bans' }}
        list={Bans.list}
        show={Bans.show}
        edit={undefined}
        icon={Balance}
      />
    </Admin>
  );
};

export default Layout;
