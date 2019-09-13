require('dotenv').config()
const { EventHubClient } = require('@azure/event-hubs');

const getAllPropertyNames = o => {
    let props = []
    do {
        props = props.concat(Object.getOwnPropertyNames(o))
    } while( o = Object.getPrototypeOf(o) )
    return props
}


const run = async() => {
    try {
        const eventHubClient = await EventHubClient.createFromIotHubConnectionString(process.env.IOTHUB_CONNECTION_STRING);
        console.log( getAllPropertyNames(eventHubClient) )
        //where are all the methods listed? Am I looking at the wrong thing?... https://azure.github.io/azure-sdk-for-js/event-hubs/classes/eventhubclient.html
    } catch ( err ) { 
        console.error('Error : ', err)
    }
}

run()