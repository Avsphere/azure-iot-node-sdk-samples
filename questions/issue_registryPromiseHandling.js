// incorrect promise from callback

require('dotenv').config()
const { Registry } = require('azure-iothub')
const registry = Registry.fromConnectionString(process.env.IOTHUB_CONNECTION_STRING)
const { inspect } = require('util')

//placing in a function to easily generate multiple configurations for testing
const generateSampleConfiguration = modelNumber => ({
    id : `chiller${modelNumber}x`,
    content : {
        deviceContent : {
            'properties.desired.chiller-water' : {
                temperature : Math.random(),
                pressure : Math.random()
            }
        }
    },
    metrics : {
        queries : {
            waterSettingsPending: `SELECT deviceId FROM devices WHERE properties.reported.chillerWaterSettings.status=\'pending\'`
        }
    },
    targetCondition : `properties.reported.chillerProperties.model=\'${modelNumber}x\'`,
    priority : 20
})


const run = async() => {
    try {
        const sampleConfigurations = [ generateSampleConfiguration(0), generateSampleConfiguration(1) ]
        console.log('Generated two sample configurations with ids : ', sampleConfigurations.map(s => s.id) )

        //For instance their promise utils can handle this...
        // await Promise.all([
        //     registry.addConfiguration(sampleConfigurations[0]),
        //     registry.addConfiguration(sampleConfigurations[1])
        // ])

        //SDK BUG -- their promise utils fails for this... I believe in error in their promiseUtils -- still need to investigate 9/13
        await Promise.all( sampleConfigurations.map(registry.addConfiguration) )
        .catch( err => console.error('Adding configurations failed!', err ) )
        

    } catch (err) {
        console.error('Error: ', err.message)
    }
}

run();