'use strict';

const request = require('request');
const semver = require('semver')
const notifier = require('node-notifier');

//config
const region = 'cn'
const appid = '1234'
const currentVersion = '2.7.0'
const queryInterval = 1000 * 5 //ms


const timer = setInterval(checkVersion, queryInterval);

function checkVersion() {
    request('https://itunes.apple.com/' + region + '/lookup?id=' + appid, { json: true }, (error, req, body) => {
        const version = body.results[0]['version'];
        if (semver.gt(version, currentVersion)) {
            clearInterval(timer);
            notify(version)
            console.log('newVersion: ' + version);
        } else {
            console.log('currentVersion: ' + version);
        }
    });
}

function notify(newVersion) {
    notifier.notify({
        title: 'You have a new version',
        message: 'new version : ' + newVersion,
        sound: true
    });
}
