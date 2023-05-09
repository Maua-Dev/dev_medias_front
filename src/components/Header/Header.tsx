import { StyleSheet, Text, View } from "react-native"

const Header = () => {
    return <View style={styles.content}>
        <View style={styles.bluelayer}>
            <Text style={styles.mainInfosStudent}>Beatriz Seco Corrêa - 4º ano</Text>
            <Text style={styles.infosStudent}>Engenharia Civil - 5 anos - Verão - Diurno</Text>
        </View>
        <View style={styles.redlayer} />
    </View >
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center"
    },
    bluelayer: {
        backgroundColor: "#0F5F88",
        width: "90%",
        height: "12%",
        borderRadius: 20,
        zIndex: 1,
        paddingHorizontal: "3%",
        paddingVertical: "6%",
        borderWidth: 1.2,
    },
    mainInfosStudent: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    infosStudent: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold"
    },
    redlayer: {
        backgroundColor: "#BA2512",
        width: "90%",
        height: "12%",
        borderRadius: 20,
        position: "absolute",
        top: "1%",
        right: "3.5%"
    }
})

export default Header
