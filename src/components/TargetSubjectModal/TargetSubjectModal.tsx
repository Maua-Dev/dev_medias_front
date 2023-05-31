import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import MaskInput from "react-native-mask-input";
import { getFontSize } from "../../utils/fontSizeHandlers";
import { maskParemeters } from "../../utils/maskHandlers";
import Button from "../Button/Button";
import ModalBox from "../ModalBox/ModalBox";

type Props = {
    isConfiguring: boolean;
    setIsConfiguring: any;
}

const TargetSubjectModal = ({ isConfiguring, setIsConfiguring }: Props) => {

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
                    <Text style={styles.subtitle}>Provas: 70% Trabalho: 30%</Text>
                </View>
                <View style={styles.subjectInfoContent}>
                    <Text style={styles.infos}>P1: 25% P2: 25% P3: 25% P4: 25%</Text>
                    <Text style={styles.infos}>T1: 25% T2: 25% T3: 25% T4: 25%</Text>
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
