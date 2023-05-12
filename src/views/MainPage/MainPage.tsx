import { ScrollView } from "react-native"
import DevLogo from "../../components/DevLogo/DevLogo"
import Header from "../../components/Header/Header"
import MainBox from "../../components/MainBox/MainBox"
import SubjectCard from "../../components/SubjectCard/SubjectCard"

const MainPage = () => {

    const response = [
        {
            title: "Empreendedorismo e Gestão",
            subtitle: "EFH113 - Diurno - Anual",
            grade: 2
        },
        {
            title: "Urbanismo",
            subtitle: "ETC102 - Diurno - Anual",
            grade: 7
        },
        {
            title: "Projeto de Rodovias e Vias Urbanas",
            subtitle: "ETC215 - Noturno - Anual",
            grade: 2
        },
        {
            title: "Teoria das Estruturas",
            subtitle: "ETC314 - Diurno - Anual - DP",
            grade: 2
        },
        {
            title: "Estruturas de Concreto",
            subtitle: "ETC323 - Diurno - Anual",
            grade: 2
        },
        {
            title: "Estruturas Metálicas e de Madeiras",
            subtitle: "ETC326 - Diurno - Anual",
            grade: 2
        },
        {
            title: "Fenômeno de Transporte",
            subtitle: "ETC411 - Diurno - Anual - DP",
            grade: 2
        },
        {
            title: "Hidráulica",
            subtitle: "ETC413 - Noturno - Anual",
            grade: 2
        },
        {
            title: "Instalações Prediais Hidráulicas",
            subtitle: "ETC415 - Diurno - Anual",
            grade: 2
        },
        {
            title: "Fundações",
            subtitle: "ETC510 - Noturno - Anual",
            grade: 2
        },
    ]

    return <>
        <Header isHomePage={true} />
        <MainBox>
            <ScrollView>
                {response.map((value, index) => {
                    return <SubjectCard key={index} title={value.title} subtitle={value.subtitle} grade={value.grade} />
                })}
            </ScrollView>
        </MainBox>
        <DevLogo />
    </>
}


export default MainPage
