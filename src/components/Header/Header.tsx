import { StyleSheet, Text, TouchableHighlight, View } from "react-native"
import { getFontSize } from "../../utils/fontSizeHandlers"

type Props = {
    isHomePage: boolean,
}

const Header = ({ isHomePage }: Props) => {

    const handleTitle = () => {
        return isHomePage ?
            "Guilherme Fernandes" :
            "Teoria das estruturas"
    }

    const handleSubtitle = () => {
        return isHomePage ?
            "Eng. Civil - 4/5 anos - Diurno - Verão" :
            "ETC314"
    }

    return <View style={styles.content}>
        <View style={styles.bluelayer}>
            <View style={styles.texts}>
                <Text style={[styles.title, { fontSize: getFontSize(22) }]}>{handleTitle()}</Text>
                <Text style={[styles.subtitle, { fontSize: getFontSize(13) }]}>{handleSubtitle()}</Text>
            </View>
            {
                isHomePage ?
                    null :
                    <TouchableHighlight onPress={() => alert('volta pagina')}>
                        <View style={styles.buttonExitContainer}>
                            <Text style={[styles.buttonExit, { fontSize: getFontSize(30) }]}>
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
        fontWeight: "bold",
    },
    subtitle: {
        color: "#fff",
        fontWeight: "bold"
    },
    buttonExitContainer: {
        width: "100%",
        marginRight: "2%",
        height: "100%",
        justifyContent: "center"
    },
    buttonExit: {
        color: "#fff",
    },
    redlayer: {
        backgroundColor: "#BA2512",
        width: "90%",
        height: "100%",
        zIndex: 0,
        borderRadius: 20,
        position: "absolute",
        top: "8%",
        right: "2.9%"
    }
})

export default Header
