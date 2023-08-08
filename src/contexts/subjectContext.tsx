'use client'
import React, { createContext, PropsWithChildren, useEffect, useState } from 'react'
import { Registry, subjectsContainer } from '../@clean/shared/infra/containers/subjectsContainer'

import { CalculateFinalAverageUsecase } from '../@clean/modules/subject/usecases/calculateFinalAverageUsecase'
import { DeleteStudentSubjectUsecase } from '../@clean/modules/subject/usecases/deleteStudentSubjectUsecase'
import { GetAllSubjectsUsecase } from '../@clean/modules/subject/usecases/getAllSubjectsUsecase'
import { GetAllSubjectsWithoutStudentSubjectsUsecase } from '../@clean/modules/subject/usecases/getAllSubjectsWithoutStudentSubjectsUsecase'
import { GetStudentSubjectsUsecase } from '../@clean/modules/subject/usecases/getStudentSubjectsUsecase'
import { GradeOptimizerUsecase } from '../@clean/modules/subject/usecases/gradeOptimizerUsecase'
import { SaveStudentSubjectUsecase } from '../@clean/modules/subject/usecases/saveStudentSubjectUsecase'
import { Subject } from '../@clean/shared/domain/entities/subject'
import { Alert } from 'react-native'


export type SubjectContextType = {
    subjects: Subject[];
    actualSubjectCode: string;
    allSubjects: Subject[];
    allSubjectsWithoutStudentSubjects: Subject[];
    actualSubject: Subject | undefined;
    saveSubject: (subject: Subject) => Promise<void>;
    getSubjects: () => Promise<void>;
    getAllSubjects: () => Promise<void>;
    getAllSubjectsWithoutStudentSubjects: () => Promise<void>;
    deleteSubject: (code: string) => Promise<void>;
    setStudentSubjectValue: (name: string, value: number) => Promise<void>;
    calculateFinalAverage: () => Promise<void>;
    optimizeGrades: () => Promise<void>;
    setActualSubjectCode: (code: string) => void;
}

const defaultSubjectContext: SubjectContextType = {
    subjects: [] as Subject[],
    actualSubjectCode: '',
    allSubjects: [] as Subject[],
    allSubjectsWithoutStudentSubjects: [] as Subject[],
    actualSubject: Subject.createEmptySubject(),
    saveSubject: async (subject: Subject) => { },
    getSubjects: async () => { },
    getAllSubjects: async () => { },
    getAllSubjectsWithoutStudentSubjects: async () => { },
    deleteSubject: async (code: string) => { },
    optimizeGrades: async () => { },
    setStudentSubjectValue: async (name: string, value: number) => { },
    calculateFinalAverage: async () => { },
    setActualSubjectCode: (code: string) => { }
}

export const SubjectContext = createContext<SubjectContextType>(defaultSubjectContext);

const getStudentSubjectsUsecase = subjectsContainer.get<GetStudentSubjectsUsecase>(Registry.GetStudentSubjectsUsecase)
const getAllSubjectsUsecase = subjectsContainer.get<GetAllSubjectsUsecase>(Registry.GetAllSubjectsUsecase)
const getAllSubjectsWithoutStudentSubjectsUsecase = subjectsContainer.get<GetAllSubjectsWithoutStudentSubjectsUsecase>(Registry.GetAllSubjectsWithoutStudentSubjectsUsecase)
const saveStudentSubjectUsecase = subjectsContainer.get<SaveStudentSubjectUsecase>(Registry.SaveStudentSubjectUsecase)
const deleteStudentSubjectUsecase = subjectsContainer.get<DeleteStudentSubjectUsecase>(Registry.DeleteStudentSubjectUsecase)
const calculateFinalAverageUsecase = subjectsContainer.get<CalculateFinalAverageUsecase>(Registry.CalculateFinalAverageUsecase)
const gradeOptimizerUsecase = subjectsContainer.get<GradeOptimizerUsecase>(Registry.GradeOptimizerUsecase)

export function SubjectProvider({ children }: PropsWithChildren) {
    const [subjects, setSubjects] = useState<Subject[]>([])
    const [allSubjects, setAllSubjects] = useState<Subject[]>([])
    const [actualSubjectCode, setActualSubjectCode] = useState<string>('')
    const [actualSubject, setActualSubject] = useState<Subject>()
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

    useEffect(() => {
        if (actualSubjectCode !== '') {
            let subject = subjects.find((subject) => subject.code === actualSubjectCode)
            setActualSubject(subject)
        }

    }, [actualSubjectCode, subjects])

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
        try{
            await saveStudentSubjectUsecase.execute(subject.code, subject)
            await getSubjects()
        }catch (error){
            if (error instanceof Error) {
                Alert.alert(
                    'Ops! Ocorreu um erro...',
                    error.message,
                    [{ text: 'OK'}],
                    { cancelable: false }
                  ); 
            } 
        }
    }

    async function deleteSubject(code: string) {
        await deleteStudentSubjectUsecase.execute(code)
        await getSubjects()
    }

    async function setStudentSubjectValue(name: string, value: number) {
        let oldActualSubject = actualSubject
        if (name === 'target') {
            oldActualSubject!.target = value
        } else {
            oldActualSubject?.exams.map((exam) => exam.name === name ? exam.value = value : '')
            oldActualSubject?.assignments.map((assignment) => assignment.name === name ? assignment.value = value : '')
        }
        setActualSubject(oldActualSubject)
    }

    async function calculateFinalAverage() {
        await calculateFinalAverageUsecase.execute(actualSubject!)
        await getSubjects()
    }

    async function optimizeGrades() {
        try {
            let subjectOptimized = await gradeOptimizerUsecase.execute(actualSubject!)
            await calculateFinalAverageUsecase.execute(subjectOptimized)
            await getSubjects()
            setActualSubjectCode(subjectOptimized.code)
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(
                    'Ops! Ocorreu um erro...',
                    error.message,
                    [{ text: 'OK'}],
                    { cancelable: false }
                  ); 
            } 
        }   
    }

    return (
        <SubjectContext.Provider value={{
            subjects,
            allSubjects,
            allSubjectsWithoutStudentSubjects,
            actualSubject,
            saveSubject,
            getSubjects,
            deleteSubject,
            getAllSubjects,
            getAllSubjectsWithoutStudentSubjects,
            setStudentSubjectValue,
            calculateFinalAverage,
            optimizeGrades,
            actualSubjectCode,
            setActualSubjectCode
        }}>
            {children}
        </SubjectContext.Provider>
    )
}
