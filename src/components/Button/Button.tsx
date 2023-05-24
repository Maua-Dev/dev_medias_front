import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { getFontSize } from "../../utils/fontSizeHandlers"

const Button = () => {
    return <TouchableOpacity style={styles.content} onPress={() => alert('sem nota ainda otario')}>
        <Text style={styles.button}>
            Calcular média
        </Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        marginTop: "10%",
        marginBottom: "5%",
        alignItems: "center"
    },
    button: {
        textAlign: "center",
        backgroundColor: "#BA2512",
        width: "40%",
        borderRadius: 10,
        overflow: "hidden",
        paddingVertical: "3%",
        fontSize: getFontSize(15),
        color: "#fff",
        fontWeight: "bold"
    }
})

export default Button
