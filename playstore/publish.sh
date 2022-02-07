## Generar keystore: 
# keytool -genkey -v -keystore emf.keystore -alias emf -keyalg RSA -keysize 2048 -validity 10000 -alias vayapedal    
#pass keystore: vayapedal
cd ..
cordova platform remove android
cordova platform add android@10.1.1
ionic cordova build android --prod --release
cd platforms/android
./gradlew bundle
cd ..
cd ..
cp platforms/android/app/build/outputs/bundle/release/app-release.aab playstore/.
cd playstore
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore emf.keystore -storepass vayapedal  app-release.aab vayapedal
C:\Users\diego\AppData\Local\Android\Sdk\build-tools\30.0.3\zipalign -v 4 app-release.aab emf.aab

