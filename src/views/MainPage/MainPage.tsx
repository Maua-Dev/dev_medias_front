import { ScrollView } from "react-native"
import DevLogo from "../../components/DevLogo/DevLogo"
import Header from "../../components/Header/Header"
import MainBox from "../../components/MainBox/MainBox"
import SubjectCard from "../../components/SubjectCard/SubjectCard"

const MainPage = () => {
    return <>
        <Header isHomePage={true} />
        <MainBox>
            <ScrollView>
                <SubjectCard title={"Empreendedorismo e Gestão"} subtitle={"EFH113 - Diurno - Anual"} grade={2} />
                <SubjectCard title={"Urbanismo"} subtitle={"ETC102 - Diurno - Anual"} grade={7} />
                <SubjectCard title={"Projeto de Rodovias e Vias Urbanas"} subtitle={"ETC215 - Noturno - Anual"} grade={2} />
                <SubjectCard title={"Teoria das Estruturas"} subtitle={"ETC314 - Diruno - Anual - DP"} grade={2} />
                <SubjectCard title={"Estruturas de Concreto"} subtitle={"ETC323 - Diurno - Anual"} grade={2} />
                <SubjectCard title={"Estruturas Metálicas e de Madeiras"} subtitle={"ETC326 - Diurno - Anual"} grade={2} />
                <SubjectCard title={"Fenômeno de Transporte"} subtitle={"ETC411 - Diurno - Anual - DP"} grade={2} />
                <SubjectCard title={"Hidráulica"} subtitle={"ETC413 - Noturno - Anual"} grade={2} />
                <SubjectCard title={"Instalações Prediais Hidráulicas"} subtitle={"ETC415 - Diurno - Anual"} grade={2} />
                <SubjectCard title={"Fundações"} subtitle={"ETC510 - Noturno - Anual"} grade={2} />
            </ScrollView>
        </MainBox>
        <DevLogo />
    </>
}


export default MainPage
