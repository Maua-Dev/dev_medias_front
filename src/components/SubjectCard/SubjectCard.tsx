import { useNavigation } from "@react-navigation/native";
import { useEffect, useState, useContext } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Subject } from "../../@clean/shared/domain/entities/subject";
import { propsStack } from "../../routes/stack/models";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { handleDeleteBarColor, handleGradeBoxBackgroundColor, handleGradeFormat } from "../../utils/gradeHandlers";
import DeleteButton from "../DeleteButton/DeleteButton";
import { SubjectContext } from "../../contexts/subjectContext";

type Props = {
    list: Subject[],
    subject: Subject
}

const SubjectCard = ({ list, subject }: Props) => {
    const {setActualSubjectCode} = useContext(SubjectContext)
    const navigation = useNavigation<propsStack>()

    // const [press, setPress] = useState<boolean>(false)
    const [longPress, setLongPress] = useState<boolean>(false)

    useEffect(() => {
        setLongPress(false)
    }, [list])

    return <Pressable onLongPress={() => setLongPress(!longPress)} onPress={
            () => {
                setActualSubjectCode(subject.code)
                navigation.navigate('InputGraduationTests')
            }
        }>
        <View style={[styles.content, !longPress ? null : { width: "99%" }]}>
            <View style={[styles.gradeBox, { backgroundColor: handleGradeBoxBackgroundColor(subject.average) }]}>
                <View>
                    {!longPress ?
                        <Text style={styles.grade}>{handleGradeFormat(subject.average)}</Text>
                        :
                        <DeleteButton code={subject.code} />
                    }
                </View>
            </View>
            <View style={styles.subjectBox}>
                <Text style={styles.subjectTitle}>{subject.name}</Text>
                <Text style={styles.subjectSubtitle}>{subject.code}</Text>
            </View>
        </View>
        <View style={longPress ? [styles.secondLayer, { backgroundColor: handleDeleteBarColor(subject.average) }] : null} />
    </Pressable>
}

const styles = StyleSheet.create({
    secondLayer: {
        width: "99%",
        backgroundColor: "red",
        height: "90%",
        zIndex: 0,
        position: "absolute",
        top: "10%",
        left: "1%",
        borderRadius: 10
    },
    content: {
        borderRadius: 10,
        zIndex: 1,
        backgroundColor: "#fff",
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
        fontWeight: "bold",
        fontSize: getFontSize(20)
    },
    subjectBox: {
        marginLeft: "2%",
    },
    subjectTitle: {
        fontWeight: "bold",
        fontSize: getFontSize(16)
    },
    subjectSubtitle: {
        fontWeight: "bold",
        fontSize: getFontSize(13)
    },
    shadowIOS: {
        backgroundColor: "#fff",
        borderRadius: 10,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: '#171717',
        shadowOpacity: 0.2,
        shadowRadius: 1,
    },
    shadowAndroid: {
        shadowColor: '#52006A',
        elevation: 20,
    }
})

export default SubjectCard
