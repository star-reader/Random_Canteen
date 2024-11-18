export default () => {
    const token = localStorage.getItem('token')
    return {
        'authorization': `Bearer ${token}`
    }
}