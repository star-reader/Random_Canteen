interface DistanceData {
    string: string,
    number: number
}

export default (globalDistanceList: DistanceData[], str: string) => {
    const item = globalDistanceList.find(item => item.string === str)
    return item ? item.number : null
}