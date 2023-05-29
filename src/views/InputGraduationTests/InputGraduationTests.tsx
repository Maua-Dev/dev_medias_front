import { ScrollView, StyleSheet, View } from "react-native"
import Button from "../../components/Button/Button"
import DevLogo from "../../components/DevLogo/DevLogo"
import FinalAverage from "../../components/FinalAverage/FinalAverage"
import GradesBox from "../../components/GradesBox/GradesBox"
import Header from "../../components/Header/Header"
import MainBox from "../../components/MainBox/MainBox"

const InputGraduationTests = () => {
    return <>
        <Header isHomePage={false} />
        <MainBox>
            <ScrollView>
                <GradesBox />
                <FinalAverage />
                <View style={styles.buttonPosition}>
                    <Button>Calcular média</Button>
                </View>
            </ScrollView>
        </MainBox>
        <DevLogo />
    </>
}

const styles = StyleSheet.create({
    buttonPosition: {
        marginVertical: "10%"
    }
})

export default InputGraduationTests
