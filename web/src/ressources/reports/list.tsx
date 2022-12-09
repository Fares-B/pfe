import { List, Datagrid, TextField, useRecordContext, ShowButton } from 'react-admin';
import { mostCommonInArray } from '../../globals/functions';


interface IReasonField {
  id: string;
  documentType: string;
  count: number;
  reason: string[];
}

const ReasonField = (props:IReasonField) => {
  const record: IReasonField = useRecordContext(props);
  return (
    <span>
      {mostCommonInArray(record.reason)}
    </span>
  );
};

const ShowButtonItem = (props:any) => {
  const record = useRecordContext(props);
  return <ShowButton to={`${record.id}/show?type=${record.documentType}`} />;
};

export default function ReportsList(props:any) {
  return (
    <List>
      <Datagrid>
        <TextField source="id" />
        <TextField source="documentType" label="type" />
        <ReasonField {...props} source="reason"  />
        <TextField source="count" />
        <ShowButtonItem source="Voir" />
      </Datagrid>
    </List>
  );
}
