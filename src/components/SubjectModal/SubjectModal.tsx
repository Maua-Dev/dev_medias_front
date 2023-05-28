import { MaterialIcons } from "@expo/vector-icons"
import { useContext } from "react"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { SubjectContext } from "../../contexts/subjectContext"
import { getFontSize } from "../../utils/fontSizeHandlers"

type Props = {
    isAdding: boolean,
    setIsAdding: any
}

const SubjectModal = ({ isAdding, setIsAdding }: Props) => {

    const { allSubjects } = useContext(SubjectContext)
    return <Modal
        transparent={true}
        visible={isAdding}
        onRequestClose={() => setIsAdding(false)}
    >
        <View style={styles.modalContainer}>
            <View style={styles.modalBackground}>
                <View style={styles.modalMain}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.textHeader}>Adicionar Matérias</Text>
                        <Pressable
                            onPress={() => setIsAdding(false)}
                            style={styles.closeButton}
                        >
                            <MaterialIcons name="close" size={getFontSize(32)} color="#fff" />
                        </Pressable>
                    </View>
                    <View style={styles.modalContent}>
                        <View>{allSubjects.map((item, key) => {
                            return <Text key={key}>{item.code} - {item.name}</Text>
                        })}</View>
                    </View>
                </View>
                <View style={styles.redLayer} />
            </View>
        </View>
    </Modal>
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalBackground: {
        width: "80%",
    },
    modalMain: {
        zIndex: 1,
    },
    modalHeader: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: "#0F5F88",
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#000",
        overflow: "hidden",
        borderBottomWidth: 0,
    },
    textHeader: {
        color: "#fff",
        fontSize: getFontSize(24),
        padding: "4%",
        flex: 1,
        fontWeight: "bold"
    },
    closeButton: {
        padding: "3%",
    },
    modalContent: {
        backgroundColor: "#fff",
        height: 100,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: "#000",
    },
    redLayer: {
        backgroundColor: "#BA2512",
        width: "100%",
        height: "100%",
        zIndex: 0,
        borderRadius: 20,
        position: "absolute",
        top: "8%",
        left: "2.9%",
        borderWidth: 1,
        borderColor: "#000"
    },
})

export default SubjectModal
