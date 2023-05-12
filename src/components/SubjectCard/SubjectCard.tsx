import { StyleSheet, Text, View } from "react-native"

type Props = {
    grade: number,
    title: string,
    subtitle: string
}

const SubjectCard = ({ title, subtitle, grade }: Props) => {

    const handleGradeBoxBackgroundColor = () => {
        return grade >= 6 ? "rgba(15, 95, 136, 0.19)" : "rgba(186, 37, 18, 0.19)"
    }

    const handleGradeFormat = () => {
        return grade.toFixed(1).replace(".", ",")
    }

    return <View style={styles.content}>
        <View style={[styles.gradeBox, { backgroundColor: handleGradeBoxBackgroundColor() }]}>
            <Text style={styles.grade}>{handleGradeFormat()}</Text>
        </View>
        <View style={styles.subjectBox}>
            <Text style={styles.subjectTitle}>{title}</Text>
            <Text style={styles.subjectSubtitle}>{subtitle}</Text>
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
        fontSize: 20,
        fontWeight: "bold"
    },
    subjectBox: {
        marginLeft: "2%",
    },
    subjectTitle: {
        fontSize: 16,
        fontWeight: "bold"
    },
    subjectSubtitle: {
        fontSize: 13,
        fontWeight: "bold"
    }
})

export default SubjectCard
