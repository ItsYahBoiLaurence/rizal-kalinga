import type { ApplicantType } from '@/types/applicant'
import { create } from 'zustand'

type ApplicantState = {
    isSheetOpen: boolean
    selectedApplicant: null | ApplicantType
}

type ApplicantActions = {
    toggleSheet: () => void
    setActiveApplicant: (applicant: ApplicantType)=> void

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
    setActiveApplicant: (applicant)=>{
        set({
           selectedApplicant: applicant
        })
    }
}))