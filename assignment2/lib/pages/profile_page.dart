import 'package:flutter/material.dart';

class ProfilePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Profile Page'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'Welcome to the Profile Page!',
              style: TextStyle(fontSize: 24),
            ),
            // Add more widgets and content specific to your Home screen
          ],
        ),
      ),
    );
  }
}
