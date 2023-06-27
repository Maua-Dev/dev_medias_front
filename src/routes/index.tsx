import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Stack from "./stack";

export default function () {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <Stack />
            </NavigationContainer>
        </SafeAreaProvider>
    )
}
