import { StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";
import ModalBox from "../ModalBox/ModalBox";

type Props = {
    open: boolean;
    close: any;
};

const SubjectWrongModal = ({ open, close }: Props) => {

    return <ModalBox
        headerText="Algo errado?"
        condition={open}
        conditionClose={close}
    >
        <View>
            <Text style={styles.text}>
                A quantidade de notas está incorreta?
            </Text>
            <Text style={styles.text}>
                O plano de ensino está errado?
            </Text>
            <Text style={styles.text}>
                Por favor, entre em contato conosco para podermos melhorar a experiência.
            </Text>
            <Text style={[styles.text, styles.email]}>devmedias.devmaua@gmail.com.</Text>
            <Text style={styles.text}>
                A Dev Community Mauá se isenta da responsabilidade de qualquer prejuízo causado por qualquer erro ou imprecisão no cálculo das médias.
            </Text>
        </View>
    </ModalBox>
};

const styles = StyleSheet.create({
    text: {
        fontSize: getFontSize(16),
        marginBottom: "5%",
        textAlign: "center"
    },
    emailContainer: {
        marginTop: "2%",
    },
    email: {
        color: "#BA2512",
        fontSize: getFontSize(17),
        fontWeight: "bold"
    }
})

export default SubjectWrongModal;
