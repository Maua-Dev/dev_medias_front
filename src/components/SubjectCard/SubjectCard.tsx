import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { handleGradeBoxBackgroundColor, handleGradeFormat } from "../../utils/gradeHandlers";
import DeleteButton from "../DeleteButton/DeleteButton";

type Props = {
    list: any[],
    grade: number,
    title: string,
    subtitle: string
}

const SubjectCard = ({ list, title, subtitle, grade }: Props) => {

    const [press, setPress] = useState<boolean>(false)
    const [longPress, setLongPress] = useState<boolean>(false)

    useEffect(() => {
        setLongPress(false)
    }, [list])

    return <Pressable onLongPress={() => setLongPress(!longPress)} onPress={() => setPress(!press)}>
        <View style={[styles.content, !longPress ? null : { width: "99%" }]}>
            <View style={[styles.gradeBox, { backgroundColor: handleGradeBoxBackgroundColor(grade) }]}>
                <View>
                    {!longPress ?
                        <Text style={styles.grade}>{handleGradeFormat(grade)}</Text>
                        :
                        <DeleteButton code={subtitle} />
                    }
                </View>
            </View>
            <View style={styles.subjectBox}>
                <Text style={styles.subjectTitle}>{title}</Text>
                <Text style={styles.subjectSubtitle}>{subtitle}</Text>
            </View>
        </View>
        <View style={longPress ? styles.secondLayer : null} />
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
