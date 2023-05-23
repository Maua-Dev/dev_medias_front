'use client'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import {subjectsContainer, Registry} from '../@clean/shared/infra/containers/subjectsContainer'

import { SaveStudentSubjectUsecase } from '../@clean/modules/subject/usecases/saveStudentSubjectUsecase'
import { GetStudentSubjectsUsecase } from '../@clean/modules/subject/usecases/getStudentSubjectsUsecase'
import { DeleteStudentSubjectUsecase } from '../@clean/modules/subject/usecases/deleteStudentSubjectUsecase'
import { Subject } from '../@clean/shared/domain/entities/subject'


export type SubjectContextType = {
    subjects: Subject[];
    saveSubject: (subject: Subject) => Promise<void>;
    getSubjects: () => Promise<void>;
    deleteSubject: (subject: Subject) => Promise<void>;
}

const defaultSubjectContext: SubjectContextType = {
    subjects: [] as Subject[],
    saveSubject: async (subject: Subject) => {},
    getSubjects: async () => {},
    deleteSubject: async (subject: Subject) => {},
}

const SubjectContext = createContext<SubjectContextType>(defaultSubjectContext);

const getStudentSubjectsUsecase = subjectsContainer.get<GetStudentSubjectsUsecase>(Registry.GetStudentSubjectsUsecase)
const saveStudentSubjectUsecase = subjectsContainer.get<SaveStudentSubjectUsecase>(Registry.SaveStudentSubjectUsecase)
const deleteStudentSubjectUsecase = subjectsContainer.get<DeleteStudentSubjectUsecase>(Registry.DeleteStudentSubjectUsecase)

export function SubjectProvider({children}: PropsWithChildren) {
    const [subjects, setSubjects] = useState<Subject[]>([])

    useEffect(() => {
        getSubjects()
    }, [])

    async function getSubjects() {
        const subjects = await getStudentSubjectsUsecase.execute()
        setSubjects(subjects)
    }

    async function saveSubject(subject: Subject) {
        await saveStudentSubjectUsecase.execute(subject.code, subject)
        await getSubjects()
    }

    async function deleteSubject(subject: Subject) {
        await deleteStudentSubjectUsecase.execute(subject.code)
        await getSubjects()
    }

    return (
        <SubjectContext.Provider value={{
            subjects, saveSubject, getSubjects, deleteSubject
        }}>
            {children}
        </SubjectContext.Provider>
    )
}