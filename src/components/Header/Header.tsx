import { RouteProp, useNavigation } from "@react-navigation/native";
import { ParamListBase } from "@react-navigation/routers";
import { useContext } from 'react';
import { Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Subject } from "../../@clean/shared/domain/entities/subject";
import { SubjectContext } from "../../contexts/subjectContext";
import { getFontSize } from "../../utils/fontSizeHandlers";

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
    const { actualSubject } = useContext(SubjectContext)

    const navigation = useNavigation()
    const insets = useSafeAreaInsets();

    const handleTitle = () => {
        return isHomePage ?
            "Bem vindo ao DevMédias!" :
            `${actualSubject?.name ?? ""}`
    }

    const handleSubtitle = () => {
        return isHomePage ?
            "Adicione as suas matérias abaixo" :
            `${actualSubject?.code ?? ""}`
    }

    return <View style={[styles.content, { paddingTop: insets.top }]}>
        <View style={styles.bluelayer}>
            <View style={styles.texts}>
                <Text numberOfLines={2} style={[styles.title, { fontSize: getFontSize(22) }]}>{handleTitle()}</Text>
                <Text numberOfLines={1} style={[styles.subtitle, { fontSize: getFontSize(13) }]}>{handleSubtitle()}</Text>
            </View>
            {
                isHomePage ?
                    null :
                    <Pressable onPress={() => navigation.goBack()}>
                        <View style={styles.buttonExitContainer}>
                            <Icon name="times" size={getFontSize(26)} color="#fff" />
                        </View>
                    </Pressable>
            }
        </View>
        <View style={[styles.redlayer, { paddingTop: insets.top, top: insets.top }]} />
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
        maxWidth: "95%",
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
        marginTop: "1.3%",
        borderRadius: 20,
        position: "absolute",
        right: "2.9%"
    }
})

export default Header
