import { ScrollView } from "react-native"
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
                <Button />
            </ScrollView>
        </MainBox>
        <DevLogo />
    </>
}

export default InputGraduationTests
