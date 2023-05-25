import { useContext, useState } from "react"
import { ScrollView } from "react-native"
import CreationSubjectCard from "../../components/CreationSubjectCard/CreationSubjectCard"
import DevLogo from "../../components/DevLogo/DevLogo"
import Header from "../../components/Header/Header"
import MainBox from "../../components/MainBox/MainBox"
import SubjectCard from "../../components/SubjectCard/SubjectCard"
import { SubjectContext } from "../../contexts/subjectContext"

const MainPage = () => {
    const { subjects } = useContext(SubjectContext)

    const [isAddingSubject, setIsAddingSubject] = useState(false)

    return <>
        <Header isHomePage={true} />
        <MainBox>
            <ScrollView>
                {subjects.map((value, index) => {
                    return <SubjectCard key={index} title={value.name} subtitle={value.code} grade={value.average} />
                })}
                <CreationSubjectCard />
            </ScrollView>
        </MainBox>
        <DevLogo />
    </>
}


export default MainPage
