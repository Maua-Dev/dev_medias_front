import React, {useContext, useState, useEffect} from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";
import FinalAverage from "../FinalAverage/FinalAverage";
import Item from "../Item/Item";
import TargetSubjectModal from "../TargetSubjectModal/TargetSubjectModal";
import { SubjectContext } from "../../contexts/subjectContext";

type Props = {
    isConfiguring: boolean,
    setIsConfiguring: any
}

interface IGrade {
    id: string,
    title: string,
    value: number,
    isExam: boolean,
    empty: boolean,
}

const GradesBox = ({ isConfiguring, setIsConfiguring }: Props) => {
    const {actualSubject} = useContext(SubjectContext)
    const [grades, setGrades] = useState<IGrade[]>([])
    const [assignments, setAssignments] = useState<IGrade[]>([])

    useEffect(() => {
        if(actualSubject){
            console.log('actualSubject:', actualSubject)
            let newActualSubjectsExams = actualSubject?.exams.map((exam) => {
                console.log("EXAM:", exam)
                return {
                    id: exam!.name,
                    title: exam!.name,
                    value: exam!.value,
                    isExam: true,
                    empty: false
                }
            })
            setGrades([...newActualSubjectsExams!])
            
            let newActualSubjectsAssignments = actualSubject?.assignments.map((assignment) => {
                return{
                    id: assignment!.name,
                    title: assignment!.name,
                    value: assignment!.value,
                    isExam: false,
                    empty: false
                }
            })
            setAssignments([...newActualSubjectsAssignments!])
        }

    }, [actualSubject])
    

    const createRows = (data: { id: string, title: string, value: number, isExam: boolean, empty: boolean }[], columns: number) => {
        const rows = Math.floor(data.length / columns)
        let lastRowElements = data.length - (rows * columns)
        while (lastRowElements !== columns && lastRowElements !== 0) {
            data.push({
                id: `empty-${lastRowElements}`,
                title: `empty-${lastRowElements}`,
                value: -1,
                isExam: false,
                empty: true,
            })

            lastRowElements += 1
        }

        return data
    }

    return <View style={styles.content}>
        <View style={styles.subareas}>
            <Text style={styles.title}>Provas</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={createRows(grades, 3)}
                renderItem={({ item }: { item: IGrade }) => <Item code={item.id} value={item.value} isExam={item.isExam} title={item.title} isEmpty={item.empty} />
                }
            />
        </View>
        <View style={styles.subareas}>
            <Text style={styles.title}>Trabalhos</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={createRows(assignments, 3)}
                renderItem={({ item }: { item: IGrade }) => <Item code={item.id} isExam={item.isExam} value={item.value} title={item.title} isEmpty={item.empty ? true : false} />}
            />
        </View>
        <FinalAverage finalAverage={actualSubject?.average? actualSubject!.average: 0} />
        <TargetSubjectModal subjectDetails={actualSubject} isConfiguring={isConfiguring} setIsConfiguring={setIsConfiguring} />
    </View>
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
    },
    subareas: {
        marginVertical: "2.5%",
    },
    title: {
        fontSize: getFontSize(20),
        fontWeight: "bold",
        textAlign: "center"
    }
})

export default GradesBox
