export default (title: string[], content: string, offset: number[], map: any, AMap: any) => {
    const closeInfoWindow = () => {
        map.clearInfoWindow()
    }
    const info = document.createElement("div")
    info.className = "custom-info input-card content-window-card"
    info.style.width = "400px"

    const top = document.createElement("div")
    const titleD = document.createElement("div")
    const closeX = document.createElement("img")
    top.className = "info-top"
    titleD.innerHTML = title.join("");
    closeX.src = "https://webapi.amap.com/images/close2.gif"
    closeX.onclick = closeInfoWindow

    top.appendChild(titleD)
    top.appendChild(closeX)
    info.appendChild(top)

    const middle = document.createElement("div")
    middle.className = "info-middle"
    middle.style.backgroundColor = "white"
    middle.innerHTML = content
    info.appendChild(middle)

    const bottom = document.createElement("div")
    bottom.className = "info-bottom"
    bottom.style.position = "relative"
    bottom.style.top = "0px"
    bottom.style.margin = "0 auto"
    const sharp = document.createElement("img")
    sharp.src = "https://webapi.amap.com/images/sharp.png"
    bottom.appendChild(sharp)
    info.appendChild(bottom)

    return new AMap.InfoWindow({
        isCustom: true,
        content: info,
        offset: offset,
    })
}