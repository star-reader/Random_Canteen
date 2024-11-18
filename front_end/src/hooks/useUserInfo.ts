export default () => {
    const user = localStorage.getItem('userData')
    if (!user) return
    try {
        return JSON.parse(user)
    } catch (error) {
        return
    }
}