import 'package:assignment2/place_model.dart';
import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:hive/hive.dart';
import 'package:latlong2/latlong.dart';
import 'package:location/location.dart';
import 'package:url_launcher/url_launcher.dart';

class MapPage extends StatefulWidget {
  @override
  _MapPage createState() => _MapPage();
}

class _MapPage extends State<MapPage> {
  LocationData? currentLocation;
  List<PlaceModel> places = [];
  Location location = Location();

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
    _loadLocationsFromHive();

    location.onLocationChanged.listen((LocationData newLocation) {
      setState(() {
        currentLocation = newLocation;
      });
    });
  }

  Future<void> _loadLocationsFromHive() async {
    try {
      var storedLocations = await getLocationsFromHive();
      setState(() {
        places = storedLocations;
      });
      print('Locations retrieved successfully: $places');
    } catch (error) {
      print('Error retrieving from Hive: $error');
    }
  }

  Future<List<PlaceModel>> getLocationsFromHive() async {
    try {
      var box = Hive.box('placesBox');
      var locations = box.get('places', defaultValue: <PlaceModel>[]);
      print('Locations retrieved successfully: $locations');
      return locations.cast<PlaceModel>().toList();
    } catch (error) {
      print('Error retrieving from Hive: $error');
      return <PlaceModel>[];
    }
  }

  Future<void> _getCurrentLocation() async {
    try {
      var userLocation = await location.getLocation();
      setState(() {
        currentLocation = userLocation;
      });
    } catch (e) {
      print("Error getting location: $e");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Map Page'),
      ),
      body: FlutterMap(
        options: MapOptions(
          initialCenter: LatLng(48.2395854, 16.3743125),
          initialZoom: 8,
        ),
        children: [
          TileLayer(
            urlTemplate: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
            userAgentPackageName: 'com.example.app',
          ),
          if (currentLocation != null)
            MarkerLayer(
              markers: [
                Marker(
                  point: LatLng(currentLocation!.latitude!, currentLocation!.longitude!),
                  width: 80,
                  height: 80,
                  child: Icon(
                    Icons.location_pin,
                    color: Colors.blue,
                    size: 40.0,
                  ),
                ),
              ],
            ),
          MarkerLayer(
            markers: places
                .map(
                  (place) => Marker(
                point: LatLng(place.latitude, place.longitude),
                width: 80,
                height: 80,
                child: Icon(
                  Icons.place,
                  color: Colors.red,
                  size: 40.0,
                ),
              ),
            )
                .toList(),
          ),
          RichAttributionWidget(
            attributions: [
              TextSourceAttribution(
                'OpenStreetMap contributors',
                onTap: () => launchUrl(Uri.parse('https://openstreetmap.org/copyright')),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
