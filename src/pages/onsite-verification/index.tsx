import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ApplicantProfile from "./ApplicantProfile";
import type { ApplicantType } from "@/types/applicant";
import { useApplicantStore } from "@/store/applicantStore";

export default function OnSiteVerification() {
  const { toggleSheet, setActiveApplicant } = useApplicantStore();

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
      firstName: "Carla",
      middleName: "M.",
      lastName: "Bautista",
      suffix: "",
      birthDate: "1992-06-14",
      civilStatus: "Married",
      citizenship: "Filipino",
      contactNo: "09171234567",
      email: "carla.bautista@example.com",
      region: "NCR",
      province: "Metro Manila",
      cityMunicipality: "Quezon City",
      barangay: "Bagumbayan",
      streetHouseNo: "45 Kamias Rd",
      fathersFirstName: "Ramon",
      fathersMiddleName: "T.",
      fathersLastName: "Bautista",
      fathersSuffix: "",
      fathersBirthPlace: "Batangas City",
      fathersOccupation: "Driver",
      mothersFirstName: "Maria",
      mothersMiddleName: "L.",
      mothersLastName: "Bautista",
      mothersSuffix: "",
      mothersBirthPlace: "Batangas City",
      mothersOccupation: "Teacher",
    },
    {
      referrenceNumber: "EDU-2025-017",
      applicantName: "Bea Ramos",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 19, 2025",
      status: "Pending Approved",
      actions: ["view", "approve", "reject"],
      firstName: "Bea",
      middleName: "C.",
      lastName: "Ramos",
      suffix: "",
      birthDate: "2004-03-22",
      civilStatus: "Single",
      citizenship: "Filipino",
      contactNo: "09181234567",
      email: "bea.ramos@example.com",
      region: "Region IV-A",
      province: "Cavite",
      cityMunicipality: "Dasmariñas City",
      barangay: "Zone IV",
      streetHouseNo: "Blk 12 Lot 5 Mabini St",
      fathersFirstName: "Carlos",
      fathersMiddleName: "D.",
      fathersLastName: "Ramos",
      fathersSuffix: "",
      fathersBirthPlace: "Cavite City",
      fathersOccupation: "Mechanic",
      mothersFirstName: "Lorna",
      mothersMiddleName: "E.",
      mothersLastName: "Ramos",
      mothersSuffix: "",
      mothersBirthPlace: "Cavite City",
      mothersOccupation: "Vendor",
    },
    {
      referrenceNumber: "EDU-2025-202",
      applicantName: "Maria Dela Cruz",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 12, 2025",
      status: "Approved",
      actions: ["view"],
      firstName: "Maria",
      middleName: "S.",
      lastName: "Dela Cruz",
      suffix: "",
      birthDate: "2003-11-02",
      civilStatus: "Single",
      citizenship: "Filipino",
      contactNo: "09193456789",
      email: "maria.delacruz@example.com",
      region: "Region III",
      province: "Bulacan",
      cityMunicipality: "Malolos",
      barangay: "San Pablo",
      streetHouseNo: "Lot 15 Blk 8 Sampaguita St",
      fathersFirstName: "Eduardo",
      fathersMiddleName: "T.",
      fathersLastName: "Dela Cruz",
      fathersSuffix: "",
      fathersBirthPlace: "Bulacan",
      fathersOccupation: "Farmer",
      mothersFirstName: "Rosa",
      mothersMiddleName: "P.",
      mothersLastName: "Dela Cruz",
      mothersSuffix: "",
      mothersBirthPlace: "Bulacan",
      mothersOccupation: "Homemaker",
    },
    {
      referrenceNumber: "MED-2025-035",
      applicantName: "James Navarro",
      disbursementType: "Medical Assistance",
      appointmentDate: "Oct 18, 2025",
      status: "Disbursed",
      actions: ["view"],
      firstName: "James",
      middleName: "L.",
      lastName: "Navarro",
      suffix: "",
      birthDate: "1988-01-10",
      civilStatus: "Married",
      citizenship: "Filipino",
      contactNo: "09201234567",
      email: "james.navarro@example.com",
      region: "Region VI",
      province: "Iloilo",
      cityMunicipality: "Iloilo City",
      barangay: "Molo",
      streetHouseNo: "23 Lopez Jaena St",
      fathersFirstName: "Leonardo",
      fathersMiddleName: "G.",
      fathersLastName: "Navarro",
      fathersSuffix: "",
      fathersBirthPlace: "Iloilo",
      fathersOccupation: "Farmer",
      mothersFirstName: "Teresa",
      mothersMiddleName: "R.",
      mothersLastName: "Navarro",
      mothersSuffix: "",
      mothersBirthPlace: "Iloilo",
      mothersOccupation: "Seamstress",
    },
    {
      referrenceNumber: "MED-2025-025",
      applicantName: "James Reid",
      disbursementType: "Medical Assistance",
      appointmentDate: "Oct 18, 2025",
      status: "Disbursed",
      actions: ["view"],
      firstName: "James",
      middleName: "E.",
      lastName: "Reid",
      suffix: "",
      birthDate: "1993-05-11",
      civilStatus: "Single",
      citizenship: "Filipino",
      contactNo: "09381234567",
      email: "james.reid@example.com",
      region: "NCR",
      province: "Metro Manila",
      cityMunicipality: "Taguig City",
      barangay: "Fort Bonifacio",
      streetHouseNo: "Unit 10B Bonifacio Tower",
      fathersFirstName: "Robert",
      fathersMiddleName: "A.",
      fathersLastName: "Reid",
      fathersSuffix: "",
      fathersBirthPlace: "Manila",
      fathersOccupation: "Engineer",
      mothersFirstName: "Lisa",
      mothersMiddleName: "T.",
      mothersLastName: "Reid",
      mothersSuffix: "",
      mothersBirthPlace: "Manila",
      mothersOccupation: "Nurse",
    },
    {
      referrenceNumber: "EDU-2025-222",
      applicantName: "Juan Dela Cruz",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 12, 2025",
      status: "Approved",
      actions: ["view"],
      firstName: "Juan",
      middleName: "P.",
      lastName: "Dela Cruz",
      suffix: "",
      birthDate: "2002-09-30",
      civilStatus: "Single",
      citizenship: "Filipino",
      contactNo: "09551234567",
      email: "juan.delacruz@example.com",
      region: "Region IV-B",
      province: "Oriental Mindoro",
      cityMunicipality: "Calapan City",
      barangay: "Ibaba East",
      streetHouseNo: "Purok 5 Main St",
      fathersFirstName: "Pedro",
      fathersMiddleName: "V.",
      fathersLastName: "Dela Cruz",
      fathersSuffix: "",
      fathersBirthPlace: "Mindoro",
      fathersOccupation: "Fisherman",
      mothersFirstName: "Josefina",
      mothersMiddleName: "Q.",
      mothersLastName: "Dela Cruz",
      mothersSuffix: "",
      mothersBirthPlace: "Mindoro",
      mothersOccupation: "Vendor",
    },
    {
      referrenceNumber: "EDU-2025-233",
      applicantName: "Maria Nada",
      disbursementType: "Educational Assistance",
      appointmentDate: "Oct 12, 2025",
      status: "Approved",
      actions: ["view"],
      firstName: "Maria",
      middleName: "S.",
      lastName: "Nada",
      suffix: "",
      birthDate: "2005-07-18",
      civilStatus: "Single",
      citizenship: "Filipino",
      contactNo: "09481234567",
      email: "maria.nada@example.com",
      region: "Region VII",
      province: "Cebu",
      cityMunicipality: "Cebu City",
      barangay: "Lahug",
      streetHouseNo: "Blk 7 Mango St",
      fathersFirstName: "Andres",
      fathersMiddleName: "M.",
      fathersLastName: "Nada",
      fathersSuffix: "",
      fathersBirthPlace: "Cebu City",
      fathersOccupation: "Tricycle Driver",
      mothersFirstName: "Luzviminda",
      mothersMiddleName: "G.",
      mothersLastName: "Nada",
      mothersSuffix: "",
      mothersBirthPlace: "Cebu City",
      mothersOccupation: "Cook",
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
              {data.map((applicant, index) => (
                <TableRow key={`${applicant.referrenceNumber}-${index}`}>
                  <TableCell>
                    <p>{applicant.referrenceNumber}</p>
                  </TableCell>
                  <TableCell>
                    <p>{applicant.applicantName}</p>
                  </TableCell>
                  <TableCell>
                    <p>{applicant.disbursementType}</p>
                  </TableCell>
                  <TableCell>
                    <p>{applicant.appointmentDate}</p>
                  </TableCell>
                  <TableCell>
                    <p>{applicant.status}</p>
                  </TableCell>
                  <TableCell>
                    <ul className="flex flex-row gap-2">
                      {applicant.actions.map((action) => (
                        <li key={action}>
                          <p
                            onClick={() => {
                              toggleSheet();
                              setActiveApplicant(applicant);
                            }}
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
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
