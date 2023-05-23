'use client'
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react'
import {subjectsContainer, Registry} from '../@clean/shared/infra/containers/subjectsContainer'

import { SaveSubjectUsecase } from '../@clean/modules/subject/usecases/saveSubjectUsecase'
import { GetSubjectsUsecase } from '../@clean/modules/subject/usecases/getSubjectsUsecase'
import { DeleteSubjectUsecase } from '../@clean/modules/subject/usecases/deleteSubjectUsecase'
import { Subject } from '../@clean/shared/domain/entities/subject'


export type SubjectContextType = {
    subjects: {};
    saveSubject: (subject: Subject) => Promise<void>;
    getSubjects: () => Promise<void>;
    deleteSubject: (subject: Subject) => Promise<void>;
}

const defaultSubjectContext: SubjectContextType = {
    subjects: [],
    saveSubject: async (subject: Subject) => {},
    getSubjects: async () => {},
    deleteSubject: async (subject: Subject) => {},
}

const SubjectContext = createContext<SubjectContextType>(defaultSubjectContext);

const getSubjectsUsecase = subjectsContainer.get<GetSubjectsUsecase>(Registry.GetSubjectsUsecase)
const saveSubjectUsecase = subjectsContainer.get<SaveSubjectUsecase>(Registry.SaveSubjectUsecase)
const deleteSubjectUsecase = subjectsContainer.get<DeleteSubjectUsecase>(Registry.DeleteSubjectUsecase)

export function SubjectProvider({children}: PropsWithChildren) {
    const [subjects, setSubjects] = useState<{}>({})

    useEffect(() => {
        getSubjects()
    }, [])

    async function getSubjects() {
        const subjects = await getSubjectsUsecase.execute()
        setSubjects(subjects)
    }

    async function saveSubject(subject: Subject) {
        await saveSubjectUsecase.execute(subject.code, subject)
        await getSubjects()
    }

    async function deleteSubject(subject: Subject) {
        await deleteSubjectUsecase.execute(subject.code)
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