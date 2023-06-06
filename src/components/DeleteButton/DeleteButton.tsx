import { MaterialIcons } from "@expo/vector-icons";
import { useContext } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SubjectContext } from "../../contexts/subjectContext";
import { getFontSize } from "../../utils/fontSizeHandlers";

type Props = {
    code: string,
}

const DeleteButton = ({ code }: Props) => {

    const { deleteSubject } = useContext(SubjectContext)

    return <View>
        <Pressable onPress={() => deleteSubject(code)} style={styles.buttonContainer}>
            <MaterialIcons name="delete-outline" style={styles.icon} />
        </Pressable>
    </View>
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: "100%",
        aspectRatio: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    icon: {
        fontSize: getFontSize(26)
    }
})

export default DeleteButton
