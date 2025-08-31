var fs = require('fs');
var path = require('path');
var THEMES_PATH = 'platforms/android/app/src/main/res/values/themes.xml';
var themesFile = path.resolve(__dirname, '..', THEMES_PATH);
var dir = path.dirname(themesFile);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}
fs.writeFileSync(themesFile, '<?xml version=\'1.0\' encoding=\'utf-8\'?>\n' +
'<resources xmlns:tools="http://schemas.android.com/tools">\n' +
'    <style name="Theme.App.SplashScreen" parent="Theme.SplashScreen.IconBackground">\n' +
'        <item name="windowSplashScreenBackground">@color/cdv_splashscreen_background</item>\n' +
'        <item name="windowSplashScreenAnimatedIcon">@drawable/ic_cdv_splashscreen</item>\n' +
'        <item name="windowSplashScreenAnimationDuration">200</item>\n' +
'        <item name="postSplashScreenTheme">@style/Theme.AppCompat.NoActionBar</item>\n' +
'        <item name="android:windowOptOutEdgeToEdgeEnforcement" tools:targetApi="35">true</item>\n' +
'    </style>\n' +
' </resources>');
console.log('themes.xml has been updated');
