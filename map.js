'use strict'        // let the browser know we're serious

// debug statement letting us know the file is loaded
console.log('Loaded map.js')

// your mapbox token
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2xvcmlhc2VycmFjb2NoIiwiYSI6ImNqc3Q4NGwxaTIxZjk0NHJyN3BjdmNlMnMifQ.NvZI9cAJogU5rbJi0b6jLQ'

let map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [2.147726, 41.402237],
    zoom: 14
})


// create an instance of NavigationControl
let navigation = new mapboxgl.NavigationControl({
    showCompass: false
})

// add the navigation to your map
map.addControl(navigation, 'top-left')

// create an instance of ScaleControl
let scale = new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'imperial'
})

// add the scale to your map
map.addControl(scale, 'bottom-right')


let geolocate = new mapboxgl.GeolocateControl({
    positionOptions: {
        enableHighAccuracy: true
    },
    trackUserLocation: true,
    showUserLocation: true,
    fitBoundsOptions: {
    }
})

map.addControl(geolocate, 'top-left')

// this is an event handler
geolocate.on('geolocate', function(event) {
    console.log(event.coords)
})

map.on('click', function(event) {

    let lng = event.lngLat.lng
    let lat = event.lngLat.lat

    console.log("clicked:", lng, lat)

    document.getElementById('info').innerHTML = lng.toFixed(5) + "," + lat.toFixed(5)

})



let data = [
    {
        location: [2.148083 ,41.404887],
        content: 'This is my old home in Barcelona'
    },
    {
        location: [2.151524,41.394914],
        content: 'This is where I used to work'
    },
    {
        location: [2.135880,41.40735],
        content: 'This is where my mother lives'
    },


    {
        location: [2.138452,41.408415],
        content: 'This is where I used to play tennis <br/> <img src="https://barcelona-home.com/events-and-guide/wp-content/uploads/2016/05/shutterstock_50770601.jpg"/>'
    },

    {
        location: [2.147670,41.401053],
        content: 'This is where I used to go for coffee'
    },
    ]

    data.forEach(function(d) {

    let marker = new mapboxgl.Marker()
    marker.setLngLat(d.location)
    marker.addTo(map)

    let popup = new mapboxgl.Popup()
    popup.setHTML(d.content)
    marker.setPopup(popup)

})
