import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getFontSize } from "../../utils/fontSizeHandlers";
import ModalBox from "../ModalBox/ModalBox";

const InitialModal = () => {

    const [openModal, setOpenModal] = useState(true);

    return <ModalBox
        headerText="Aviso importante!"
        condition={openModal}
        conditionClose={() => setOpenModal(false)}
    >
        <View>
            <Text style={styles.text}>
                Por favor, sempre verifique se a quantidade de notas e os pesos delas estão corretos e de acordo com o plano de ensino.
            </Text>
            <Text style={styles.text}>
                Caso não esteja, entre em contato conosco pela aba de contato ou pelo e-mail
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

export default InitialModal;
