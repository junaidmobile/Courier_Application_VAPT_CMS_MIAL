cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-cache-clear.CacheClear",
      "file": "plugins/cordova-plugin-cache-clear/www/CacheClear.js",
      "pluginId": "cordova-plugin-cache-clear",
      "clobbers": [
        "CacheClear"
      ]
    },
    {
      "id": "cordova-plugin-camera.Camera",
      "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "Camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverOptions",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverOptions"
      ]
    },
    {
      "id": "cordova-plugin-camera.camera",
      "file": "plugins/cordova-plugin-camera/www/Camera.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "navigator.camera"
      ]
    },
    {
      "id": "cordova-plugin-camera.CameraPopoverHandle",
      "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
      "pluginId": "cordova-plugin-camera",
      "clobbers": [
        "CameraPopoverHandle"
      ]
    },
    {
      "id": "cordova-plugin-datecs-printer.DatecsPrinter",
      "file": "plugins/cordova-plugin-datecs-printer/www/printer.js",
      "pluginId": "cordova-plugin-datecs-printer",
      "clobbers": [
        "DatecsPrinter"
      ]
    },
    {
      "id": "cordova-plugin-device.device",
      "file": "plugins/cordova-plugin-device/www/device.js",
      "pluginId": "cordova-plugin-device",
      "clobbers": [
        "device"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-iroot.IRoot",
      "file": "plugins/cordova-plugin-iroot/www/iroot.js",
      "pluginId": "cordova-plugin-iroot",
      "clobbers": [
        "IRoot"
      ]
    },
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    },
    {
      "id": "cordova-plugin-zebra-printer.ZebraBluetoothPrinter",
      "file": "plugins/cordova-plugin-zebra-printer/www/zbtprinter.js",
      "pluginId": "cordova-plugin-zebra-printer",
      "clobbers": [
        "cordova.plugins.zbtprinter"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-cache-clear": "1.3.7",
    "cordova-plugin-camera": "4.1.0",
    "cordova-plugin-datecs-printer": "0.10.0",
    "cordova-plugin-device": "2.0.3",
    "cordova-plugin-dialogs": "1.3.4",
    "cordova-plugin-iroot": "3.1.0",
    "cordova-plugin-network-information": "1.3.4",
    "cordova-plugin-privacyscreen": "0.3.1",
    "cordova-plugin-proguard": "2.2.0",
    "cordova-plugin-splashscreen": "4.1.0",
    "cordova-plugin-whitelist": "1.3.3",
    "cordova-plugin-winstore-jscompat": "0.0.4",
    "cordova-plugin-zebra-printer": "2.0.1"
  };
});