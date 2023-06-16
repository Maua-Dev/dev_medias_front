import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { Grade } from "../../@clean/shared/domain/entities/grade";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { handlePercentageWeight, handlePercentageWeightAll } from "../../utils/gradeHandlers";
import { maskParemeters } from "../../utils/maskHandlers";
import Button from "../Button/Button";
import ModalBox from "../ModalBox/ModalBox";

type Props = {
    isConfiguring: boolean;
    setIsConfiguring: any;
    subjectDetails: any
}

const TargetSubjectModal = ({ subjectDetails, isConfiguring, setIsConfiguring }: Props) => {
    const [text, setText] = useState<string>('');

    const onChange = (newText: string) => {
        const isValidInput = /^([0-9]|10)(,\d)?$/.test(newText);

        if (isValidInput || newText === '') {
            setText(newText);
        }
    }

    return <View>
        <ModalBox headerText="Configurações da Matéria" condition={isConfiguring} conditionClose={setIsConfiguring}>
            <View style={styles.content}>
                <View style={styles.titleContent}>
                    <Text style={styles.title}>Plano de Ensino:</Text>
                    <Text style={styles.subtitle}>Provas: {handlePercentageWeightAll(subjectDetails?.examWeight)} Trabalho: {handlePercentageWeightAll(subjectDetails?.assignmentWeight)}</Text>
                </View>
                <View style={styles.subjectInfoContent}>
                    <View style={{ flexDirection: "row" }}>
                        {subjectDetails?.exams.map((value: Grade) => {
                            if (!value.name.toUpperCase().includes('SUB'))
                                return <Text style={styles.infos}>{value.name}: {handlePercentageWeight(value.weight, subjectDetails?.exams.length)}</Text>
                        })}
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        {subjectDetails?.assignments.map((value: Grade) => {
                            if (!value.name.toUpperCase().includes('SUB'))
                                return <Text style={styles.infos}>{value.name}: {handlePercentageWeight(value.weight, subjectDetails?.assignments.length)}</Text>
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
                    <Button>Salvar</Button>
                </View>
            </View>
        </ModalBox>
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
        gap: 4
    },
    infos: {
        color: "#505050",
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
