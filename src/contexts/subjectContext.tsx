'use client'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Registry, subjectsContainer } from '../@clean/shared/infra/containers/subjectsContainer'

import { CalculateFinalAverageUsecase } from '../@clean/modules/subject/usecases/calculateFinalAverageUsecase'
import { DeleteStudentSubjectUsecase } from '../@clean/modules/subject/usecases/deleteStudentSubjectUsecase'
import { GetAllSubjectsUsecase } from '../@clean/modules/subject/usecases/getAllSubjectsUsecase'
import { GetAllSubjectsWithoutStudentSubjectsUsecase } from '../@clean/modules/subject/usecases/getAllSubjectsWithoutStudentSubjectsUsecase'
import { GetStudentSubjectsUsecase } from '../@clean/modules/subject/usecases/getStudentSubjectsUsecase'
import { SaveStudentSubjectUsecase } from '../@clean/modules/subject/usecases/saveStudentSubjectUsecase'
import { SetStudentSubjectValueUsecase } from '../@clean/modules/subject/usecases/setStudentSubjectValueUsecase'
import { Subject } from '../@clean/shared/domain/entities/subject'


export type SubjectContextType = {
    subjects: Subject[];
    allSubjects: Subject[];
    allSubjectsWithoutStudentSubjects: Subject[];
    saveSubject: (subject: Subject) => Promise<void>;
    getSubjects: () => Promise<void>;
    getAllSubjects: () => Promise<void>;
    getAllSubjectsWithoutStudentSubjects: () => Promise<void>;
    deleteSubject: (code: string) => Promise<void>;
    setStudentSubjectValue: (isExam: boolean, code: string, name: string, value: number) => Promise<void>;
    calculateFinalAverage: (subject: Subject) => Promise<void>;
}

const defaultSubjectContext: SubjectContextType = {
    subjects: [] as Subject[],
    allSubjects: [] as Subject[],
    allSubjectsWithoutStudentSubjects: [] as Subject[],
    saveSubject: async (subject: Subject) => { },
    getSubjects: async () => { },
    getAllSubjects: async () => { },
    getAllSubjectsWithoutStudentSubjects: async () => { },
    deleteSubject: async (code: string) => { },
    setStudentSubjectValue: async (isExam: boolean, code: string, name: string, value: number) => { },
    calculateFinalAverage: async (subject: Subject) => { }
}

export const SubjectContext = createContext<SubjectContextType>(defaultSubjectContext);

const getStudentSubjectsUsecase = subjectsContainer.get<GetStudentSubjectsUsecase>(Registry.GetStudentSubjectsUsecase)
const getAllSubjectsUsecase = subjectsContainer.get<GetAllSubjectsUsecase>(Registry.GetAllSubjectsUsecase)
const getAllSubjectsWithoutStudentSubjectsUsecase = subjectsContainer.get<GetAllSubjectsWithoutStudentSubjectsUsecase>(Registry.GetAllSubjectsWithoutStudentSubjectsUsecase)
const saveStudentSubjectUsecase = subjectsContainer.get<SaveStudentSubjectUsecase>(Registry.SaveStudentSubjectUsecase)
const deleteStudentSubjectUsecase = subjectsContainer.get<DeleteStudentSubjectUsecase>(Registry.DeleteStudentSubjectUsecase)
const setStudentSubjectUsecase = subjectsContainer.get<SetStudentSubjectValueUsecase>(Registry.SetStudentSubjectValueUsecase)
const calculateFinalAverageUsecase = subjectsContainer.get<CalculateFinalAverageUsecase>(Registry.CalculateFinalAverageUsecase)

export function SubjectProvider({ children }: PropsWithChildren) {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [allSubjects, setAllSubjects] = useState<Subject[]>([])
    const [
        allSubjectsWithoutStudentSubjects,
        setAllSubjectsWithoutStudentSubjects
    ] = useState<Subject[]>([])

    useEffect(() => {
        getSubjects()
        getAllSubjects()
    }, [])

    useEffect(() => {
        getAllSubjectsWithoutStudentSubjects()
    }, [subjects])

    async function getSubjects() {
        const subjects = await getStudentSubjectsUsecase.execute()
        setSubjects(subjects)
    }

    async function getAllSubjects() {
        const allSubjects = await getAllSubjectsUsecase.execute()
        setAllSubjects(allSubjects)
    }

    async function getAllSubjectsWithoutStudentSubjects() {
        const allSubjectsWithoutStudentSubjects = await getAllSubjectsWithoutStudentSubjectsUsecase.execute()
        setAllSubjectsWithoutStudentSubjects(allSubjectsWithoutStudentSubjects)
    }

    async function saveSubject(subject: Subject) {
        await saveStudentSubjectUsecase.execute(subject.code, subject)
        await getSubjects()
    }

    async function deleteSubject(code: string) {
        await deleteStudentSubjectUsecase.execute(code)
        await getSubjects()
    }

    async function setStudentSubjectValue(isExam: boolean, code: string, name: string, value: number) {
        await setStudentSubjectUsecase.execute(isExam, code, name, value)
    }

    async function calculateFinalAverage(subject: Subject) {
        await calculateFinalAverageUsecase.execute(subject)
    }

    return (
        <SubjectContext.Provider value={{
            subjects,
            allSubjects,
            allSubjectsWithoutStudentSubjects,
            saveSubject,
            getSubjects,
            deleteSubject,
            getAllSubjects,
            getAllSubjectsWithoutStudentSubjects,
            setStudentSubjectValue,
            calculateFinalAverage,
        }}>
            {children}
        </SubjectContext.Provider>
    )
}
