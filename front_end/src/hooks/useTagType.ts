export default (index: number) => {
    return !index ? 'primary' : index == 1 ? 'success' : 'danger'
}