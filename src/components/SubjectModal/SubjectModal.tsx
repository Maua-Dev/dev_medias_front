import { MaterialIcons } from "@expo/vector-icons"
import { SetStateAction, useContext, useEffect, useState } from "react"
import { Modal, Pressable, StyleSheet, Text, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { SubjectContext } from "../../contexts/subjectContext"
import { getFontSize } from "../../utils/fontSizeHandlers"
import Button from "../Button/Button"

type Props = {
    isAdding: boolean,
    setIsAdding: any
}

const SubjectModal = ({ isAdding, setIsAdding }: Props) => {

    const { allSubjects, saveSubject } = useContext(SubjectContext)

    type Item = {
        key: string;
        value: string
    }

    const [selectedCode, setSelectedCode] = useState<string>()
    const [dataFormatted, setDataFormatted] = useState<any>({ key: '0', value: 'a' })
    const [select, setSelect] = useState<any>()

    useEffect(() => {
        const requestData = async () => {
            const subjectsFormatToList: Item[] = allSubjects.map(item => {
                return {
                    key: item.code,
                    value: `${item.code} - ${item.name}`
                }
            })

            setDataFormatted(subjectsFormatToList)
        }

        requestData()
    }, [allSubjects])


    useEffect(() => {
        const handleChoice = async () => {
            allSubjects.map(item => {
                if (item.code === selectedCode) {
                    setSelect(item)
                }
            })
        }

        handleChoice()
    }, [selectedCode])

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
                        <View style={styles.modalPosition}>
                            <SelectList
                                boxStyles={{ width: "90%" }}
                                dropdownStyles={{ width: "90%" }}
                                dropdownItemStyles={{}}
                                setSelected={(value: SetStateAction<string | undefined>) => setSelectedCode(value)}
                                data={dataFormatted}
                                save="key"
                                placeholder="Buscar disciplina"
                                notFoundText="Disciplina não encontrada"
                            />
                        </View>
                        <Button action={() => saveSubject(select)}>Selecionar</Button>
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
        width: "100%",
        marginHorizontal: "5%"
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

export default SubjectModal
