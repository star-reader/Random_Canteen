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
import { nextTick, onMounted, onUnmounted, ref } from "vue";
import AMapLoader from "@amap/amap-jsapi-loader";
import useInfoWindow from "@/hooks/canteen/useInfoWindow";

let map = null;

const distanceList = ref([
  { string: "芷园", number: null },
  { string: "绿榕园", number: null },
  { string: "西园", number: null },
  { string: "莘园", number: null },
  { string: "荷园", number: null },
  { string: "稻香园", number: null },
]);
let globalDistanceList = []

// 加载地图及相关配置
const loadMapAndConfigs = () => {
  return AMapLoader.load({
    key: "075d155a8b582433e540decb223d9a1e",
    version: "2.0",
    plugins: ["AMap.Geolocation"],
  });
}


onMounted(() => {

  nextTick(() => {
    loadMapAndConfigs()
    .then((AMap) => {
        map = new AMap.Map("container", {
          viewMode: "2D",
          zoom: 17,
          center: [113.357583, 23.15765],
        })

        map.setZooms([16, 19]);

        const lockMapBounds = () => {
          let bounds = new AMap.Bounds(
            113.378906,
            23.168838,
            113.344119,
            23.14629
          );
          map.setLimitBounds(bounds);
        };
        lockMapBounds();

        // 定位
        AMap.plugin("AMap.Geolocation", () => {
          let geolocation = new AMap.Geolocation({
            enableHighAccuracy: true,
            timeout: 10000,
            buttonposition: "RB",
            offset: [10, 20],
            zoomToAccuracy: true,
          });

          map.addControl(geolocation);
          geolocation.getCurrentPosition((status, result) => {
            if (status == "complete") {
              const LngLatList = [
                [113.366028, 23.153604],
                [113.354986, 23.156229],
                [113.347286, 23.161231],
                [113.357213, 23.163316],
                [113.367758, 23.160487],
                [113.370245, 23.163324],
              ]

              for (let i = 0; i < 6; i++) {
                const dis = AMap.GeometryUtil.distance(result.position, [
                  LngLatList[i][0],
                  LngLatList[i][1],
                ])
                const result00 = Math.round(dis * 100) / 100
                distanceList.value[i].number = result00
              }
              distanceList.value.sort((a, b) => a.number - b.number)
              globalDistanceList = distanceList.value.slice()

              // 芷园
              useInfoWindow(
                  map, AMap, new AMap.LngLat(113.366028, 23.153604), 
                  "芷园", 'zo',
                  globalDistanceList, 
                  `<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山路483号华南农业大学紫荆路(近游泳池)`,
                  "13798079072"
              )
              // 绿榕园
              useInfoWindow(
                  map, AMap, new AMap.LngLat(113.354986, 23.156229), 
                  "绿榕园", 'lro',
                  globalDistanceList,
                  "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山街五山路483号华南农业大学内"
              )
              // 莘园
              useInfoWindow(
                  map, AMap, new AMap.LngLat(113.357213, 23.163316), 
                  "莘园", 'xo',
                  globalDistanceList,
                  "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山街道五山路483号华南农业大学六一区",
                  "020-85283177"
              )
              // 西园
              useInfoWindow(
                  map, AMap, new AMap.LngLat(113.347286, 23.161231),
                  "西园", 'co',
                  globalDistanceList,
                  "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山街道五山路483号华南农业大学花枝路",
                  "020-85280769"
              )
              // 荷园
              useInfoWindow(
                  map, AMap, new AMap.LngLat(113.367758, 23.160487),
                  "荷园", 'ho', globalDistanceList,
                  "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山路483号(华南农业大学启林南区,近第五教学楼)",
              )
              // 稻香园
              useInfoWindow(
                  map, AMap, new AMap.LngLat(113.370245, 23.163324),
                  "稻香园", 'dxo', globalDistanceList,
                  "<img src='http://tpc.googlesyndication.com/simgad/5843493769827749134'>地址：广州市天河区五山路483号华南农业大学启林北区",
              )
            } else {
              onError(result);
            }
          });
        });
      })
    .catch((e) => {
        console.log(e);
      });
  })

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
