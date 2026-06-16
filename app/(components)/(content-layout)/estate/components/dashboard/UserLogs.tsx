// import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
// import { ScrollArea } from "../../components/ui/scroll-area";
// import { getNormalDate } from "../../lib/getNormalDate";
// import { Activity, User } from "lucide-react";
// export type UserLog = {
//   id: string;
//   name: string;
//   activity: string;
//   time: string;
//   createdAt: Date;
//   updatedAt: Date;
//   ipAddress?: string;
//   device?: string;
//   schoolId: string;
// };
// // Helper function to group logs by date
// function groupLogsByDate(logs: UserLog[]) {
//   const grouped = logs.reduce((acc, log) => {
//     const date = getNormalDate(log.createdAt);
//     if (!acc[date]) {
//       acc[date] = [];
//     }
//     acc[date].push(log);
//     return acc;
//   }, {} as Record<string, UserLog[]>);

//   // Sort dates in descending order
//   return Object.entries(grouped).sort(
//     (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
//   );
// }

// export default function UserLogs({ logs }: { logs: UserLog[] }) {
//   const groupedLogs = groupLogsByDate(logs);

//   return (
//     <Card className="w-full max-w-5xl mx-auto bg-blue-50">
//       <CardHeader className="bg-blue-500 text-white">
//         <CardTitle className="text-2xl font-bold flex items-center">
//           <Activity className="mr-2" />
//           User Logs ({logs.length})
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         {logs.length > 0 ? (
//           <ScrollArea className="h-[400px] pr-4">
//             {groupedLogs.map(([date, dateLogs]) => (
//               <div key={date} className="mb-6">
//                 <h3 className="text-lg font-semibold text-blue-700 mb-3 sticky top-0 bg-blue-50 py-2">
//                   {date}
//                 </h3>
//                 {dateLogs.map((log) => (
//                   <Card
//                     key={log.id}
//                     className="mb-4 bg-white shadow-md hover:shadow-lg transition-shadow"
//                   >
//                     <CardContent className="p-4">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center">
//                           <User className="mr-2 text-blue-500" />
//                           <span className="font-semibold text-blue-700">
//                             {log.name}
//                           </span>
//                         </div>
//                         <div className="text-sm text-blue-600">{log.time}</div>
//                       </div>
//                       <div className="mt-2 text-gray-600">
//                         <p>Activity: {log.activity}</p>
//                         {log.device && <p>Device: {log.device}</p>}
//                         {log.ipAddress && <p>IP Address: {log.ipAddress}</p>}
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             ))}
//           </ScrollArea>
//         ) : (
//           <div className="text-center py-8 text-gray-500">
//             <h2 className="text-xl font-semibold">No Logs Yet</h2>
//           </div>
//         )}
//       </CardContent>
//     </Card>
//   );
// }







"use client";

import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { ScrollArea } from "../../components/ui/scroll-area";
import { getNormalDate } from "../../lib/getNormalDate";
import { Activity, User } from "lucide-react";

export type UserLog = {
  id: string;
  name: string;
  activity: string;
  time: string;
  createdAt: Date;
  updatedAt: Date;
  ipAddress?: string;
  device?: string;
  schoolId: string;
};

// API response tipi
type UserLogsResponse = {
  data: {
    logs: UserLog[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  error: null;
};

// Helper function to group logs by date
function groupLogsByDate(logs: UserLog[]) {
  // Eğer logs array değilse veya yoksa boş array döndür
  if (!Array.isArray(logs)) {
    console.error("Logs is not an array:", logs);
    return [];
  }

  const grouped = logs.reduce((acc, log) => {
    const date = getNormalDate(log.createdAt);
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(log);
    return acc;
  }, {} as Record<string, UserLog[]>);

  // Sort dates in descending order
  return Object.entries(grouped).sort(
    (a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime()
  );
}

export default function UserLogs({ logs }: { logs: UserLogsResponse | UserLog[] }) {
  // Logs'un hangi formatta geldiğini kontrol et
  console.log("UserLogs received:", logs);
  
  // Eğer API response formatında geldiyse, içindeki logs array'ini al
  const logsArray = logs && typeof logs === 'object' && 'data' in logs 
    ? logs.data?.logs || [] 
    : Array.isArray(logs) 
      ? logs 
      : [];

  console.log("Processed logs array:", logsArray);
  
  const groupedLogs = groupLogsByDate(logsArray);

  return (
    <Card className="w-full max-w-5xl mx-auto bg-blue-50">
      <CardHeader className="bg-blue-500 text-white">
        <CardTitle className="text-2xl font-bold flex items-center">
          <Activity className="mr-2" />
          User Logs ({logsArray.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        {logsArray.length > 0 ? (
          <ScrollArea className="h-[400px] pr-4">
            {groupedLogs.map(([date, dateLogs]) => (
              <div key={date} className="mb-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-3 sticky top-0 bg-blue-50 py-2">
                  {date}
                </h3>
                {dateLogs.map((log) => (
                  <Card
                    key={log.id}
                    className="mb-4 bg-white shadow-md hover:shadow-lg transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <User className="mr-2 text-blue-500" />
                          <span className="font-semibold text-blue-700">
                            {log.name}
                          </span>
                        </div>
                        <div className="text-sm text-blue-600">{log.time}</div>
                      </div>
                      <div className="mt-2 text-gray-600">
                        <p>Activity: {log.activity}</p>
                        {log.device && <p>Device: {log.device}</p>}
                        {log.ipAddress && <p>IP Address: {log.ipAddress}</p>}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </ScrollArea>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <h2 className="text-xl font-semibold">No Logs Yet</h2>
          </div>
        )}
      </CardContent>
    </Card>
  );
}