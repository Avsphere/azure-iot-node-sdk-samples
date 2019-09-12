require('dotenv').config()
const { Mqtt } = require('azure-iot-device-mqtt');
const { ModuleClient } = require('azure-iot-device');

//!!!!!      THIS REWRITE HAS NOT BEEN PROPERLY TESTED


/*
    See how connecting with 'fromEnvironment' compares with 'fromConnectionString' 
    https://docs.microsoft.com/en-us/javascript/api/azure-iot-device/moduleclient?view=azure-node-latest#fromenvironment-any-

    Essentially it is nearly identical to the device_methods_invoke except that some env variables are implicit
*/



const run = async() => {
    try {
        const client = await ModuleClient.fromEnvironment(Mqtt)
        const res = await client.invokeMethod(process.env.DEVICE_ID, 'methodTarget', {
            methodName : 'enableCarParachute',
            payload : JSON.stringify({ terminalVelocity : true }),
            responseTimeoutInSeconds: 5,
            connectTimeoutInSeconds: 5
        })
    } catch (err) {
        console.error('Error: ', err)
    }
}


run()