import { RouteProp, useRoute } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";
import React, { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { Subject } from "../../@clean/shared/domain/entities/subject";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { maskParemeters } from "../../utils/maskHandlers";
import Button from "../Button/Button";
import FinalAverage from "../FinalAverage/FinalAverage";
import TargetSubjectModal from "../TargetSubjectModal/TargetSubjectModal";

type Props = {
    title: string,
    isEmpty: boolean,
}

type RouteParams = {
    subject: Subject;
};

type GradesRouteProp = RouteProp<ParamListBase, string> & {
    params: RouteParams;
};

const Item = ({ title, isEmpty }: Props) => {

    const [text, setText] = useState('');

    const onChange = (newText: string) => {
        const isValidInput = /^([0-9]|10)(,\d)?$/.test(newText);

        if (isValidInput || newText === '') {
            setText(newText);
        }
    }

    return <View style={isEmpty ? [styles.inputBox, { opacity: 0 }] : styles.inputBox}>
        <Text style={styles.inputTitle}>{title}</Text>
        <MaskInput
            style={styles.input}
            value={text}
            editable={!isEmpty ? true : false}
            onChangeText={onChange}
            maxLength={4}
            keyboardType="numeric"
            mask={maskParemeters()}
        />
    </View>
}

const GradesBox = () => {
    interface IProduct {
        empty: boolean,
        title: string,
        id: string,
    }

    const routeParams = useRoute<GradesRouteProp>()

    const subjectFromParams = routeParams?.params?.subject

    const grades = subjectFromParams.exams.map((value, index) => {
        return {
            id: `${index}`,
            title: value.name,
            empty: false
        }
    })

    const assignments = subjectFromParams.assignments.map((value, index) => {
        return {
            id: `${index}`,
            title: value.name,
            empty: false
        }
    })

    const createRows = (data: { id: string, title: string, empty: boolean }[], columns: number) => {
        const rows = Math.floor(data.length / columns)
        let lastRowElements = data.length - (rows * columns)
        while (lastRowElements !== columns && lastRowElements !== 0) {
            data.push({
                id: `empty-${lastRowElements}`,
                title: `empty-${lastRowElements}`,
                empty: true,
            })

            lastRowElements += 1
        }

        return data
    }

    const [isConfiguring, setIsConfiguring] = useState<boolean>(false)

    return <View style={styles.content}>
        <View style={styles.subareas}>
            <Text style={styles.title}>Provas</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={(item: IProduct) => item.id}
                data={createRows(grades, 3)}
                renderItem={({ item }: { item: IProduct }) => <Item title={item.title} isEmpty={item.empty ? true : false} />
                }
            />
        </View>
        <View style={styles.subareas}>
            <Text style={styles.title}>Trabalhos</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={createRows(assignments, 3)}
                renderItem={({ item }: { item: IProduct }) => <Item title={item.title} isEmpty={item.empty ? true : false} />}
            />
        </View>
        <FinalAverage finalAverage={5} />
        <View style={styles.buttonPosition}>
            <Button action={() => alert()}>Calcular média</Button>
            <Button action={() => setIsConfiguring(true)}>Definir meta</Button>
        </View>
        <TargetSubjectModal subjectDetails={subjectFromParams} isConfiguring={isConfiguring} setIsConfiguring={setIsConfiguring} />
    </View>
}

const styles = StyleSheet.create({
    content: {
        height: "100%",
        flex: 1
    },
    subareas: {
        marginVertical: "2.5%",
    },
    title: {
        fontSize: getFontSize(20),
        fontWeight: "bold",
        textAlign: "center"
    },
    inputBox: {
        height: 70,
        width: "30%",
        flex: 1,
        marginHorizontal: "5%",
        marginVertical: "3%",
        justifyContent: "center",
    },
    inputTitle: {
        fontSize: getFontSize(16),
        marginBottom: "4%",
        textAlign: "center",
        fontWeight: "bold"
    },
    input: {
        textAlign: "center",
        borderWidth: 1,
        borderRadius: 7,
        height: "70%",
        fontSize: getFontSize(20)
    },
    buttonPosition: {
        marginVertical: "10%",
        flexDirection: "row",
        justifyContent: "space-around"
    }
})

export default GradesBox
