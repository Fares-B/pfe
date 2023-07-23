import moment from "moment";
import { useState } from "react";
import { Show, SimpleShowLayout, TextField, DateField, useRecordContext, UseRecordContextParams, RaRecord, useGetOne, Confirm, useUpdate, useDataProvider, useRedirect } from "react-admin"
import { BadgeReason } from "../../components";
import { ActionReason, ActionReasonItem, CardReason, ListReason } from "../../components/Actions";


type openProps = "free" | "delete" | "ban" | false;

function ActionsReport(props: UseRecordContextParams<RaRecord>) {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const redirect = useRedirect();
  const [open, setOpen] = useState<openProps>(false);
  const [reason, setReason] = useState<string>("spam");

  const freeReport = () => setOpen("free");
  
  const deleteReport = () => setOpen("delete");

  const banUser = () => setOpen("ban");

  const handleConfirm = async () => {
    if (open === "ban") {
      await dataProvider
        .create("bans/" + record.user.id, { data: { reason: reason } })
        .then(() => {
          redirect("/reports");
        });
    }
    else {
      await dataProvider.update("reports", {
        id: record.id, data: { action: open },
        previousData: record
      }).then(() => redirect("/reports")); 
    }
    setOpen(false)
  };

  const handleDialogClose = () => setOpen(false);

  const getMessageDialog = () => {
    switch (open) {
      case "free":
        return "Do you want to free this report ?";
      case "delete":
        return "Do you want to delete this report ?";
      case "ban":
        return <>
          <p>Select a reason for the ban</p>
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option value="spam">spam</option>
            <option value="harassment">harassment</option>
            <option value="other">other</option>
          </select>
        </>;
      default:
        return "";
    }
  };

  return (
    <>
      <ActionReason>
        <ActionReasonItem onClick={freeReport}>Free</ActionReasonItem>
        <ActionReasonItem onClick={deleteReport}>Delete</ActionReasonItem>
        { "product" !== props.documentType &&
          <ActionReasonItem onClick={banUser} danger={true}>Ban</ActionReasonItem>
        }
      </ActionReason>
      <Confirm
        isOpen={open !== false}
        // loading={isLoading}
        title="Update report"
        content={getMessageDialog()}
        onConfirm={handleConfirm}
        onClose={handleDialogClose}
      />
    </>
  );
}

function ListReports(props: UseRecordContextParams<RaRecord>) {
  const record = useRecordContext(props);
  return (
    <div>
      <h1>Rapports</h1>
      <ListReason>
        {record.reports.map((report:any, key: any) => (
          <CardReason key={key}>
            <BadgeReason reason={report.reason}>
              {report.reason}
            </BadgeReason>
            <p>{report.who.username}</p>
            <p>{moment(report.createdAt).format("DD/MM HH:mm")}</p>
          </CardReason>
        ))}
      </ListReason>
    </div>
  );
}


export default function ReportsShow(props:any) {
  // get query params
  const hash = window.location.hash;
  const params = new URLSearchParams(hash.split("?")[1]);
  const type = params.get("type");

  return (
    <>
      <Show actions={<ActionsReport documentType={type} />} queryOptions={{ meta: { type } }}>
        <SimpleShowLayout>
          <h1>Contenu</h1>
          <TextField source="id"/>
          <TextField source="content" />
          <TextField source="user.id" />
          <TextField source="user.username" />
          <DateField source="createdAt" />
          <DateField source="updatedAt" />
        </SimpleShowLayout>
      </Show>

      <Show>
        <SimpleShowLayout>
          <ListReports />
        </SimpleShowLayout>
      </Show>

    </>
  );
}