require('dotenv').config()
const { Mqtt } = require('azure-iot-device-mqtt');
const { ModuleClient, Message } = require('azure-iot-device');
const { EventHubClient, EventPosition } = require('@azure/event-hubs');
const { promisify } = require('util')
const delay = promisify(setTimeout)

const generateImportantMessage = () => new Message(
    JSON.stringify({ data : 'beep boop bopity bop' + Math.random() })
)

//This starts sending messages from our device client to our azure iot hub, which is ontop of event hub
const startMessageLoop = (moduleClient, eventLabel='beeopBoopEvent', interval=.5) => setInterval( () => {
    moduleClient.sendOutputEvent( eventLabel, generateImportantMessage() )
    .then( _ => console.log('Send success'))            
    .catch(console.error)
}, interval)


//This pulls the recent messages down
const recieveFromEventHubAndPrint = eventHubClient => partitionId => eventHubClient.receive(
    partitionId,
    m => console.log(`PartitionId : ${partitionId}`, m.body),
    console.error,
    { eventPosition : EventPosition.fromEnqueuedTime(Date.now()) }
)



const run = async() => {
    try {
        const moduleClient = ModuleClient.fromConnectionString(process.env.DEVICE_CONN_STRING, Mqtt);
        const messageInterval = startMessageLoop(moduleClient);

        await delay(1000)
        const eventHubClient = await EventHubClient.createFromIotHubConnectionString(process.env.IOTHUB_CONNECTION_STRING);
        const partitionIds = await eventHubClient.getPartitionIds()
    
        partitionIds.map(recieveFromEventHubAndPrint(eventHubClient))

    } catch ( err ) { 
        console.error('Error : ', err)
    }
}

run()
