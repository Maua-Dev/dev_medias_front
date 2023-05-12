import { StyleSheet, Text, View } from "react-native"
import { getFontSize } from "../../utils/fontSizeHandlers"
import { handleGradeBoxBackgroundColor, handleGradeFormat } from "../../utils/gradeHandlers"

type Props = {
    grade: number,
    title: string,
    subtitle: string
}

const SubjectCard = ({ title, subtitle, grade }: Props) => {
    return <View style={styles.content}>
        <View style={[styles.gradeBox, { backgroundColor: handleGradeBoxBackgroundColor(grade) }]}>
            <Text style={[styles.grade, { fontSize: getFontSize(20) }]}>{handleGradeFormat(grade)}</Text>
        </View>
        <View style={styles.subjectBox}>
            <Text style={[styles.subjectTitle, { fontSize: getFontSize(16) }]}>{title}</Text>
            <Text style={[styles.subjectSubtitle, { fontSize: getFontSize(13) }]}>{subtitle}</Text>
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
    },
    grade: {
        fontWeight: "bold"
    },
    subjectBox: {
        marginLeft: "2%",
    },
    subjectTitle: {
        fontWeight: "bold"
    },
    subjectSubtitle: {
        fontWeight: "bold"
    }
})

export default SubjectCard
