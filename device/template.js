
require('dotenv').config()
const { Mqtt } = require('azure-iot-device-mqtt');
const { Client : DeviceClient } = require('azure-iot-device');
const { Client : HubClient } = require('azure-iothub');
const { promisify } = require('util')



const run = async() => {
    try {

    } catch (err) {
        console.error('Error: ', err)
    }
}