import 'package:flutter/material.dart';
import 'package:assignment2/navigation_tabs.dart';
import 'package:package_info_plus/package_info_plus.dart';

class Login extends StatefulWidget {
  @override
  _LoginState createState() => _LoginState();
}

class _LoginState extends State<Login> {
  TextEditingController emailController = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  String appName = '';

  Future<void> getAppName() async {
    final PackageInfo packageInfo = await PackageInfo.fromPlatform();
    setState(() {
      appName = packageInfo.appName;
    });
  }

  @override
  void initState() {
    super.initState();
    getAppName();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(appName),
      ),
      body: SingleChildScrollView(
        child: Column(
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.only(top: 60.0),
              child: Center(
                child: Container(
                  width: 200,
                  height: 150,
                  child: Image.asset('assets/images/fhtw_logo.png'),
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 15),
              child: TextField(
                controller: emailController,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Email',
                  hintText: 'Enter valid email id as abc@gmail.com',
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.only(
                  left: 15.0, right: 15.0, top: 15, bottom: 0),
              child: TextField(
                controller: passwordController,
                obscureText: true,
                decoration: InputDecoration(
                  border: OutlineInputBorder(),
                  labelText: 'Password',
                  hintText: 'Enter secure password',
                ),
              ),
            ),
            TextButton(
              onPressed: () {
                // TODO: Implement FORGOT PASSWORD SCREEN
              },
              child: const Text(
                'Forgot Password',
                style: TextStyle(color: Colors.blue, fontSize: 15),
              ),
            ),
            Container(
              height: 50,
              width: 250,
              decoration: BoxDecoration(
                  color: Colors.blue, borderRadius: BorderRadius.circular(20)),
              child: TextButton(
                onPressed: () {
                  if (emailController.text == 'user@email.com' &&
                      passwordController.text == 'userPW0815') {
                    // Valid credentials, redirect the user
                    Navigator.push(
                      context,
                      MaterialPageRoute(builder: (_) => NavigationTabs()),
                    );
                  } else {
                    // Invalid credentials, show an error message
                    showDialog(
                      context: context,
                      builder: (context) => AlertDialog(
                        title: Text('Login Failed'),
                        content: Text('Invalid email or password. Please try again.'),
                        actions: [
                          TextButton(
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            child: Text('OK'),
                          ),
                        ],
                      ),
                    );
                  }
                },
                child: const Text(
                  'Login',
                  style: TextStyle(color: Colors.white, fontSize: 25),
                ),
              ),
            ),
            const SizedBox(
              height: 130,
            ),
            const Text('New User? Create Account'),
          ],
        ),
      ),
    );
  }
}
