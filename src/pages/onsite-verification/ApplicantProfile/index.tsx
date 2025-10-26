import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useApplicantStore } from "@/store/applicantStore";
import { useForm } from "react-hook-form";

export default function ApplicantProfile() {
  const applicant_information: { fieldLabel: string; fieldKey: string }[] = [
    { fieldLabel: "First Name", fieldKey: "firstName" },
    { fieldLabel: "Middle Name", fieldKey: "middleName" },
    { fieldLabel: "Last Name", fieldKey: "lastName" },
    { fieldLabel: "Suffix", fieldKey: "suffix" },
    { fieldLabel: "Birth Date", fieldKey: "birthdate" },
    { fieldLabel: "Civil Status", fieldKey: "civilStatus" },
    { fieldLabel: "Citizenship", fieldKey: "citizenship" },
    { fieldLabel: "Contact Number", fieldKey: "contactNo" },
    { fieldLabel: "Email Address", fieldKey: "email" },
  ];

  const address_information: { fieldLabel: string; fieldKey: string }[] = [
    { fieldLabel: "Region", fieldKey: "region" },
    { fieldLabel: "Province", fieldKey: "province" },
    { fieldLabel: "City / Municipality", fieldKey: "cityMunicipality" },
    { fieldLabel: "Barangay", fieldKey: "barangay" },
    { fieldLabel: "Street / House No.", fieldKey: "streetHouseNo" },
  ];

  const { register, control } = useForm();

  const { isSheetOpen, toggleSheet } = useApplicantStore();
  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetContent className="sm:max-w-2xl">
        <SheetHeader className="primaryBackground">
          <SheetTitle className="text-white">Applicant Details</SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>
        <div className="px-5">
          <p className="text-xs text-right">
            Referrence No.:
            <span className="text-blue-800 font-bold"> Med-2025-028</span>
          </p>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-lg ">Application Information</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <FieldGroup className="grid grid-cols-4 gap-2">
              {applicant_information.map((field) => (
                <Field className="gap-1" key={field.fieldKey}>
                  <FieldLabel>{field.fieldLabel}</FieldLabel>
                  <Input {...register(field.fieldKey)} className="uppercase" />
                </Field>
              ))}
            </FieldGroup>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-lg ">Address Information</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <FieldGroup className="grid grid-cols-4 gap-2">
              {address_information.map((field) => (
                <Field className="gap-1" key={field.fieldKey}>
                  <FieldLabel>{field.fieldLabel}</FieldLabel>
                  <Input {...register(field.fieldKey)} className="uppercase" />
                </Field>
              ))}
            </FieldGroup>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-lg ">Address Information</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <FieldGroup className="grid grid-cols-4 gap-2">
              {address_information.map((field) => (
                <Field className="gap-1" key={field.fieldKey}>
                  <FieldLabel>{field.fieldLabel}</FieldLabel>
                  <Input {...register(field.fieldKey)} className="uppercase" />
                </Field>
              ))}
            </FieldGroup>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
