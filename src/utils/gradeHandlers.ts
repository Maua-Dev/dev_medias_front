export const handleGradeFormat = (grade: number) => {
    return grade.toFixed(1).replace(".", ",")
}

export const handleGradeBoxBackgroundColor = (grade: number) => {
    return grade >= 6 ? "rgba(15, 95, 136, 0.19)" : "rgba(186, 37, 18, 0.19)"
}

export const handleFinalAverageColor = (grade: number) => {
    return grade >= 6 ? "#0F5F88" : "#BA2512"
}

export const handleDeleteBarColor = (grade: number) => {
    return grade >= 6 ? "#0F5F88" : "#BA2512"
}

export const handlePercentageWeight = (value: number, size: number) => {
    const hasOneSub = 3
    const hasTwoSubs = 6
    return size === hasOneSub ? `${100 * (value / (hasOneSub - 1))}%` : `${100 * (value / (hasTwoSubs - 2))}%`
}

export const handlePercentageWeightAll = (value: number) => {
    return `${value}%`
}
