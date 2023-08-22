export const handleGradeFormat = (grade: number) => {
    const gradeFormat = grade ? grade : 0
    return gradeFormat.toFixed(1).replace(".", ",")
}

export const handleGradeBoxBackgroundColor = (grade: number) => {
    return grade >= 6 ? "rgba(15, 95, 136, 0.19)" : "rgba(186, 37, 18, 0.19)"
}

export const handleFinalAverageColor = (grade: number) => {
    return grade >= 6 ? "#0F5F88" : "#BA2512"
}

export const handleGeneratedGradeColors = (grade: string) => {
    const gradeNumber = parseFloat(grade.replace(",", '.'))
    return gradeNumber >= 6 ? "#0F5F88" : "#BA2512"
}

export const handleDeleteBarColor = (grade: number) => {
    return grade >= 6 ? "#0F5F88" : "#BA2512"
}

export const handlePercentageWeight = (value: number, size: number) => {
    const hasOneSub = 3
    const hasTwoSubs = 6
    if (size === hasOneSub) {
        return `${100 * (value / (hasOneSub - 1))}%`
    }
    else if (size === hasTwoSubs) {
        return `${100 * (value / (hasTwoSubs - 2))}%`
    }
    return `${100 * (value / size)}%`;
}

export const handlePercentageWeightAssignment = (value: number, array: any[]) => {
    const data = array.reduce((acc, actual) => { return acc + actual.weight }, 0);
    return `${(value / data) * 100}%`
}

export const handlePercentageWeightAll = (value: number) => {
    return `${value}%`
}
