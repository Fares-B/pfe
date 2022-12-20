import moment from "moment";
import { useEffect, useState } from "react";
import { Show, SimpleShowLayout, TextField, DateField, UseRecordContextParams, RaRecord, useRecordContext, useDataProvider, Confirm, useRedirect, useGetList, Loading } from "react-admin"
import { ActionReason, ActionReasonItem } from "../../components/Actions";


function Comments() {
  const record = useRecordContext();
  const { data, total, isLoading, error } = useGetList(
    "comments",
    {
      pagination: { page: 1, perPage: 100 },
      sort: { field: "createdAt", order: "DESC" },
      filter: { "userId": record.id },
    }
  );

  if (isLoading) return <Loading />;
  if (error || data === undefined) return <p>ERROR</p>;


  return (
    <div>
      <h3>Comments <span>{data.length} / {data.reduce((acc, rec) => acc + rec.sum, 0)}</span></h3>
      {data.map(rec =>
        <div key={rec.id}>
          <h5>{rec.id}</h5>
          <ul>
            {rec.comments.map((comment: any) => <li key={comment._id}> {moment(comment.createdAt).format("HH:mm")} {comment.content}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}

function ActionsBans() {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const redirect = useRedirect();
  const [open, setOpen] = useState<boolean>(false);

  const unban = () => setOpen(true);

  const handleConfirm = async () => {
    await dataProvider.update("bans", {
      id: record.id, data: { banned: null },
      previousData: record
    }).then(() => redirect("/bans"));
  };

  const handleDialogClose = () => setOpen(false);

  return (
    <>
      <ActionReason>
        <ActionReasonItem onClick={unban}>Unban</ActionReasonItem>
      </ActionReason>
      <Confirm
        isOpen={open}
        // loading={isLoading}
        title="Unban user"
        content={"Do you want to unban this user ?"}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
}

export default function BansShow() {
  return (
    <Show actions={<ActionsBans />}>
      <SimpleShowLayout>
        <TextField source="id"/>
        <TextField source="username" />
        <DateField source="createdAt" />
        <DateField source="lastLogin" />
        <TextField source="banned.reason" />
        <DateField source="banned.date" />
      </SimpleShowLayout>

      {/* List of comments */}
      <SimpleShowLayout>
        <Comments />
      </SimpleShowLayout>
    </Show>
  );
}
