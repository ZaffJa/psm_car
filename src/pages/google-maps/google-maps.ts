import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { NavController, Platform } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from 'ionic-native';

declare var google;

@Component({
  selector: 'page-google-maps',
  templateUrl: 'google-maps.html'
})
export class GoogleMapsPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  location = {
    latitude: '',
    longitude: '',
    name: ''
  };

  destination: string;
  start: string;

  constructor(public navCtrl: NavController, private geolocation: Geolocation, public platform: Platform) { }

  ionViewDidLoad() {
    // this.loadMap();
  }

  loadMap() {

    this.geolocation.getCurrentPosition().then((position) => {

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      // let map = new google.maps.Map(this.mapElement.nativeElement, mapOptions)

      let input = document.getElementById('pac-input');
      let searchBox = new google.maps.places.SearchBox(input);
      this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // Bias the SearchBox results towards current map's viewport.
      this.map.addListener('bounds_changed', function () {
        searchBox.setBounds(this.map.getBounds());
      });

      var markers = [];
      // Listen for the event fired when the user selects a prediction and retrieve
      // more details for that place.
      searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
          return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
          marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
          if (!place.geometry) {
            console.log("Returned place contains no geometry");
            return;
          }
          var icon = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
          };

          // Create a marker for each place.
          markers.push(new google.maps.Marker({
            map: this.map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
          }));

          if (place.geometry.viewport) {
            // Only geocodes have viewport.
            bounds.union(place.geometry.viewport);
          } else {
            bounds.extend(place.geometry.location);
          }
        });
        this.map.fitBounds(bounds);
      });

    }, (err) => {
      console.log(err);
    });
  }

  addMarker() {

    let marker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.DROP,
      position: this.map.getCenter()
    });


    let content = "<h4>Information!</h4>";

    this.addInfoWindow(marker, content);

  }
  addInfoWindow(marker, content) {

    let infoWindow = new google.maps.InfoWindow({
      content: content
    });

    google.maps.event.addListener(marker, 'click', () => {
      infoWindow.open(this.map, marker);
    });

  }


  startExternalMap() {
    if (this.location.latitude) {
      this.platform.ready().then(() => {
        this.geolocation.getCurrentPosition().then((position) => {
          // ios
          if (this.platform.is('ios')) {
            window.open('maps://?q=' + this.location.name + '&saddr=' + position.coords.latitude + ',' + position.coords.longitude + '&daddr=' + this.location.latitude + ',' + this.location.longitude, '_system');
          };
          // android
          if (this.platform.is('android')) {
            window.open('geo://' + position.coords.latitude + ',' + position.coords.longitude + '?q=' + this.location.latitude + ',' + this.location.longitude + '(' + this.location.name + ')', '_system');
          };
        });
      });
    };
  }

  getCoords() {
    google.maps.event.addListener(this.map, 'click', function (event) {

      console.log(event.latLng);

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: event.latLng
      });

    });
  }

  navigate() {
    let options: LaunchNavigatorOptions = {
      start: this.start
    };

    LaunchNavigator.navigate(this.destination, options)
      .then(
      success => alert('Launched navigator'),
      error => alert('Error launching navigator: ' + error)
      );
  }
}