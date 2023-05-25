import { Modal, Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
    isAdding: boolean,
    setIsAdding: any
}

const SubjectModal = ({ isAdding, setIsAdding }: Props) => {
    return <Modal
        transparent={true}
        visible={isAdding}
        onRequestClose={() => setIsAdding(false)}
    >
        <View style={styles.modalContainer}>
            <View style={styles.popUp}>
                <Text>a</Text>
                <Pressable
                    onPress={() => setIsAdding(false)}
                    style={styles.closeButton}
                >
                    <Text>Fechar</Text>
                </Pressable>
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
    popUp: {
        backgroundColor: "#fff"
    },
    closeButton: {
        backgroundColor: "white",
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
    }
})

export default SubjectModal
