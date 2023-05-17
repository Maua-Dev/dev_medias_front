import { StyleSheet, Text, TextInput, View } from "react-native"
import { getFontSize } from "../../utils/fontSizeHandlers"

const FinalAverage = () => {
    return <View style={styles.content}>
        <View style={styles.subarea}>
            <Text style={styles.title}>Média Final</Text>
            <TextInput
                style={styles.input}
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
        fontSize: getFontSize(20),
        width: "25%",
        height: "70%",
        borderRadius: 7,
        borderWidth: 1,
    }
})

export default FinalAverage
