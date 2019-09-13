require('dotenv').config()
const { Mqtt } = require('azure-iot-device-mqtt');
const { Client, Message } = require('azure-iot-device');


/*
   !!!! I believe that the original sample does not work as they expect it to...
    it tries listening to messages that are sento the device 

*/



//Note that this is using the device clients sendEvent rather than the module clients sendOutputEvent as seen in another sample
const startMessageInterval = (client, messageDelay=1000) => setInterval( async() => {
    const asteroid = { size : Math.random()*100, timeTillImpact : Math.random()*100 } //leaving units to users imagination
    const msg = new Message( JSON.stringify(asteroid) )

    msg.properties.add('IMPACT_EMERGENCY', asteroid.timeTillImpact < 50 && asteroid.size > 50 ? 'true' : 'false')
    const status = await client.sendEvent(msg).catch( err => console.error('Error sending message: ', err) )
    console.log('Sent Message: ', status)
}, messageDelay)


const run = async() => {
    try {
        
        //create a client using the device connection string and the mqtt protocol
        const client = Client.fromConnectionString(process.env.DEVICE_CONN_STRING, Mqtt)

        const sendMessageInterval = startMessageInterval(client)

    } catch (err) {
        console.error('Error: ', err)
    }
}


run()
