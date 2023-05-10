import { StyleSheet, View } from "react-native"
import DevLogo from "../DevLogo/DevLogo"
import Header from "../Header/Header"
import MainBox from "../MainBox/MainBox"

type Props = {
    main: boolean
}

const Scaffold = ({ main }: Props) => {
    return <View style={styles.content}>
        <Header isHomePage={main} />
        <MainBox>
        </MainBox>
        <DevLogo />
    </View>
}

const styles = StyleSheet.create({
    content: {
        flex: 1
    }
})

export default Scaffold
