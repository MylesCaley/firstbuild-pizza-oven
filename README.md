# BLE Pizza Service + UI For faking pizza oven data

## BLE Pizza Service

To start only the BLE service and not the UI:

`node .`

This will load just the BLE portion of the code with default values. The definition of the BLE characteristics are defined in the characteristics folder. 


### Files 


#### index.js

Loads the BLE service and creates a new object object.

#### oven.js

The actual oven itself. This has current values and functions for starting the oven.

#### oven-service.js

The BLE service that loads the characteristics.

### Current Characteristics

#### Display Temperature

The temperature of the oven that is displayed to the user

## UI

To start the UI + the BLE service :
`cd ./simulator/ && node .`

This loads a small menu system that you can use to set fake values for various pizza oven values.

### Files

#### index.js

Loads the User interface and the Oven


#### ui.js

Contains the fake data and menu system.
