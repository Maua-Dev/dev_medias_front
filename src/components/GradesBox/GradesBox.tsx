import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";

type Props = {
    title: string,
    isEmpty: boolean,
}

const Item = ({ title, isEmpty }: Props) => {

    const [text, setText] = useState('');

    return <View style={isEmpty ? [styles.inputBox, { opacity: 0 }] : styles.inputBox}>
        <Text style={styles.inputTitle}>{title}</Text>
        <TextInput
            style={styles.input}
            defaultValue={text}
            onChangeText={newText => setText(newText)}
            maxLength={4}
            keyboardType="numeric"
        />
    </View>
}

const GradeData = [
    {
        id: '0',
        title: "P1",
        empty: false
    },
    {
        id: '1',
        title: "P2",
        empty: false
    },
    {
        id: '2',
        title: "PSUB1",
        empty: false
    },
    {
        id: '3',
        title: "P3",
        empty: false
    },
    {
        id: '4',
        title: "P4",
        empty: false
    },
    {
        id: '5',
        title: "PSUB2",
        empty: false
    }
]

const AssignmentData = [
    {
        title: 'T1',
        id: 'string',
        empty: false
    },
    {
        id: '1',
        title: "T2",
        empty: false
    },
    {
        id: '2',
        title: "T3",
        empty: false
    },
    {
        id: '3',
        title: "T4",
        empty: false
    }

]

const GradesBox = () => {
    interface IProduct {
        empty: boolean,
        title: string,
        id: string,
    }

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



    return <View style={styles.content}>
        <View style={styles.subareas}>
            <Text style={styles.title}>Provas</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                keyExtractor={(item: IProduct) => item.id}
                data={createRows(GradeData, 3)}
                renderItem={({ item }: { item: IProduct }) => <Item title={item.title} isEmpty={item.empty ? true : false} />
                }
            />
        </View>
        <View style={styles.subareas}>
            <Text style={styles.title}>Trabalhos</Text>
            <FlatList
                numColumns={3}
                scrollEnabled={false}
                data={createRows(AssignmentData, 3)}
                renderItem={({ item }: { item: IProduct }) => <Item title={item.title} isEmpty={item.empty ? true : false} />}
            />
        </View>
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
    }
})

export default GradesBox
