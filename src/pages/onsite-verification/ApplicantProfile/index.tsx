import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApplicantStore } from "@/store/applicantStore";
import { useState, useEffect } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import FingerPrintScanner from "./FingerPrintScanner";

export type TFields = {
  firstName: string,
  middleName: string,
  lastName: string,
  suffix: string,
  birthdate: string,
  civilStatus: string,
  citizenship: string,
  contactNo: string,
  email: string,
  region: string,
  province: string,
  cityMunicipality: string,
  barangay: string,
  streetHouseNo: string,
  fathersFirstName: string,
  fathersMiddleName: string,
  fathersLastName: string,
  fathersSuffix: string,
  fathersBirthPlace: string,
  fathersOccupation: string,
  mothersFirstName: string,
  mothersMiddleName: string,
  mothersLastName: string,
  mothersSuffix: string,
  mothersBirthPlace: string,
  mothersOccupation: string,
  b64fp: string
}

export default function ApplicantProfile() {
  const [verification, setVerification] = useState<boolean>(false);
  const { selectedApplicant } = useApplicantStore();


  console.log(selectedApplicant);

  const { register, reset, setValue, handleSubmit } = useForm<TFields>({
    defaultValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      suffix: "",
      birthdate: "",
      civilStatus: "",
      citizenship: "",
      contactNo: "",
      email: "",
      region: "",
      province: "",
      cityMunicipality: "",
      barangay: "",
      streetHouseNo: "",
      fathersFirstName: "",
      fathersMiddleName: "",
      fathersLastName: "",
      fathersSuffix: "",
      fathersBirthPlace: "",
      fathersOccupation: "",
      mothersFirstName: "",
      mothersMiddleName: "",
      mothersLastName: "",
      mothersSuffix: "",
      mothersBirthPlace: "",
      mothersOccupation: "",
      b64fp: ""
    },
  });

  useEffect(() => {
    if (selectedApplicant) {
      reset({
        firstName: selectedApplicant.firstName,
        middleName: selectedApplicant.middleName,
        lastName: selectedApplicant.lastName,
        suffix: selectedApplicant.suffix,
        birthdate: selectedApplicant.birthDate,
        civilStatus: selectedApplicant.civilStatus,
        citizenship: selectedApplicant.citizenship,
        contactNo: selectedApplicant.contactNo,
        email: selectedApplicant.email,
        region: selectedApplicant.region,
        province: selectedApplicant.province,
        cityMunicipality: selectedApplicant.cityMunicipality,
        barangay: selectedApplicant.barangay,
        streetHouseNo: selectedApplicant.streetHouseNo,
        fathersFirstName: selectedApplicant.fathersFirstName,
        fathersMiddleName: selectedApplicant.fathersMiddleName,
        fathersLastName: selectedApplicant.fathersLastName,
        fathersSuffix: selectedApplicant.fathersSuffix,
        fathersBirthPlace: selectedApplicant.fathersBirthPlace,
        fathersOccupation: selectedApplicant.fathersOccupation,
        mothersFirstName: selectedApplicant.mothersFirstName,
        mothersMiddleName: selectedApplicant.mothersMiddleName,
        mothersLastName: selectedApplicant.mothersLastName,
        mothersSuffix: selectedApplicant.mothersSuffix,
        mothersBirthPlace: selectedApplicant.mothersBirthPlace,
        mothersOccupation: selectedApplicant.mothersOccupation,
      });
    }
  }, [selectedApplicant, reset]);


  const { isSheetOpen, toggleSheet, submitForms } = useApplicantStore();
  const onsubmit: SubmitHandler<TFields> = (data) => {
    submitForms(data)
    toggleSheet()
  }

  return (
    <Sheet
      open={isSheetOpen}
      onOpenChange={() => {
        toggleSheet();
        setVerification(false);
      }}
    >
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader className="primaryBackground">
          <SheetTitle className="text-white">Applicant Details</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onsubmit)} className="px-5 overflow-auto" id="user-form" >
          {!verification ? (
            <div className="px-5 overflow-auto">
              <p className="text-xs text-right">
                Referrence No.:
                <span className="text-blue-800 font-bold"> {selectedApplicant?.referrenceNumber}</span>
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-lg ">Application Information</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <FieldGroup className="grid grid-cols-4 gap-2">
                  <Field className="gap-1">
                    <FieldLabel>First Name</FieldLabel>
                    <Input {...register("firstName")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Middle Name</FieldLabel>
                    <Input {...register("middleName")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Last Name</FieldLabel>
                    <Input {...register("lastName")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Suffix</FieldLabel>
                    <Input {...register("suffix")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Birthdate</FieldLabel>
                    <Input {...register("birthdate")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Civil Status</FieldLabel>
                    <Input {...register("civilStatus")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Citizenship</FieldLabel>
                    <Input {...register("citizenship")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Contact Number</FieldLabel>
                    <Input {...register("contactNo")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Email</FieldLabel>
                    <Input {...register("email")} className="lowercase" />
                  </Field>
                </FieldGroup>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-lg ">Address Information</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <FieldGroup className="grid grid-cols-4 gap-2">
                  <Field className="gap-1">
                    <FieldLabel>Region</FieldLabel>
                    <Input {...register("region")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Province</FieldLabel>
                    <Input {...register("province")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>City / Municipality</FieldLabel>
                    <Input
                      {...register("cityMunicipality")}
                      className="uppercase"
                    />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Barangay</FieldLabel>
                    <Input {...register("barangay")} className="uppercase" />
                  </Field>
                  <Field className="gap-1">
                    <FieldLabel>Street / House no.</FieldLabel>
                    <Input {...register("streetHouseNo")} className="uppercase" />
                  </Field>
                </FieldGroup>

                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border" />
                  <span className="text-lg ">Family Background</span>
                  <div className="flex-1 h-px bg-border" />
                </div>
                <FieldGroup>
                  <FieldSet>
                    <FieldLabel>Father's Full Name</FieldLabel>
                    <FieldGroup className="grid grid-cols-4 gap-2">
                      <Field>
                        <FieldLabel>First Name</FieldLabel>
                        <Input
                          {...register("fathersFirstName")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Middle Name</FieldLabel>
                        <Input
                          {...register("fathersMiddleName")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Last Name</FieldLabel>
                        <Input
                          {...register("fathersLastName")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Suffix</FieldLabel>
                        <Input
                          {...register("fathersSuffix")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Birthplace</FieldLabel>
                        <Input
                          {...register("fathersBirthPlace")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Occupation</FieldLabel>
                        <Input
                          {...register("fathersOccupation")}
                          className="uppercase"
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>

                  <FieldSet>
                    <FieldLabel>Mother's Full Name</FieldLabel>
                    <FieldGroup className="grid grid-cols-4 gap-2">
                      <Field>
                        <FieldLabel>First Name</FieldLabel>
                        <Input
                          {...register("mothersFirstName")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Middle Name</FieldLabel>
                        <Input
                          {...register("mothersMiddleName")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Last Name</FieldLabel>
                        <Input
                          {...register("mothersLastName")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Suffix</FieldLabel>
                        <Input
                          {...register("mothersSuffix")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Birthplace</FieldLabel>
                        <Input
                          {...register("mothersBirthPlace")}
                          className="uppercase"
                        />
                      </Field>
                      <Field>
                        <FieldLabel>Occupation</FieldLabel>
                        <Input
                          {...register("mothersOccupation")}
                          className="uppercase"
                        />
                      </Field>
                    </FieldGroup>
                  </FieldSet>
                </FieldGroup>
              </div>
            </div>
          ) : (
            <div className="px-5 flex flex-col gap-5 overflow-auto">
              <div className="grid gap-2">
                <p>Name: <span className="font-bold">{selectedApplicant?.firstName} {selectedApplicant?.middleName} {selectedApplicant?.lastName} {selectedApplicant?.suffix} </span> </p>
                <p>Date of Birth: <span className="font-bold">{selectedApplicant?.birthDate} </span> </p>
                <p>Address: <span className="font-bold">{selectedApplicant?.region} {selectedApplicant?.province} {selectedApplicant?.cityMunicipality} {selectedApplicant?.barangay} {selectedApplicant?.streetHouseNo} </span> </p>
                <p>Disbursement Type: <span className="font-bold">{selectedApplicant?.disbursementType} </span> </p>
                <p>Reference No. : <span className="font-bold">{selectedApplicant?.referrenceNumber} </span> </p>
              </div>
              <div>
                <FingerPrintScanner setValue={setValue} />
              </div>
              <div>
                <p>Document Checklist</p>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document Type</TableHead>
                      <TableHead>Attachment</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>Valid Id</TableCell>
                      <TableCell>
                        <Input type="file" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Medical Certificate</TableCell>
                      <TableCell>
                        <Input type="file" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Hospital Bill</TableCell>
                      <TableCell>
                        <Input type="file" />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Prescription</TableCell>
                      <TableCell>
                        <Input type="file" />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </form>
        <SheetFooter>
          {!verification && <Button onClick={() => setVerification(true)}>
            Proceed to Verification
          </Button>}
          {verification && <Button type="submit" form="user-form">
            Submit Data
          </Button>}
          {verification && <Button className="bg-gray-200 hover:bg-gray-300 text-black" onClick={() => setVerification(false)}>Back</Button>}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
