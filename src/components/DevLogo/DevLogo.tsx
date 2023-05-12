import { Image, StyleSheet, View } from "react-native"
import logo from "../../../assets/logo.png"

const DevLogo = () => {
    return <View style={styles.content}>
        <Image source={logo} style={styles.image} />
    </View>
}

const styles = StyleSheet.create({
    content: {
        marginVertical: "5%",
        marginHorizontal: "25%",
        flexDirection: "column",
        alignItems: "center",
        flex: 0.5,
    },
    image: {
        resizeMode: "contain",
        height: "100%"
    }
})

export default DevLogo
