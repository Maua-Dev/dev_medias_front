import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import SpinnerOverlay from 'react-native-loading-spinner-overlay';
import MaskInput from "react-native-mask-input";
import { Grade } from "../../@clean/shared/domain/entities/grade";
import { SubjectContext } from "../../contexts/subjectContext";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { handlePercentageWeight, handlePercentageWeightAll, handlePercentageWeightAssignment } from "../../utils/gradeHandlers";
import { maskParemeters } from "../../utils/maskHandlers";
import Button from "../Button/Button";
import ModalBox from "../ModalBox/ModalBox";

type Props = {
    isConfiguring: boolean;
    setIsConfiguring: any;
    subjectDetails: any
}

const TargetSubjectModal = ({ subjectDetails, isConfiguring, setIsConfiguring }: Props) => {

    const { optimizeGrades, setStudentSubjectValue, actualSubject, isLoading } = useContext(SubjectContext)
    const [text, setText] = useState<string>(subjectDetails ? String(subjectDetails.target) : '');
    const [canClick, setCanClick] = useState<boolean>(false);

    useEffect(() => {
        setText(subjectDetails ? String(subjectDetails.target) : '')
    }, [actualSubject, subjectDetails, actualSubject?.exams, actualSubject?.assignments, actualSubject?.target])

    const onChange = (newText: string) => {
        const isValidInput = /^([0-9]|10)(,\d)?$/.test(newText);

        if (isValidInput || newText === '') {
            setStudentSubjectValue('target', newText === '' ? 0 : parseFloat(newText.replace(",", '.')))
            setText(newText);
        }
    }

    useEffect(() => {
        if (Number.isNaN(parseInt(text)))
            setCanClick(false);
        else {
            setCanClick(true);
        }
    }, [text]);

    return <View>
        <ModalBox headerText="Configurações da Matéria" condition={isConfiguring} conditionClose={setIsConfiguring}>
            <View style={styles.content}>
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Plano de Ensino:</Text>
                    <Text style={styles.subtitle}>Provas: {handlePercentageWeightAll(subjectDetails?.examWeight)} Trabalho: {handlePercentageWeightAll(subjectDetails?.assignmentWeight)}</Text>
                </View>
                <View style={styles.subjectInfoContent}>
                    <View style={styles.gradesContainer}>
                        {subjectDetails?.exams.map((value: Grade) => {
                            if (!value.name.toUpperCase().includes('SUB'))
                                return <Text style={styles.infos}>{value.name}: {handlePercentageWeight(value.weight, subjectDetails?.exams.reduce((a: number,b: any) => a+b.weight,0))}</Text>
                        })}
                    </View>
                    <View style={styles.gradesContainer}>
                        {subjectDetails?.assignments.map((value: Grade) => {
                            if (!value.name.toUpperCase().includes('SUB'))
                                return <Text style={styles.infos}>{value.name}: {handlePercentageWeightAssignment(value.weight, subjectDetails?.assignments)}</Text>
                        })}
                    </View>
                </View>
                <View style={styles.targetContent}>
                    <Text style={styles.title}>Meta Final:</Text>
                    <MaskInput
                        style={styles.targetInput}
                        value={text}
                        editable={true}
                        onChangeText={onChange}
                        maxLength={4}
                        keyboardType="numeric"
                        mask={maskParemeters()}
                    />
                </View>
                <View style={styles.buttonPosition}>
                    <Button isDisabled={!canClick} action={async () => {
                        await optimizeGrades()
                        setIsConfiguring(false)
                    }}>
                        Atingir meta
                    </Button>

                </View>
            </View>
        </ModalBox>
        <SpinnerOverlay visible={isLoading} size={getFontSize(60)} />
    </View>
}

const styles = StyleSheet.create({
    content: {
        gap: 8
    },
    titleContent: {
        gap: 4
    },
    title: {
        fontSize: getFontSize(18),
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: getFontSize(16),
        fontWeight: "bold",
    },
    subjectInfoContent: {
        marginTop: "3%",
        gap: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    gradesContainer: {
        flexDirection: "row",
        maxWidth: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexWrap: "wrap",
    },
    infos: {
        color: "#505050",
        maxWidth: "90%",
        fontWeight: "700",
        paddingHorizontal: "2%",
        fontSize: getFontSize(15)
    },
    targetContent: {
        marginTop: "4%",
        flexDirection: "row",
        alignItems: "center",
        gap: 10
    },
    targetInput: {
        textAlign: "center",
        fontSize: getFontSize(18),
        borderWidth: 1,
        width: "20%",
        height: 40,
        borderRadius: 10
    },
    buttonPosition: {
        marginTop: "4%"
    }
})

export default TargetSubjectModal
