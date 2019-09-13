require('dotenv').config()
const { Mqtt } = require('azure-iot-device-mqtt');
const { Client } = require('azure-iot-device');

/*

documentation is off, their sample is incorrect 

*/

const getAllPropertyNames = o => {
    let props = []
    do {
        props = props.concat(Object.getOwnPropertyNames(o))
    } while( o = Object.getPrototypeOf(o) )
    return props
}

const demonstrateSampleMethodNonExistence = twin => {
    try {
        twin.properties.desired.update({}, err => err ? console.error(err) : console.log('properties.desired updated!') )
    } catch (err) {
        if (err)
        console.log('ere', err.name)
    }
}

const run = async() => {
  try {
    const client = Client.fromConnectionString(process.env.DEVICE_CONN_STRING, Mqtt);

    //get the device twin
    const twin = await client.getTwin()

    //Note: When the twin is done being created the desired properties have already been retrieved
    
    //here we listen for updates to the properties.desired -- this procs even when updating the properties.reported inside azure iot hub
    twin.on('properties.desired', (props) => {
      console.log('on properties.desired', props)
    });

    //This appears to never be called -- tested by updating in the azure iot hub as well
    twin.on('properties.reported', props => {
      console.log('on properties.reported', props)
    });

    const update = {
      animal : 'emu',
      firmwareAnimalVersion : Math.random().toString()
    }

    //this works and triggers the iot hub change, but does not hit the handler
    twin.properties.reported.update(update, err => err ? console.error(err) : console.log('properties.reported updated!') )


    



  } catch(err) {
    console.error('preUpstream failed : ', err)
  }
}

run()
