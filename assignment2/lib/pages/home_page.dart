import 'package:assignment2/place_model.dart';
import 'package:flutter/material.dart';
import 'package:hive/hive.dart';

class HomePage extends StatefulWidget {
  const HomePage({Key? key}) : super(key: key);

  @override
  State<HomePage> createState() => _HomePage();
}

class _HomePage extends State<HomePage> {
  TextEditingController nameController = TextEditingController();
  TextEditingController latitudeController = TextEditingController();
  TextEditingController longitudeController = TextEditingController();
  TextEditingController categoryController = TextEditingController();
  List<PlaceModel> places = [];

  @override
  void initState() {
    super.initState();
    _loadLocationsFromHive();
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

  Future<void> saveLocationsToHive(List<PlaceModel> locations) async {
    try {
      var box = Hive.box('placesBox');
      await box.put('places', locations);
      print('Locations saved successfully: $locations');
      setState(() {
        this.places = locations;
      });
    } catch (error) {
      print('Error saving to Hive: $error');
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



  @override
  void dispose() {
    nameController.dispose();
    latitudeController.dispose();
    longitudeController.dispose();
    categoryController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Home Page'),
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          SizedBox(height: 20),
          Expanded(
            child: places.isEmpty
                ? Text('No places stored.')
                : ListView.builder(
              itemCount: places.length,
              itemBuilder: (context, index) {
                PlaceModel place = places[index];
                return ListTile(
                  title: Text(place.name),
                  subtitle: Text(
                    'Latitude: ${place.latitude}, Longitude: ${place.longitude}, Category: ${place.category}',
                  ),
                );
              },
            ),
          ),
        ],
      ),
      floatingActionButton: FloatingActionButton(
        child: const Icon(Icons.add),
        onPressed: () {
          showModalBottomSheet<void>(
            context: context,
            isScrollControlled: true,
            builder: (BuildContext context) {
              return Padding(
                padding: EdgeInsets.only(
                  bottom: MediaQuery.of(context).viewInsets.bottom,
                ),
                child: Container(
                  color: Colors.grey,
                  child: Form(
                    child: Column(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        TextFormField(
                          controller: nameController,
                          decoration: InputDecoration(labelText: 'Name'),
                        ),
                        TextFormField(
                          controller: latitudeController,
                          decoration:
                          InputDecoration(labelText: 'Längengrad'),
                          keyboardType:
                          TextInputType.number,
                        ),
                        TextFormField(
                          controller: longitudeController,
                          decoration:
                          InputDecoration(labelText: 'Breitengrad'),
                          keyboardType:
                          TextInputType.number,
                        ),
                        TextFormField(
                          controller: categoryController,
                          decoration: InputDecoration(labelText: 'Kategorie'),
                        ),
                        ElevatedButton(
                          onPressed: () {
                            final PlaceModel location = PlaceModel(
                              name: nameController.text,
                              latitude: double.tryParse(latitudeController.text) ?? 0.0,
                              longitude: double.tryParse(longitudeController.text) ?? 0.0,
                              category: categoryController.text,
                            );

                            // Save the locations list to Hive
                            saveLocationsToHive([...places, location]);

                            // Clear form fields
                            nameController.clear();
                            latitudeController.clear();
                            longitudeController.clear();
                            categoryController.clear();
                          },
                          child: Text('Standort hinzufügen'),
                        ),
                      ],
                    ),
                  ),
                ),
              );
            },
          );
        },
      ),
    );
  }
}
