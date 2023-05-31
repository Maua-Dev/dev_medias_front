import { StyleSheet, Text, TouchableOpacity } from "react-native"
import { getFontSize } from "../../utils/fontSizeHandlers"

const Button = ({ children, action }: any) => {
    return <TouchableOpacity style={styles.content} onPress={action}>
        <Text style={styles.button}>
            {children}
        </Text>
    </TouchableOpacity>
}

const styles = StyleSheet.create({
    content: {
        alignItems: "center",
        justifyContent: "center",
        marginVertical: "5%",
        flex: 1
    },
    button: {
        textAlign: "center",
        flexDirection: "row",
        backgroundColor: "#BA2512",
        paddingTop: 10,
        paddingHorizontal: 20,
        height: 40,
        borderRadius: 10,
        overflow: "hidden",
        paddingVertical: "3%",
        fontSize: getFontSize(15),
        color: "#fff",
        fontWeight: "bold"
    }
})

export default Button
