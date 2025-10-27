import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Check from "/check.svg";
import Error from "/error.svg";
import Expense from "/expense.svg";
import Time from "/time.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const date = new Date();

  const reports: { icon: string; count: number; title: string }[] = [
    { icon: Expense, count: 90, title: "Total Disbursed" },
    { icon: Check, count: 20, title: "Total Approved" },
    { icon: Error, count: 140, title: "Total Application Submitted" },
    { icon: Time, count: 35, title: "Pending for Approval" },
  ];

  const columns: { label: string }[] = [
    { label: "reference no." },
    { label: "applicant name" },
    { label: "disbursement type" },
    { label: "appointment date" },
    { label: "status" },
    { label: "actions" },
  ];

  const data: {
    referrenceNumber: string;
    applicantName: string;
    disbursementType: string;
    appointmentDate: string;
    status: string;
    actions: string[];
  }[] = [
    {
      referrenceNumber: "MED-2025-028",
      applicantName: "Carla Bautista",
      disbursementType: "Medical Assistance",
      appointmentDate: "Oct 20, 2025",
      status: "Approved",
      actions: ["view"],
    },
    {
      referrenceNumber: "EDU-2025-017",
      applicantName: "Bea Ramos",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 19, 2025",
      status: "Pending Approved",
      actions: ["view", "approve", "reject"],
    },
    {
      referrenceNumber: "EDU-2025-202",
      applicantName: "Maria Dela Cruz",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 12, 2025",
      status: "Approved",
      actions: ["view"],
    },
    {
      referrenceNumber: "MED-2025-035",
      applicantName: "James Navarro",
      disbursementType: "Medical Assistance",
      appointmentDate: "Oct 18, 2025",
      status: "Disbured",
      actions: ["view"],
    },
    {
      referrenceNumber: "MED-2025-025",
      applicantName: "James Reid",
      disbursementType: "Medical Assistance",
      appointmentDate: "Oct 18, 2025",
      status: "Disbured",
      actions: ["view"],
    },
    {
      referrenceNumber: "EDU-2025-222",
      applicantName: "Juan Dela Cruz",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 12, 2025",
      status: "Approved",
      actions: ["view"],
    },
    {
      referrenceNumber: "EDU-2025-233",
      applicantName: "Maria Nada",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 12, 2025",
      status: "Approved",
      actions: ["view"],
    },
  ];

  return (
    <div className="flex flex-col gap-5">
      <div className="primaryBackground p-5 w-full rounded-lg flex flex-row justify-between font-semibold">
        <p>Overview</p>
        <p>{date.toDateString()}</p>
      </div>
      <div className="grid grid-cols-4 gap-5">
        {reports.map((report, index) => (
          <Card key={`${report.title}-${index}`}>
            <CardContent className="flex flex-col gap-2 items-start">
              <div className="bg-[#1576E2] rounded-full p-1.5 grid place-content-center">
                <img src={report.icon} alt="expense" className="w-8" />
              </div>
              <p className="text-sm">{report.title}</p>
              <p className="text-4xl font-bold">{report.count}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="p-2 gap-0">
        <CardHeader className="p-1">
          <p className="text-xl font-semibold">Application Overview Table</p>
        </CardHeader>
        <CardContent className="p-1">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={`${column.label}-${index}`}>
                    <p className="font-semibold uppercase">{column.label}</p>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map(
                (
                  {
                    referrenceNumber,
                    applicantName,
                    disbursementType,
                    appointmentDate,
                    status,
                    actions,
                  },
                  index
                ) => (
                  <TableRow key={`${referrenceNumber}-${index}`}>
                    <TableCell>
                      <p>{referrenceNumber}</p>
                    </TableCell>
                    <TableCell>
                      <p>{applicantName}</p>
                    </TableCell>
                    <TableCell>
                      <p>{disbursementType}</p>
                    </TableCell>
                    <TableCell>
                      <p>{appointmentDate}</p>
                    </TableCell>
                    <TableCell>
                      <p>{status}</p>
                    </TableCell>
                    <TableCell>
                      <ul className="flex flex-row gap-2">
                        {actions.map((action) => (
                          <li key={action}>{action}</li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
        {/* <CardFooter className="p-1">
          <Button>Next</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}
