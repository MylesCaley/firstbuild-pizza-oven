# BLE Pizza Service + UI For faking pizza oven data

## BLE Pizza Service

To start only the BLE service and not the UI:

`node .`

This will load just the BLE portion of the code with default values. The definition of the BLE characteristics are defined in the characteristics folder. 



### Current Characteristics

#### Display Temperature
The temperature of the oven that is displayed to the user

## UI

To start the UI + the BLE service :

`cd ./simulator/ && node .`

This loads a small menu system that you can use to set fake values for various pizza oven values.


