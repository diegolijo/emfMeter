var fs = require('fs');
var path = require('path');
var json = require(path.join(__dirname, 'src/environments/version.json'))
var appVersion = require(path.join(__dirname, 'package.json')).version;

if (appVersion !== json.version) {
    json.version = appVersion;
    json.dev_version = 0;
}

json.dev_version += 1;

fs.writeFile(path.join(__dirname, 'src/environments/version.json'), JSON.stringify(json), function (err) {
    if (err) throw err;
    console.log('versión de desarrollo ' + json.version + '-' + json.dev_version);
});

