import 'package:flutter/material.dart';
import 'package:package_info_plus/package_info_plus.dart';
import 'package:url_launcher/url_launcher.dart';

class AboutPage extends StatefulWidget {
  @override
  _AboutPageState createState() => _AboutPageState();
}

class _AboutPageState extends State<AboutPage> {
  String appVersion = '';

  @override
  void initState() {
    super.initState();
    getAppVersion(); // Call the method when the widget is initialized.
  }

  Future<void> getAppVersion() async {
    final PackageInfo packageInfo = await PackageInfo.fromPlatform();
    setState(() {
      appVersion = packageInfo.version;
    });
  }

  _launchURL() async {
    const url =
        'https://weristgeradebundeskanzler.at/';
    if (await canLaunch(url)) {
      await launch(url);
    } else {
      throw 'Could not launch $url';
    }
  }

  _launchEmailClient() async {
    const email =
        'vivaf37855@rdluxe.com';
    final Uri emailUri = Uri(scheme: 'mailto', path: email);
    final String emailUrl = emailUri.toString();

    if (await canLaunch(emailUrl)) {
      await launch(emailUrl);
    } else {
      throw 'Could not launch $emailUrl';
    }
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
            Text("App Version: " + appVersion),
            Text("Name: Peter Silie"),
            Padding(
              padding: const EdgeInsets.only(top: 60.0),
              child: Center(
                child: Container(
                  width: 200,
                  height: 150,
                  child: Image.asset('assets/images/homer_simpson.png'),
                ),
              ),
            ),
            // Clickable link
            InkWell(
              child: Text(
                'https://weristgeradebundeskanzler.at/',
                style: TextStyle(
                  color: Colors.blue,
                  decoration: TextDecoration.underline,
                ),
              ),
              onTap: _launchURL,
            ),
            InkWell(
              child: Text(
                'Contact us via email',
                style: TextStyle(
                  color: Colors.blue,
                  decoration: TextDecoration.underline,
                ),
              ),
              onTap: _launchEmailClient,
            )
          ],
        ),
      ),
    );
  }
}
