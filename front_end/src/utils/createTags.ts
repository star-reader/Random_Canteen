export default (tag: string) => {
    if (!tag) return []
    const f_tag = tag.replace(/，/g, ',')
    return f_tag.split(',')
}