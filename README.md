# Upgrading Azure Iot Node SDK Sample Scripts

What started off as 2019'ifying the node samples has turned into a full upgrade.

I originally planned to only spend a day on this and just do more of a style / structure upgrade

However, going through the samples and finding issues with them has, in a fit of new comer / frustration energy, led to me deciding to spend another day upgrading the entire device / service sample directories

## Disclaimer

While I am fairly certain that my samples are a nice improvement, I am new to this code base, about 5 days inas of 9/12, and am absolutely certain that I do not fully understand it.

Therefore I strategically named and placed the problems I am finding in the "questions" directory


### What is different

Many of my samples are semantically similar, and I made sure to incorporate all of the methods used throughout

Many of the old samples were compressed, for example there were three samples, each differing only in connection methods: token, x509, sas. These I compressed into a single file "..."


