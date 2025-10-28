import { supabase } from '@/lib/supabase'
import type { TFields } from '@/pages/onsite-verification/ApplicantProfile'
import type { ApplicantType } from '@/types/applicant'
import type { PostgrestError, PostgrestSingleResponse } from '@supabase/supabase-js'
import { create } from 'zustand'

type ApplicantState = {
    isSheetOpen: boolean
    selectedApplicant: null | ApplicantType
}

type ApplicantActions = {
    toggleSheet: () => void
    setActiveApplicant: (applicant: ApplicantType) => void
    submitForms:(data: TFields) => Promise<{ supabaseData: any[] | null; error: PostgrestError | null; }>
}

type ApplicantStoreType = ApplicantState & ApplicantActions

export const useApplicantStore = create<ApplicantStoreType>((set, get) => ({
    isSheetOpen: false,
    selectedApplicant: null,
    toggleSheet: () => {
        const open = get().isSheetOpen
        set({
            isSheetOpen: !open
        })
    },
    setActiveApplicant: (applicant) => {
        set({
            selectedApplicant: applicant
        })
    },
    submitForms: async (data) => {
        const {data: supabaseData, error} = await supabase.from('users').insert([{
            firstName: data.firstName,
            middleName: data.middleName,
            lastName: data.lastName,
            suffix: data.suffix,
            civilStatus: data.civilStatus,
            citizenship: data.citizenship,
            contactNo: data.contactNo,
            email: data.email,
            region: data.region,
            province: data.province,
            cityMunicipality: data.cityMunicipality,
            barangay: data.barangay,
            streetHouseNo: data.streetHouseNo,
            fathersFirstName: data.fathersFirstName,
            fathersMiddleName: data.fathersMiddleName,
            fathersLastName: data.fathersLastName,
            fathersSuffix: data.fathersSuffix,
            fathersBirthPlace: data.fathersBirthPlace,
            fathersOccupation: data.fathersOccupation,
            mothersFirstName: data.mothersFirstName,
            mothersMiddleName: data.mothersMiddleName,
            mothersLastName: data.mothersLastName,
            mothersSuffix: data.mothersSuffix,
            mothersBirthPlace: data.mothersBirthPlace,
            mothersOccupation: data.mothersOccupation,
            b64fp: data.b64fp
        }]).select()
        return {supabaseData, error}
    }
}))