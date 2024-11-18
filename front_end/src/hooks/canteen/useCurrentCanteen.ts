export default () => {
    return new Promise((resolve) =>{
        const locations = {
            '芷园':[113.366028, 23.153604],
            '绿榕园':[113.354986, 23.156229],
            '莘园':[113.357213, 23.163316],
            '西园': [113.347286, 23.161231],
            '荷园':[113.367758, 23.160487],
            '稻香园':[113.370245, 23.163324]
        }
        if (navigator.geolocation){
            navigator.geolocation.getCurrentPosition((position) => {
                let latitude = position.coords.latitude
                let longitude = position.coords.longitude
                let minDistance = Infinity
                let currentCanteen = ''
                for (let canteen in locations){
                    let canteenLocation = locations[canteen as keyof object]
                    let distance = Math.sqrt(Math.pow(canteenLocation[0] - longitude, 2) + Math.pow(canteenLocation[1] - latitude, 2))
                    if (distance < minDistance){
                        minDistance = distance
                        currentCanteen = canteen
                    }
                }
                return resolve(currentCanteen)
            })
        }else{
            return resolve(false)
        }
    })
    
}