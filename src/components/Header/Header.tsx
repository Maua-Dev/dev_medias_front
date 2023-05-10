import { StyleSheet, Text, TouchableHighlight, View } from "react-native"

type Props = {
    isHomePage: boolean,
}

const Header = ({ isHomePage }: Props) => {

    const handleTitle = () => {
        return isHomePage ?
            "Beatriz Seco Corrêa - 4º ano" :
            "Teoria das estruturas"
    }

    const handleSubtitle = () => {
        return isHomePage ?
            "Engenharia Civil - 5 anos - Verão - Diurno" :
            "ETC314"
    }

    return <View style={styles.content}>
        <View style={styles.bluelayer}>
            <View style={styles.texts}>
                <Text style={styles.title}>{handleTitle()}</Text>
                <Text style={styles.subtitle}>{handleSubtitle()}</Text>
            </View>
            {
                isHomePage ?
                    null :
                    <TouchableHighlight onPress={() => alert('volta pagina')}>
                        <View style={styles.buttonExitContainer}>
                            <Text style={styles.buttonExit}>
                                X
                            </Text>
                        </View>
                    </TouchableHighlight>
            }
        </View>
        <View style={styles.redlayer} />
    </View >
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        height: "100%",
        flex: 0.6,
        flexDirection: "column",
        alignItems: "center",
    },
    bluelayer: {
        flexDirection: "row",
        backgroundColor: "#0F5F88",
        width: "90%",
        height: "100%",
        borderRadius: 20,
        zIndex: 1,
        paddingHorizontal: "3%",
        borderWidth: 1.2,
    },
    texts: {
        flex: 1,
        justifyContent: "center"
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#fff",
        fontSize: 13,
        fontWeight: "bold"
    },
    buttonExitContainer: {
        width: "100%",
        marginRight: "2%",
        height: "100%",
        justifyContent: "center"
    },
    buttonExit: {
        fontSize: 30,
        color: "#fff",
    },
    redlayer: {
        backgroundColor: "#BA2512",
        width: "90%",
        height: "100%",
        zIndex: 0,
        borderRadius: 20,
        position: "absolute",
        top: "3%",
        right: "2.9%"
    }
})

export default Header
