<template>
    <div class="info">
      <div v-for="(item, index) in distanceList" :key="index">
        <span class="singleName">你距离{{ item.string }}：</span>
        <span class="singleDistance">{{ item.number }}</span>
        <span class="singleDistance">米</span>
      </div>
      <div>
        <span class="singleDistance">距离最近的是</span
        ><span class="nearest">{{ distanceList[0].string }}</span
        ><span>!</span>
      </div>
    </div>
  
    <div id="container"></div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";

let map = null;

var distanceList = ref([
  { string: "芷园", number: null },
  { string: "绿榕园", number: null },
  { string: "西园", number: null },
  { string: "莘园", number: null },
  { string: "荷园", number: null },
  { string: "稻香园", number: null },
]);
let globalDistanceList = [];
const numberForString = (string) => {
  const item = globalDistanceList.find((item) => item.string === string);
  return item ? item.number : null;
};
onMounted(() => {
  AMapLoader.load({
    key: "075d155a8b582433e540decb223d9a1e", // 申请好的Web端开发者Key，首次调用 load 时必填
    version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
    plugins: ["AMap.Geolocation"], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
  })
    .then((AMap) => {
      map = new AMap.Map("container", {
        viewMode: "2D",
        zoom: 17,
        center: [113.357583, 23.15765],
      });

      map.setZooms([16, 19]);
      function lockMapBounds() {
        var bounds = new AMap.Bounds(
          113.378906,
          23.168838,
          113.345119,
          23.15029
        );
        map.setLimitBounds(bounds);
      }
      lockMapBounds();
      //定位
      AMap.plugin("AMap.Geolocation", () => {
        var geolocation = new AMap.Geolocation({
          enableHighAccuracy: true, //是否使用高精度定位，默认:true
          timeout: 10000, //超过10秒后停止定位，默认：5s
          buttonposition: "RB", //定位按钮的停靠位置
          offset: [10, 20], //定位按钮与设置的停靠位置的偏移量，默认：[10, 20]
          zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
        });

        map.addControl(geolocation);
        geolocation.getCurrentPosition((status, result) => {
          if (status == "complete") {
            // console.log(result);
            //创建一个数组，用来保存坐标（顺序为：芷园、绿榕园、西园、莘园、荷园、稻香园）
            var LngLatList = [
              [113.366028, 23.153604],
              [113.354986, 23.156229],
              [113.347286, 23.161231],
              [113.357213, 23.163316],
              [113.367758, 23.160487],
              [113.370245, 23.163324],
            ];

            for (var i = 0; i < 6; i++) {
              var dis = AMap.GeometryUtil.distance(result.position, [
                LngLatList[i][0],
                LngLatList[i][1],
              ]);
              var result00 = Math.round(dis * 100) / 100; //两位小数
              distanceList.value[i].number = result00;
              // console.log(distanceList.value[i].number);
              // console.log("到" + distanceList.value[i].string + "直线距离" + distanceList.value[i].number + "米");//测试用的，不舍得删
            }
            distanceList.value.sort((a, b) => a.number - b.number);
            globalDistanceList = distanceList.value.slice();
            console.log(distanceList.value.slice());
            console.log(globalDistanceList);

            // var distance_zo = numberForString("芷园");
            // var distance_lro = numberForString("绿榕园");
            // console.log(distance_zo);

            //芷园饭堂的标点
            const markerContent_zo =
              `<div class="name">芷园</div>` +
              `<div class="custom-content-marker">
        <img src="../public/dinninghall_img/zo.jpg">
        </div>`;

            var position_zo = new AMap.LngLat(113.366028, 23.153604); //芷园的经纬度
            var marker_zo = new AMap.Marker({
              position: position_zo,
              title: "芷园",
              content: markerContent_zo, //将 html 传给 content
              offset: new AMap.Pixel(-18, -40), //以 icon 的 [center bottom] 为原点
            });
            map.add(marker_zo);

            //鼠标点击marker弹出自定义的信息窗体
            marker_zo.on("click", function () {
              infoWindow_zo.open(map, marker_zo.getPosition());
            });

            //实例化信息窗体
            var title_zo = [];
            title_zo.push(
              '芷园<span style="font-size:11px;color:#F00;">距离：</span>'
            );
            title_zo.push(numberForString("芷园"));
            title_zo.push("米");
            var content_zo = [];
            content_zo.push(
              "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山路483号华南农业大学紫荆路(近游泳池)"
            );
            content_zo.push("联系方式：13798079072");
            // content.push(
            //   "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
            // );
            var infoWindow_zo = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: createInfoWindow(title_zo, content_zo.join("<br/>")),
              offset: new AMap.Pixel(16, -45),
            });

            //构建自定义信息窗体
            function createInfoWindow(title_zo, content_zo) {
              var info_zo = document.createElement("div");
              info_zo.className = "custom-info input-card content-window-card";

              //可以通过下面的方式修改自定义窗体的宽高
              info_zo.style.width = "400px";
              // 定义顶部标题
              var top_zo = document.createElement("div");
              var titleD_zo = document.createElement("div");
              var closeX_zo = document.createElement("img");
              top_zo.className = "info-top";
              titleD_zo.innerHTML = title_zo[0] + title_zo[1] + title_zo[2];
              closeX_zo.src = "https://webapi.amap.com/images/close2.gif";
              closeX_zo.onclick = closeInfoWindow;

              top_zo.appendChild(titleD_zo);
              top_zo.appendChild(closeX_zo);
              info_zo.appendChild(top_zo);

              // 定义中部内容
              var middle_zo = document.createElement("div");
              middle_zo.className = "info-middle";
              middle_zo.style.backgroundColor = "white";
              middle_zo.innerHTML = content_zo;
              info_zo.appendChild(middle_zo);

              // 定义底部内容
              var bottom_zo = document.createElement("div");
              bottom_zo.className = "info-bottom";
              bottom_zo.style.position = "relative";
              bottom_zo.style.top = "0px";
              bottom_zo.style.margin = "0 auto";
              var sharp_zo = document.createElement("img");
              sharp_zo.src = "https://webapi.amap.com/images/sharp.png";
              bottom_zo.appendChild(sharp_zo);
              info_zo.appendChild(bottom_zo);
              return info_zo;
            }

            //关闭信息窗体
            function closeInfoWindow() {
              map.clearInfoWindow();
            }

            //绿榕园饭堂的标点
            const markerContent_lro =
              `<div class="name">绿榕园</div>` +
              `<div class="custom-content-marker">
        <img src="../public/dinninghall_img/lro.jpg">
        </div>`;

            var position_lro = new AMap.LngLat(113.354986, 23.156229); //绿榕园的经纬度
            var marker_lro = new AMap.Marker({
              position: position_lro,
              title: "绿榕园",
              content: markerContent_lro, //将 html 传给 content
              offset: new AMap.Pixel(-13, -40), //以 icon 的 [center bottom] 为原点
            });
            map.add(marker_lro);

            //鼠标点击marker弹出自定义的信息窗体
            marker_lro.on("click", function () {
              infoWindow_lro.open(map, marker_lro.getPosition());
            });

            //实例化信息窗体
            var title_lro = [];
            title_lro.push(
              '绿榕园<span style="font-size:11px;color:#F00;">距离：</span>'
            );
            title_lro.push(numberForString("绿榕园"));
            title_lro.push("米");
            var content_lro = [];
            content_lro.push(
              "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山街五山路483号华南农业大学内"
            );
            content_lro.push("联系方式：暂无");
            // content.push(
            //   "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
            // );
            var infoWindow_lro = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: createInfoWindow(title_lro, content_lro.join("<br/>")),
              offset: new AMap.Pixel(16, -45),
            });

            //莘园饭堂的标点
            const markerContent_xo =
              `<div class="name">莘园</div>` +
              `<div class="custom-content-marker">
        <img src="./dinninghall_img/xo.jpg">
        </div>`;

            var position_xo = new AMap.LngLat(113.357213, 23.163316); //莘园的经纬度
            var marker_xo = new AMap.Marker({
              position: position_xo,
              title: "莘园",
              content: markerContent_xo, //将 html 传给 content
              offset: new AMap.Pixel(-13, -70), //以 icon 的 [center bottom] 为原点
            });
            map.add(marker_xo);

            //鼠标点击marker弹出自定义的信息窗体
            marker_xo.on("click", function () {
              infoWindow_xo.open(map, marker_xo.getPosition());
            });

            var title_xo = [];
            title_xo.push(
              '莘园<span style="font-size:11px;color:#F00;">距离：</span>'
            );
            title_xo.push(numberForString("莘园"));
            title_xo.push("米");
            var content_xo = [];
            content_xo.push(
              "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山街道五山路483号华南农业大学六一区"
            );
            content_xo.push("联系方式：020-85283177");
            // content.push(
            //   "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
            // );
            var infoWindow_xo = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: createInfoWindow(title_xo, content_xo.join("<br/>")),
              offset: new AMap.Pixel(16, -45),
            });

            //西园饭堂的标点
            const markerContent_co =
              `<div class="name">西园</div>` +
              `<div class="custom-content-marker">
        <img src="./dinninghall_img/co.jpg">
        </div>`;

            var position_co = new AMap.LngLat(113.347286, 23.161231); //西园的经纬度
            var marker_co = new AMap.Marker({
              position: position_co,
              title: "西园",
              content: markerContent_co, //将 html 传给 content
              offset: new AMap.Pixel(-13, -80), //以 icon 的 [center bottom] 为原点
            });
            map.add(marker_co);

            //鼠标点击marker弹出自定义的信息窗体
            marker_co.on("click", function () {
              infoWindow_co.open(map, marker_co.getPosition());
            });
            var title_co = [];
            title_co.push(
              '西园<span style="font-size:11px;color:#F00;">距离：</span>'
            );
            title_co.push(numberForString("西园"));
            title_co.push("米");
            var content_co = [];
            content_co.push(
              "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山街道五山路483号华南农业大学花枝路"
            );
            content_co.push("联系方式：020-85280769");
            // content.push(
            //   "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
            // );
            var infoWindow_co = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: createInfoWindow(title_co, content_co.join("<br/>")),
              offset: new AMap.Pixel(16, -45),
            });

            //荷园饭堂的标点
            const markerContent_ho =
              `<div class="name">荷园</div>` +
              `<div class="custom-content-marker">
        <img src="./dinninghall_img/ho.jpg">
        </div>`;

            var position_ho = new AMap.LngLat(113.367758, 23.160487); //荷园的经纬度
            var marker_ho = new AMap.Marker({
              position: position_ho,
              title: "荷园",
              content: markerContent_ho, //将 html 传给 content
              offset: new AMap.Pixel(-13, -80), //以 icon 的 [center bottom] 为原点
            });
            map.add(marker_ho);

            //鼠标点击marker弹出自定义的信息窗体
            marker_ho.on("click", function () {
              infoWindow_ho.open(map, marker_ho.getPosition());
            });
            var title_ho = [];
            title_ho.push(
              '荷园<span style="font-size:11px;color:#F00;">距离：</span>'
            );
            title_ho.push(numberForString("荷园"));
            title_ho.push("米");
            var content_ho = [];
            content_ho.push(
              "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山路483号(华南农业大学启林南区,近第五教学楼)"
            );
            content_ho.push("联系方式：暂无");
            // content.push(
            //   "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
            // );
            var infoWindow_ho = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: createInfoWindow(title_ho, content_ho.join("<br/>")),
              offset: new AMap.Pixel(16, -45),
            });

//稻香园饭堂的标点
            const markerContent_dxo =
              `<div class="name">稻香园</div>` +
              `<div class="custom-content-marker">
        <img src="./dinninghall_img/dxo.jpg">
        </div>`;

            var position_dxo = new AMap.LngLat(113.370245, 23.163324); //稻香园的经纬度
            var marker_dxo = new AMap.Marker({
              position: position_dxo,
              title: "稻香园",
              content: markerContent_dxo, //将 html 传给 content
              offset: new AMap.Pixel(-13, -50), //以 icon 的 [center bottom] 为原点
            });
            map.add(marker_dxo);

            //鼠标点击marker弹出自定义的信息窗体
            marker_dxo.on("click", function () {
              infoWindow_dxo.open(map, marker_dxo.getPosition());
            });
            var title_dxo = [];
            title_dxo.push(
              '稻香园<span style="font-size:11px;color:#F00;">距离：</span>'
            );
            title_dxo.push(numberForString("稻香园"));
            title_dxo.push("米");
            var content_dxo = [];
            content_dxo.push(
              "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山路483号华南农业大学启林北区"
            );
            content_dxo.push("联系方式：暂无");
            // content.push(
            //   "<a href='https://ditu.amap.com/detail/B000A8URXB?citycode=110105'>详细信息</a>"
            // );
            var infoWindow_dxo = new AMap.InfoWindow({
              isCustom: true, //使用自定义窗体
              content: createInfoWindow(title_dxo, content_dxo.join("<br/>")),
              offset: new AMap.Pixel(16, -45),
            });

          } else {
            onError(result);
          }
        });
      });
    })
    .catch((e) => {
      console.log(e);
    });
});

onUnmounted(() => {
  map?.destroy();
});
</script>

<style scoped>
html,
body,
#container {
  width: 100vw;
  height: 100vh;
}

.info {
  padding: 0.75rem 1.25rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
  position: fixed;
  top: 1rem;
  background-color: white;
  max-width: fit-content;
  border-width: 0;
  right: 1rem;
  box-shadow: 0 2px 6px 0 rgba(114, 124, 245, 0.5);
  position: absolute;
  z-index: 1000;
}
.info div {
  max-width: fit-content;
}

.nearest {
  font-size: 25px;
  color: red;
}

.singleName,
.singleDistance {
  font-size: 15px;
}
</style>
