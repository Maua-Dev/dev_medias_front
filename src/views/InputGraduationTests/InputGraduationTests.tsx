import { ScrollView } from "react-native"
import DevLogo from "../../components/DevLogo/DevLogo"
import GradesBox from "../../components/GradesBox/GradesBox"
import Header from "../../components/Header/Header"
import MainBox from "../../components/MainBox/MainBox"

const InputGraduationTests = () => {
    
    return <>
        <Header isHomePage={false} />
        <MainBox>
            <ScrollView>
                <GradesBox />
            </ScrollView>
        </MainBox>
        <DevLogo />
    </>
}

export default InputGraduationTests
