import 'package:assignment2/pages/login_page.dart';
import 'package:flutter/material.dart';
import 'navigation_tabs.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Login(), // Use AppNavigation as the top-level widget
    );
  }
}
