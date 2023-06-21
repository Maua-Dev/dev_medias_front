import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Subject } from "../../../@clean/shared/domain/entities/subject";

export type propsNavigationStack = {
    MainPage: undefined
    InputGraduationTests: undefined
}

export type propsStack = NativeStackNavigationProp<propsNavigationStack>
