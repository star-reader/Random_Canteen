import canteenWriteOutHTML from "@/hooks/canteenWriteOutHTML"
import createInfoWindow from "@/utils/createInfoWindow";
import numberForString from "@/utils/numberForString";

export default (map: any, AMap: any, position: any, name: string, name_obj: string, list: any[], contact: any, phone?: string) => {
    const marker = new AMap.Marker({
        position,
        title: name,
        content: canteenWriteOutHTML[name_obj as keyof object],
        offset: new AMap.Pixel(-13, -50),
    });
    map.add(marker);

    const title = [
        `${name}<span style="font-size:11px;color:#F00;">距离：</span>${numberForString(list, name)}米`,
    ]
    const content = [
        contact,
        `联系方式：${phone ? phone : '暂无'}<br/><a href='http://localhost:5173/detial'>详细信息</a>`,
    ]

    const infoWindow = createInfoWindow(
        title,
        content.join("<br/>"),
        new AMap.Pixel(16, -45), map, AMap
    )

    marker.on("click", () => {
        infoWindow.open(map, marker.getPosition());
    });
}