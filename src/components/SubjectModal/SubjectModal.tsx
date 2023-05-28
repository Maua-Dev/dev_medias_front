import { SetStateAction, useContext, useEffect, useState } from "react"
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

    const { allSubjects, saveSubject } = useContext(SubjectContext)
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

    return <ModalBox headerText="Adicionar Matérias" condition={isAdding} conditionClose={() => setIsAdding(false)}>
        <SelectList
            dropdownItemStyles={{}}
            setSelected={(value: SetStateAction<string | undefined>) => setSelectedCode(value)}
            data={dataFormatted}
            save="key"
            placeholder="Buscar disciplina"
            notFoundText="Disciplina não encontrada"
        />
        <Button action={() => saveSubject(select)}>Selecionar</Button>

    </ModalBox>
}


export default SubjectModal
