import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';

class MapPage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Map Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Welcome to the Map Page!',
              style: TextStyle(fontSize: 24),
            ),
            Container(
              height: 300, // Adjust the height as needed
              child: GoogleMap(
                initialCameraPosition: CameraPosition(
                  target: LatLng(48.2395854, 16.3743125),
                  zoom: 15, // You can adjust the initial zoom level
                ),
                markers: Set<Marker>.from([]), // Add markers if needed
              ),
            ),
          ],
        ),
      ),
    );
  }
}
