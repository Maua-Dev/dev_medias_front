import { StyleSheet, View } from "react-native"

type Props = {
    children: string | JSX.Element | JSX.Element[]
}

const MainBox = ({ children }: Props) => {
    return <View style={styles.content}>
        <View style={styles.whiteBox}>
            {children}
        </View>
        <View style={styles.redlayer} />
    </View>
}

const styles = StyleSheet.create({
    content: {
        width: "100%",
        height: "100%",
        flex: 4,
        alignItems: "center",
        marginTop: "4%"
    },
    whiteBox: {
        borderRadius: 20,
        backgroundColor: "#fff",
        height: "100%",
        width: "90%",
        zIndex: 1,
        padding: "3%"
    },
    redlayer: {
        backgroundColor: "#BA2512",
        width: "90%",
        height: "100%",
        zIndex: 0,
        borderRadius: 20,
        position: "absolute",
        top: "1.2%",
        right: "2.9%"
    }
})

export default MainBox
