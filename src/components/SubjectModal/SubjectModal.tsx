import { SetStateAction, useContext, useEffect, useState } from "react"
import { StyleSheet, View } from "react-native"
import { SelectList } from "react-native-dropdown-select-list"
import { Subject } from "../../@clean/shared/domain/entities/subject"
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
    const [selectedSubject, setSelectedSubject] = useState<string>()
    const [selectedCode, setSelectCode] = useState<string>()
    const [dataFormatted, setDataFormatted] = useState<Item[]>([{ key: '', value: '' }])
    const [codes, setCodes] = useState<Item[]>([{ key: '', value: '' }])
    const [select, setSelect] = useState<Subject>()

    useEffect(() => {
        const getListSubjectCodes = async () => {
            const codesToList: string[] = allSubjectsWithoutStudentSubjects.reduce((list: string[], actual) => {
                const actualCode = actual.code.substring(0, 3)

                if (!list.includes(actualCode)) {
                    list.push(actualCode)
                }

                return list
            }, [])

            const codeList: Item[] = codesToList.map(value => {
                return {
                    key: value,
                    value
                }
            })
            setCodes(codeList)

            const subjectsFormatToList: Item[] = allSubjectsWithoutStudentSubjects.map(item => {
                return {
                    key: item.code,
                    value: `${item.code} - ${item.name}`
                }
            })
                .filter(item => item.key.includes(selectedCode!))
            setDataFormatted(subjectsFormatToList)
        }

        getListSubjectCodes()
    }, [allSubjectsWithoutStudentSubjects])

    useEffect(() => {
        const subjectsFormatToList: Item[] = allSubjectsWithoutStudentSubjects.map(item => {
            return {
                key: item.code,
                value: `${item.code} - ${item.name}`
            }
        })
            .filter(item => item.key.includes(selectedCode!))
        setDataFormatted(subjectsFormatToList)
    }, [selectedCode])

    useEffect(() => {
        const handleChoice = async () => {
            allSubjectsWithoutStudentSubjects.map(item => {
                if (item.code === selectedSubject) {
                    setSelect(item)
                }
            })
        }

        handleChoice()
    }, [selectedSubject])

    const handleCloseModal = () => {
        setIsAdding(false)
        setSelectCode('')
    }

    return <ModalBox headerText="Adicionar Matérias" condition={isAdding} conditionClose={handleCloseModal}>
        <SelectList
            boxStyles={{ borderRadius: 0 }}
            dropdownStyles={{ marginTop: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopWidth: 0 }}
            setSelected={(value: SetStateAction<string | undefined>) => setSelectCode(value)}
            data={codes}
            save="key"
            placeholder="Buscar código"
            notFoundText="Disciplina não encontrada"
        />
        <SelectList
            boxStyles={{ borderRadius: 0, marginTop: 10 }}
            dropdownStyles={{ marginTop: 0, borderTopRightRadius: 0, borderTopLeftRadius: 0, borderTopWidth: 0 }}
            setSelected={(value: SetStateAction<string | undefined>) => setSelectedSubject(value)}
            data={dataFormatted}
            save="key"
            placeholder="Buscar disciplina"
            notFoundText="Disciplina não encontrada"
        />
        <View style={styles.buttonPosition}>
            <Button action={() => saveSubject(select!)}>Selecionar</Button>
        </View>

    </ModalBox>
}

const styles = StyleSheet.create({
    buttonPosition: {
        marginTop: "4%"
    }
})

export default SubjectModal
