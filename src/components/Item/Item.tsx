import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { SubjectContext } from "../../contexts/subjectContext";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { maskParemeters } from "../../utils/maskHandlers";

type Props = {
    code: string,
    title: string,
    value: number,
    isEmpty: boolean,
    isExam: boolean,
}

const Item = ({ code, title, value, isEmpty, isExam }: Props) => {

    const { setStudentSubjectValue } = useContext(SubjectContext)

    const [text, setText] = useState(value === -1 ? '' : value.toString());

    useEffect(() => {
        setText(value === -1 ? '' : value.toString())
    }, [value])

    const onChange = (newText: string) => {
        const isValidInput = /^([0-9]|10)(,\d)?$/.test(newText);

        if (isValidInput || newText === '') {
            const newValue = newText === '' ? -1 : parseFloat(newText.replace(",", '.'))
            setStudentSubjectValue(title, newValue)
            setText(newText);
        }

    }
    return <View key={code} style={isEmpty ? [styles.inputBox, { opacity: 0 }] : styles.inputBox}>
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

const styles = StyleSheet.create({
    inputBox: {
        height: 70,
        width: "30%",
        flex: 1,
        marginHorizontal: "5%",
        marginVertical: "3%",
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

export default Item
