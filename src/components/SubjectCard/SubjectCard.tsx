import { StyleSheet, Text, View, TouchableOpacity } from "react-native"
import { getFontSize } from "../../utils/fontSizeHandlers"
import { handleGradeBoxBackgroundColor, handleGradeFormat } from "../../utils/gradeHandlers"
import { useNavigation } from "@react-navigation/native"
import { Subject } from "../../@clean/shared/domain/entities/subject"
import { propsStack } from "../../routes/stack/models"

type Props = {
    subject: Subject
}

const SubjectCard = ({ subject }: Props) => {
    const navigation = useNavigation<propsStack>()
    return <TouchableOpacity onPress={
        () => navigation.navigate('InputGraduationTests', 
        { subject }
    )}>
    <View style={styles.content}>
        <View style={[styles.gradeBox, { backgroundColor: handleGradeBoxBackgroundColor(subject.average) }]}>
            <Text style={[styles.grade, { fontSize: getFontSize(20) }]}>{handleGradeFormat(subject.average)}</Text>
        </View>
        <View style={styles.subjectBox}>
            <Text style={[styles.subjectTitle, { fontSize: getFontSize(16) }]}>{subject.name}</Text>
            <Text style={[styles.subjectSubtitle, { fontSize: getFontSize(13) }]}>{subject.code}</Text>
        </View>
    </View>
    </TouchableOpacity>
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
