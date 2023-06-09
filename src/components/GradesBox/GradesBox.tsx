import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Subject } from "../../@clean/shared/domain/entities/subject";
import { getFontSize } from "../../utils/fontSizeHandlers";
import FinalAverage from "../FinalAverage/FinalAverage";
import Item from "../Item/Item";
import TargetSubjectModal from "../TargetSubjectModal/TargetSubjectModal";

type RouteParams = {
    subject: Subject;
};

type GradesRouteProp = RouteProp<ParamListBase, string> & {
    params: RouteParams;
};

type Props = {
    isConfiguring: boolean,
    setIsConfiguring: any
}

const GradesBox = ({ isConfiguring, setIsConfiguring }: Props) => {
    interface IGrade {
        id: string,
        title: string,
        isExam: boolean,
        empty: boolean,
    }

    const routeParams = useRoute<GradesRouteProp>()

    const subjectFromParams = routeParams?.params?.subject

    const subjectCode = routeParams?.params?.subject.code

    const grades = subjectFromParams.exams.map(item => {
        return {
            id: subjectCode,
            title: item.name,
            isExam: true,
            empty: false
        }
    })

    const assignments = subjectFromParams.assignments.map(item => {
        return {
            id: subjectCode,
            title: item.name,
            isExam: false,
            empty: false
        }
    })

    const createRows = (data: { id: string, title: string, isExam: boolean, empty: boolean }[], columns: number) => {
        const rows = Math.floor(data.length / columns)
        let lastRowElements = data.length - (rows * columns)
        while (lastRowElements !== columns && lastRowElements !== 0) {
            data.push({
                id: `empty-${lastRowElements}`,
                title: `empty-${lastRowElements}`,
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
                renderItem={({ item }: { item: IGrade }) => <Item code={item.id} isExam={item.isExam} title={item.title} isEmpty={item.empty} />
                }
            />
        </View>
        <View style={styles.subareas}>
            <Text style={styles.title}>Trabalhos</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={createRows(assignments, 3)}
                renderItem={({ item }: { item: IGrade }) => <Item code={item.id} isExam={item.isExam} title={item.title} isEmpty={item.empty ? true : false} />}
            />
        </View>
        <FinalAverage finalAverage={5} />
        <TargetSubjectModal subjectDetails={subjectFromParams} isConfiguring={isConfiguring} setIsConfiguring={setIsConfiguring} />
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
