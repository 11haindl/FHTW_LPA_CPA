import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:yaml/yaml.dart';

class AboutPage extends StatefulWidget {
  @override
  _AboutPageState createState() => _AboutPageState();
}

class _AboutPageState extends State<AboutPage> {
  Map<String, String> _packageVersions = {};

  @override
  void initState() {
    super.initState();
    _loadPackageVersions();
  }

  Future<Map<String, String>> getPackageVersions() async {
    final yamlString = await rootBundle.loadString('pubspec.yaml');
    final parsedYaml = loadYaml(yamlString);

    final dependencies = parsedYaml['dependencies'];
    final devDependencies = parsedYaml['dev_dependencies'];

    final packageVersions = <String, String>{};

    if (dependencies != null) {
      packageVersions.addAll(dependencies);
    }

    if (devDependencies != null) {
      packageVersions.addAll(devDependencies);
    }

    return packageVersions;
  }

  Future<void> _loadPackageVersions() async {
    final versions = await getPackageVersions();
    setState(() {
      _packageVersions = versions;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('About Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Installed Package Versions',
              style: TextStyle(fontSize: 24),
            ),
            for (var packageName in _packageVersions.keys)
              Text('$packageName: ${_packageVersions[packageName]}'),
          ],
        ),
      ),
    );
  }
}
