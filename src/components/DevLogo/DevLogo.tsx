import { Image, StyleSheet, View } from "react-native"
import logo from "../../../assets/logo.png"
import { LinkInstagram } from "./LinkInstagram"

const DevLogo = () => {
    return <View style={styles.content}>
        <LinkInstagram url="https://www.instagram.com/devcommunitymaua/">
            <Image source={logo} style={styles.image} />
        </LinkInstagram>
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
