import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { maskParemeters } from "../../utils/maskHandlers";

type Props = {
    title: string,
    isEmpty: boolean,
}

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
