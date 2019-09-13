# Upgrading Azure Iot Node SDK Sample Scripts

What started off as a 2019'ifying refurbishment, has turned into more of a remodel

I originally planned to keep things more or less the same and do more of a style / structure upgrade

However, going through the samples has, in a fit of new-comer excitement / frustration energy, led me to dedicate a bit more time with what is hopefully considered an upgrade on the device / service sample directories

## Disclaimer

While I like my new samples, I am absolutely certain that my knowledge of the codebase and surrounding concepts is uncertain, alas I am only about a week invested in its understanding.

Therefore I strategically placed some possible problems I found in the "questions" directory, and will seek midpoint guidance before continuing on


### What is different

Many of my samples are semantically similar, and I made sure to incorporate all of the methods used throughout.

The main difference is that samples like simple_sample_device_x509.js, simple_sample_device_with_sas.js, were then compressed into device_connectionMethods.js as they only differed in a couple lines

And while I am more than happy to rewrite these as well (it won't take long if it is desired), my personal opinion was that a small amount of the samples, such as the dmpatterns_fwupdate_device added little new besides confusion, their material was incorporated into other examples

I also added some new samples / "conceptualExamples", for example cloud_to_device_message.js which is nice to run alongside simple_sample_device.js such that one can see the device.on('message') proc.
The "conceptualExamples are unrealistic but I thought helpful when building one's mental model of the arch. For example sendFromIotHub_listenOnDevice  
