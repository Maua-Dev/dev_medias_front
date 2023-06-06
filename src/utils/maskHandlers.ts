import { createNumberMask } from "react-native-mask-input";

export const maskParemeters = () => {
    return createNumberMask({
        delimiter: '.',
        separator: ',',
        precision: 1,
    });
}
