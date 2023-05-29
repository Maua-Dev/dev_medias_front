import { StyleSheet, Text, TextInput, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";
import Button from "../Button/Button";
import ModalBox from "../ModalBox/ModalBox";

type Props = {
    isConfiguring: boolean;
    setIsConfiguring: any;
}

const TargetSubjectModal = ({ isConfiguring, setIsConfiguring }: Props) => {
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
                    <TextInput style={styles.targetInput} editable={true} />
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
