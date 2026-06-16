// import { GetQueriesByPropertId } from "../../../../actions/queriest";
// import { Property, Query } from "@prisma/client";
// import { Modal, Table, message } from "antd";
// import dayjs from "dayjs";
// import React, { useEffect } from "react";

// interface Props {
//   showQueriesModal: boolean;
//   setShowQueriesModal: React.Dispatch<React.SetStateAction<boolean>>;
//   selectedProperty: Property | null;
// }

// function PropertyQueries({
//   showQueriesModal,
//   setShowQueriesModal,
//   selectedProperty,
// }: Props) {
//   const [loading, setLoading] = React.useState<boolean>(false);
//   const [queries, setQueries] = React.useState<Query[]>([]);

//   useEffect(() => {
//     const fetchQueries = async () => {
//       try {
//         setLoading(true);
//         const response: any = await GetQueriesByPropertId(
//           selectedProperty?.id || ""
//         );
//         if (response.error) throw new Error(response.error);
//         setQueries(response.data);
//       } catch (error: any) {
//         message.error(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (selectedProperty) fetchQueries();
//   }, []);

//   const columns = [
//     {
//       title: "Customer Name",
//       dataIndex: "name",
//     },
//     {
//       title: "Customer Mobile",
//       dataIndex: "phoneNumber",
//     },
//     {
//       title: "Quote Amount",
//       dataIndex: "quoteAmount",
//       render: (quoteAmount: number) => `$ ${quoteAmount}`,
//     },
//     {
//       title: "Message",
//       dataIndex: "message",
//     },
//     {
//       title: "Date & Time",
//       dataIndex: "createdAt",
//       render: (createdAt: string) =>
//         dayjs(createdAt).format("DD MMM YYYY hh:mm A"),
//     },
//   ];

//   return (
//     <Modal
//       title={`Queries for ${selectedProperty?.name}`}
//       open={showQueriesModal}
//       onCancel={() => setShowQueriesModal(false)}
//       width={1000}
//       footer={null}
//     >
//       <Table columns={columns} dataSource={queries} loading={loading} />
//     </Modal>
//   );
// }

// export default PropertyQueries;








import { GetQueriesByPropertId } from "../../../../actions/queriest";
import { Property, Query } from "@prisma/client";
import { Modal, Table, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

interface Props {
  showQueriesModal: boolean;
  setShowQueriesModal: React.Dispatch<React.SetStateAction<boolean>>;
  selectedProperty: Property | null;
}

function PropertyQueries({
  showQueriesModal,
  setShowQueriesModal,
  selectedProperty,
}: Props) {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [queries, setQueries] = React.useState<Query[]>([]);

  useEffect(() => {
    const fetchQueries = async () => {
      try {
        setLoading(true);
        const response: any = await GetQueriesByPropertId(
          selectedProperty?.id || ""
        );
        if (response.error) throw new Error(response.error);
        setQueries(response.data);
      } catch (error: any) {
        message.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedProperty) fetchQueries();
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "name",
      responsive: ["xs", "sm", "md", "lg"],
    },
    {
      title: "Customer Mobile",
      dataIndex: "phoneNumber",
      responsive: ["sm", "md", "lg"], // mobilde gizle
    },
    {
      title: "Quote Amount",
      dataIndex: "quoteAmount",
      responsive: ["xs", "sm", "md", "lg"],
      render: (quoteAmount: number) => `$ ${quoteAmount}`,
    },
    {
      title: "Message",
      dataIndex: "message",
      ellipsis: true,
      responsive: ["md", "lg"], // küçük ekranlarda gizle
    },
    {
      title: "Date & Time",
      dataIndex: "createdAt",
      responsive: ["xs", "sm", "md", "lg"],
      render: (createdAt: string) =>
        dayjs(createdAt).format("DD MMM YYYY hh:mm A"),
    },
  ];

  return (
    <Modal
      title={
        <div className="text-sm sm:text-lg font-semibold">
          Queries for {selectedProperty?.name}
        </div>
      }
      open={showQueriesModal}
      onCancel={() => setShowQueriesModal(false)}
      footer={null}
      
      /* ✅ Responsive modal width */
      width="100%"
      style={{ maxWidth: 1000 }}
      
      /* Mobile spacing fix */
      bodyStyle={{ padding: "12px" }}
    >
      <div className="w-full">
        
        {/* TABLE SCROLL FIX */}
        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={queries}
            loading={loading}
            rowKey={(record) => record.id}
            
            pagination={{
              pageSize: 8,
              responsive: true,
            }}
            
            scroll={{ x: 700 }} // mobilde taşma çözümü
            
            size="middle"
          />
        </div>

      </div>
    </Modal>
  );
}

export default PropertyQueries;
