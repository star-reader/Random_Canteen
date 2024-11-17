export default () => {
    const token = localStorage.getItem('token')
    return `Bearer ${token}`
}