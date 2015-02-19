# CANopen

CANopen is a protocol built upon CAN that allows to send messages 
and control nodes in a CAN network.

Reader is encouraged to read the entire [CANopen basic guide](http://canopensolutions.com/english/about_canopen/about_canopen.shtml)
Many details and examples are also provided in the ElmoMC (also see [Elmo solo whistle](elmo_solo_whistle.md) ) which implements the CANopen stack on its drivers.

## SDO

Each node in the network has  'service data objects' dictionary entries. 
The structure is similar to a fixed-size key-value storage with index and subindex. Some entries are read-only, others can be modified by other node writes.
SDO also defines the communication protocol that allows to exchange this values. Values in the dictionary can be, for instance:
 - current motor speed
 - current motor temperature
 - target speed 
 - constant info (like serial number, manufacter etc...)

## CAN ID

The original CAN ID (A Version) is **11**-bit long, so 2^11 nodes could be allocated. However CANopen splits the CAN ID in two part and is renamed **COB-ID**
 - The first part (0-7 bits) is the **Node ID**, so only 2^7 nodes can be used.
 - The second part (8-11 bits) is the **function code**, and is used to indicate which the COB type (e.g. SDO, PDO, SYNC, NMT)

## Download and Upload
These term are used in the protocol description and they may seem against **usual conventions**. Here we provide some examples: 

During a **SDO download**, a **client** writes data to a **server**. Once the data is received by the **server**, the **server** sends an acknowledge message. 

During a **SDO upload** service, a **client** asks data to a **server**. When the **server** receives the request, it sends back the data.

An example of these process can be found [here](http://canopensolutions.com/english/about_canopen/device_configuration_canopen.shtml)
