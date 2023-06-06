import { MaterialIcons } from "@expo/vector-icons"
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import { ParamListBase } from "@react-navigation/routers"
import { Pressable, StyleSheet, Text, View } from "react-native"
import { Subject } from "../../@clean/shared/domain/entities/subject"
import { getFontSize } from "../../utils/fontSizeHandlers"

type Props = {
    isHomePage: boolean,
}

type RouteParams = {
    subject: Subject;
};

type HeaderRouteProp = RouteProp<ParamListBase, string> & {
    params: RouteParams;
};


const Header = ({ isHomePage }: Props) => {
    const navigation = useNavigation()
    const routeParams = useRoute<HeaderRouteProp>()

    const subject = routeParams?.params?.subject

    const handleTitle = () => {
        return isHomePage ?
            "Bem vindo ao DevMédias!" :
            `${subject.name}`
    }

    const handleSubtitle = () => {
        return isHomePage ?
            "Adicione as suas matérias abaixo" :
            `${subject.code}`
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
                    <Pressable onPress={() => navigation.goBack()}>
                        <View style={styles.buttonExitContainer}>
                            <MaterialIcons name="close" size={getFontSize(32)} color="#fff" />
                        </View>
                    </Pressable>
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
