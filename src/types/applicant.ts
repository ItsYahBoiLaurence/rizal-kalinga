export type ApplicantType = {
  referrenceNumber: string
  applicantName: string
  disbursementType: string
  appointmentDate: string
  status:  string
  actions: string[]

  // Personal Info
  firstName: string
  middleName: string
  lastName: string
  suffix: string
  birthDate: string
  civilStatus: string
  citizenship: string
  contactNo: string
  email: string

  // Address
  region: string
  province: string
  cityMunicipality: string
  barangay: string
  streetHouseNo: string

  // Father’s Info
  fathersFirstName: string
  fathersMiddleName: string
  fathersLastName: string
  fathersSuffix: string
  fathersBirthPlace: string
  fathersOccupation: string

  // Mother’s Info
  mothersFirstName: string
  mothersMiddleName: string
  mothersLastName: string
  mothersSuffix: string
  mothersBirthPlace: string
  mothersOccupation: string
}
