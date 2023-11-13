import 'package:hive/hive.dart';

part 'place_model.g.dart';

@HiveType(typeId: 1)
class PlaceModel extends HiveObject{
  @HiveField(0)
  final String name;
  @HiveField(1)
  final double latitude;
  @HiveField(2)
  final double longitude;
  @HiveField(3)
  final String category;

  PlaceModel({
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.category
  });
}