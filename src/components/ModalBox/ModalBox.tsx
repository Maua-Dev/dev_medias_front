import { Modal, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { getFontSize } from "../../utils/fontSizeHandlers";

type Props = {
    children: string | JSX.Element | JSX.Element[];
    condition: boolean;
    conditionClose: any;
    headerText: string;
}

const ModalBox = ({ headerText, children, condition, conditionClose }: Props) => {

    return <Modal
        animationType="fade"
        transparent={true}
        visible={condition}
        onRequestClose={conditionClose}
    >
        <TouchableWithoutFeedback onPress={() => conditionClose(false)} style={{ backgroundColor: "green" }}>
            <View style={styles.modalContainer}>
                <TouchableWithoutFeedback style={{ width: "100%", alignItems: "center" }}>
                    <View style={styles.modalBackground}>
                        <View style={styles.modalMain}>
                            <View style={styles.modalHeader}>
                                <Text style={styles.textHeader}>{headerText}</Text>
                                <Pressable
                                    onPress={conditionClose}
                                    style={styles.closeButton}
                                >
                                    <Icon name="times" size={getFontSize(26)} color="#fff" />
                                </Pressable>
                            </View>
                            <View style={styles.modalContent}>
                                <View style={styles.modalPosition}>
                                    {children}
                                </View>
                            </View>
                        </View>
                        <View style={styles.redLayer} />
                    </View>
                </TouchableWithoutFeedback>
            </View>


        </TouchableWithoutFeedback>
    </Modal>


}

const styles = StyleSheet.create({
    modalContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%',
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalBackground: {
        width: "85%",
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
        paddingVertical: 20,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderWidth: 1,
        borderColor: "#000",
    },
    modalPosition: {
        paddingHorizontal: "5%",
    },
    redLayer: {
        backgroundColor: "#BA2512",
        width: "100%",
        height: "100%",
        zIndex: 0,
        borderRadius: 20,
        position: "absolute",
        top: "5%",
        left: "1.5%",
        borderWidth: 1,
        borderColor: "#000"
    },
})

export default ModalBox
