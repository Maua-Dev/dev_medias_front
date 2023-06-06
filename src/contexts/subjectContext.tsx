'use client'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Registry, subjectsContainer } from '../@clean/shared/infra/containers/subjectsContainer'

import { DeleteStudentSubjectUsecase } from '../@clean/modules/subject/usecases/deleteStudentSubjectUsecase'
import { GetAllSubjectsUsecase } from '../@clean/modules/subject/usecases/getAllSubjectsUsecase'
import { GetStudentSubjectsUsecase } from '../@clean/modules/subject/usecases/getStudentSubjectsUsecase'
import { SaveStudentSubjectUsecase } from '../@clean/modules/subject/usecases/saveStudentSubjectUsecase'
import { Subject } from '../@clean/shared/domain/entities/subject'


export type SubjectContextType = {
    subjects: Subject[];
    allSubjects: Subject[];
    saveSubject: (subject: Subject) => Promise<void>;
    getSubjects: () => Promise<void>;
    getAllSubjects: () => Promise<void>;
    deleteSubject: (code: string) => Promise<void>;
}

const defaultSubjectContext: SubjectContextType = {
    subjects: [] as Subject[],
    allSubjects: [] as Subject[],
    saveSubject: async (subject: Subject) => { },
    getSubjects: async () => { },
    getAllSubjects: async () => { },
    deleteSubject: async (code: string) => { },
}

export const SubjectContext = createContext<SubjectContextType>(defaultSubjectContext);

const getStudentSubjectsUsecase = subjectsContainer.get<GetStudentSubjectsUsecase>(Registry.GetStudentSubjectsUsecase)
const getAllSubjectsUsecase = subjectsContainer.get<GetAllSubjectsUsecase>(Registry.GetAllSubjectsUsecase)
const saveStudentSubjectUsecase = subjectsContainer.get<SaveStudentSubjectUsecase>(Registry.SaveStudentSubjectUsecase)
const deleteStudentSubjectUsecase = subjectsContainer.get<DeleteStudentSubjectUsecase>(Registry.DeleteStudentSubjectUsecase)

export function SubjectProvider({ children }: PropsWithChildren) {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [allSubjects, setAllSubjects] = useState<Subject[]>([])

    useEffect(() => {
        getSubjects()
        getAllSubjects()
    }, [])

    async function getSubjects() {
        const subjects = await getStudentSubjectsUsecase.execute()
        setSubjects(subjects)
    }

    async function getAllSubjects() {
        const allSubjects = await getAllSubjectsUsecase.execute()
        setAllSubjects(allSubjects)
    }

    async function saveSubject(subject: Subject) {
        await saveStudentSubjectUsecase.execute(subject.code, subject)
        await getSubjects()
    }

    async function deleteSubject(code: string) {
        await deleteStudentSubjectUsecase.execute(code)
        await getSubjects()
    }

    return (
        <SubjectContext.Provider value={{
            subjects, allSubjects, saveSubject, getSubjects, deleteSubject, getAllSubjects
        }}>
            {children}
        </SubjectContext.Provider>
    )
}
