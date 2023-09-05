import React, { useContext, useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { SubjectContext } from "../../contexts/subjectContext";
import { getFontSize } from "../../utils/fontSizeHandlers";
import FinalAverage from "../FinalAverage/FinalAverage";
import Item from "../Item/Item";
import SubjectWrongModal from "../SubjectWrongModal/SubjectWrongModal";
import TargetSubjectModal from "../TargetSubjectModal/TargetSubjectModal";

const windowHeight = Dimensions.get('window').height;

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
    generated: boolean,
}

const GradesBox = ({ isConfiguring, setIsConfiguring }: Props) => {
    const { actualSubject } = useContext(SubjectContext)
    const [grades, setGrades] = useState<IGrade[]>([])
    const [assignments, setAssignments] = useState<IGrade[]>([])
    const [openWrongSubjectModal, setOpenWrongSubjectModal] = useState<boolean>(false);

    useEffect(() => {
        if (actualSubject) {
            let newActualSubjectsExams = actualSubject?.exams.map((exam) => {
                return {
                    id: exam!.name,
                    title: exam!.name,
                    value: exam!.value,
                    isExam: true,
                    empty: false,
                    generated: exam?.generated
                }
            })
            setGrades([...newActualSubjectsExams!])

            let newActualSubjectsAssignments = actualSubject?.assignments.map((assignment) => {
                return {
                    id: assignment!.name,
                    title: assignment!.name,
                    value: assignment!.value,
                    isExam: false,
                    empty: false,
                    generated: assignment?.generated
                }
            })
            setAssignments([...newActualSubjectsAssignments!])
        }

    }, [actualSubject, actualSubject?.exams, actualSubject?.assignments])


    const createRows = (data: { id: string, title: string, value: number, isExam: boolean, empty: boolean, generated: boolean }[], columns: number) => {
        const rows = Math.floor(data.length / columns)
        let lastRowElements = data.length - (rows * columns)
        while (lastRowElements !== columns && lastRowElements !== 0) {
            data.push({
                id: `empty-${lastRowElements}`,
                title: `empty-${lastRowElements}`,
                value: -1,
                isExam: false,
                empty: true,
                generated: false
            })

            lastRowElements += 1
        }

        return data
    }

    return <View style={styles.content}>
        <View style={styles.subareas}>
            <View>
                <Text style={styles.title}>Provas</Text>
                <Pressable onPress={() => setOpenWrongSubjectModal(true)} style={{ position: "absolute", right: "3%", paddingBottom: 30, paddingLeft: 30 }} hitSlop={{ top: 50, left: 50, right: 50, bottom: 50 }}>
                    <View>
                        <Icon name="exclamation" size={getFontSize(14)} color="#BA2512" />
                    </View>
                </Pressable>
            </View>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={createRows(grades, 3)}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }: { item: IGrade }) => {
                    return (<Item key={item.id} code={item.id} value={item.value} isExam={item.isExam} title={item.title} isEmpty={item.empty} generated={item.generated} />)
                }}
            />
        </View>
        <View style={styles.subareas}>
            <Text style={styles.title}>Trabalhos</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={createRows(assignments, 3)}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }: { item: IGrade }) => {
                    return (<Item key={item.id} code={item.id} isExam={item.isExam} value={item.value} title={item.title} isEmpty={item.empty} generated={item.generated} />)
                }}
            />
        </View>
        <FinalAverage finalAverage={actualSubject?.average ? actualSubject!.average : 0} />
        <TargetSubjectModal key={actualSubject?.code} subjectDetails={actualSubject} isConfiguring={isConfiguring} setIsConfiguring={setIsConfiguring} />
        <SubjectWrongModal open={openWrongSubjectModal} close={() => setOpenWrongSubjectModal(false)} />
    </View>
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        paddingBottom: windowHeight * 0.05,
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
