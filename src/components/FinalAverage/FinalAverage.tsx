import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { handleFinalAverageColor, handleGradeFormat } from "../../utils/gradeHandlers";

type Props = {
    finalAverage: number
}

const FinalAverage = ({ finalAverage }: Props) => {

    useEffect(() => {
        const formatFinalAverage = handleGradeFormat(finalAverage)
        setText(`${formatFinalAverage}`)
    }, [finalAverage])

    const [text, setText] = useState<string>();

    return <View style={styles.content}>
        <View style={styles.subarea}>
            <Text style={styles.title}>Média Final</Text>
            <TextInput
                style={[styles.input, { color: handleFinalAverageColor(finalAverage) }]}
                value={text}
                editable={false}
                maxLength={4}
                keyboardType="numeric"
            />
        </View>
    </View>
}

const styles = StyleSheet.create({
    content: {
        justifyContent: "center",
        flexDirection: "row",
        width: "100%"
    },
    subarea: {
        width: "100%",
        height: 70,
        alignItems: "center"
    },
    title: {
        fontSize: getFontSize(20),
        marginBottom: "2%",
        textAlign: "center",
        fontWeight: "bold",
        width: 120
    },
    input: {
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: getFontSize(20),
        width: "25%",
        height: "70%",
        borderRadius: 7,
        borderWidth: 1,
    }
})

export default FinalAverage
