import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";

const CreationSubjectCard = () => {
    return <View style={styles.content}>
        <View style={styles.gradeBox}>
            <Text style={styles.grade}>
                <MaterialIcons name="add-circle" size={getFontSize(26)} color="#0F5F88" />
            </Text>
        </View>
        <View style={styles.subjectBox}>
            <Text style={styles.subjectTitle}>Adicione sua matéria</Text>
        </View>
    </View>
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: "1%"
    },
    gradeBox: {
        aspectRatio: 1,
        width: "17%",
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        borderColor: "#0F5F88",
        borderWidth: 1
    },
    grade: {
        fontSize: getFontSize(20),
        fontWeight: "bold"
    },
    subjectBox: {
        marginLeft: "2%",
    },
    subjectTitle: {
        color: "#0F5F88",
        fontWeight: "bold",
        fontSize: getFontSize(16)
    },
})

export default CreationSubjectCard
