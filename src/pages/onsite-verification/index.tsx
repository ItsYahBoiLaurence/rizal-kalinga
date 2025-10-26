import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import Check from "/check.svg";
import Error from "/error.svg";
import Expense from "/expense.svg";
import Time from "/time.svg";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import ApplicantProfile from "./ApplicantProfile";
import type { ApplicantType } from "@/types/applicant";
import { useApplicantStore } from "@/store/applicantStore";

export default function OnSiteVerification() {
  const { toggleSheet } = useApplicantStore();

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

  const data: ApplicantType[] = [
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
      <ApplicantProfile />
      <div className="primaryBackground p-5 w-full rounded-lg grid grid-cols-2 justify-between items-center font-semibold">
        <div>
          <p className="font-bold text-xl">On-Site Verification</p>
          <p className="text-xs font-light">
            Search and verify applicants in person, confirm their documents, and
            capture biometric data.
          </p>
        </div>
        <InputGroup className="bg-white text-black font-light">
          <InputGroupInput placeholder="search by reference number..." />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant={"ghost"}>
              <Search />
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
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
                          <li key={action}>
                            <p
                              onClick={() => toggleSheet()}
                              className={`capitalize cursor-pointer underline ${
                                action == "view"
                                  ? "text-blue-500"
                                  : action == "approve"
                                  ? "text-green-500"
                                  : "text-red-400"
                              }`}
                            >
                              {action}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
