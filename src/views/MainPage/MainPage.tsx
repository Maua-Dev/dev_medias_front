import { useContext } from "react"
import { ScrollView } from "react-native"
import CreationSubjectCard from "../../components/CreationSubjectCard/CreationSubjectCard"
import DevLogo from "../../components/DevLogo/DevLogo"
import Header from "../../components/Header/Header"
import MainBox from "../../components/MainBox/MainBox"
import SubjectCard from "../../components/SubjectCard/SubjectCard"
import { SubjectContext } from "../../contexts/subjectContext"

const MainPage = () => {
    const { subjects } = useContext(SubjectContext)
    return <>
        <Header isHomePage={true} />
        <MainBox>
            <ScrollView>
                {subjects.map((value) => {
                    return <SubjectCard key={value.code} list={subjects} subject={value} />
                })}
                <CreationSubjectCard />
            </ScrollView>
        </MainBox>
        <DevLogo />
    </>
}


export default MainPage
