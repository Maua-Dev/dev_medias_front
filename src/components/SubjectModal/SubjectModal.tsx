import { SetStateAction, useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { SubjectContext } from "../../contexts/subjectContext"
import Button from "../Button/Button"
import ModalBox from "../ModalBox/ModalBox"

type Props = {
    isAdding: boolean,
    setIsAdding: any
}

type Item = {
    key: string;
    value: string
}

const SubjectModal = ({ isAdding, setIsAdding }: Props) => {

    const { allSubjectsWithoutStudentSubjects, saveSubject } = useContext(SubjectContext)
    const [selectedCode, setSelectedCode] = useState<string>()
    const [dataFormatted, setDataFormatted] = useState<any>({ key: '0', value: 'a' })
    const [select, setSelect] = useState<any>()

    useEffect(() => {
        const requestData = async () => {
            const subjectsFormatToList: Item[] = allSubjectsWithoutStudentSubjects.map(item => {
                return {
                    key: item.code,
                    value: `${item.code} - ${item.name}`
                }
            })

            setDataFormatted(subjectsFormatToList)
        }

        requestData()
    }, [allSubjectsWithoutStudentSubjects])


    useEffect(() => {
        const handleChoice = async () => {
            allSubjectsWithoutStudentSubjects.map(item => {
                if (item.code === selectedCode) {
                    setSelect(item)
                }
            })
        }

        handleChoice()
    }, [selectedCode])

    return <ModalBox headerText="Adicionar Matérias" condition={isAdding} conditionClose={() => setIsAdding(false)}>
        <SelectList
            boxStyles={{ borderRadius: 0 }}
            dropdownStyles={{ marginTop: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopWidth: 0 }}
            setSelected={(value: SetStateAction<string | undefined>) => setSelectedCode(value)}
            data={dataFormatted}
            save="key"
            placeholder="Buscar disciplina"
            notFoundText="Disciplina não encontrada"
        />
        <View style={styles.buttonPosition}>
            <Button action={() => saveSubject(select)}>Selecionar</Button>
        </View>

    </ModalBox>
}

const styles = StyleSheet.create({
    buttonPosition: {
        marginTop: "4%"
    }
})

export default SubjectModal
