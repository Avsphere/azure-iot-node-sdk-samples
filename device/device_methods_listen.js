require('dotenv').config()
const { Mqtt } = require('azure-iot-device-mqtt');
const { Client : DeviceClient } = require('azure-iot-device');
const { promisify } = require('util')


//note that this is playing the part of the listener, to see it in action run device_methods_invoke

const onLockCarDoor = async(request, response) => {
    try {
        const { payload, methodName } = request;
        console.log(`${methodName} was invoked with payload: `, payload)
        
        /*
            implement the actual locking door logic here
        */

        //send back a meaningful response
        await response.send(200, `Beep boop bop car door locked. Date : ${(new Date)}`)
    } catch (err) {
        console.error('onLocCarDoor handler error', err)
        await response.send(500, 'A meaningful error response')
    }
}


const run = async() => {
    try {
        const client = DeviceClient.fromConnectionString(process.env.DEVICE_CONN_STRING, Mqtt)
        
        client.onDeviceMethod('lockDoor', onLockCarDoor)
        console.log('Listening for the lockDoor directMethod!')

    } catch (err) {
        console.error('Error: ', err)
    }
}

run();