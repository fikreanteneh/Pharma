

const useAddress = (): { latitude: number, longitude: number } => { 
    let currAddress = { latitude: 10, longitude: 38 }
    navigator.geolocation.getCurrentPosition(position => {
        currAddress = { latitude: position.coords.latitude, longitude: position.coords.longitude }
    })
    return currAddress;

}

export default useAddress;