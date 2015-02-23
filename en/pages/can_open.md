# CANopen

CANopen is a protocol built upon CAN that allows to send messages 
and control nodes in a CAN network.

Reader is encouraged to read the entire [CANopen basic guide](http://canopensolutions.com/english/about_canopen/about_canopen.shtml)
Many details and examples are also provided in the ElmoMC (also see [Elmo solo whistle](elmo_solo_whistle.md) ) which implements the CANopen stack on its drivers.

## CAN ID

The original CAN ID (A Version) is **11**-bit long, so 2^11 nodes could be allocated. However CANopen splits the CAN ID in two part and is renamed **COB-ID**
 - The first part (0-7 bits) is the **Node ID**, so only 2^7 nodes can be used.
 - The second part (8-11 bits) is the **function code**, and is used to indicate which the COB type (e.g. SDO, PDO, SYNC, NMT)

## SDO

Each node in the network has  'service data objects' dictionary entries. 
The structure is similar to a fixed-size key-value storage with index and subindex. Some entries are read-only, others can be modified by other node writes.
SDO also defines the communication protocol that allows to exchange this values. Values in the dictionary can be, for instance:
 - current motor speed
 - current motor temperature
 - target speed 
 - constant info (like serial number, manufacter etc...)

## Download and Upload
These term are used in the protocol description and they may seem against **usual conventions**. Here we provide some examples: 

During a **SDO download**, a **client** writes data to a **server**. Once the data is received by the **server**, the **server** sends an acknowledge message. 

During a **SDO upload** service, a **client** asks data to a **server**. When the **server** receives the request, it sends back the data.

In both cases, the **client** has **COB ID** between 581h and 5FFh, the **server** between 601h and 67Fh

## PDO
PDO are a way to communicate or change values of the SDO dictionary entries in a faster way. The exchange of PDO message must be previously setup since the content of a PDO message maps to one (or more) dictionary entries.

During a **PDO Transmit (TPDO)**, a node sends a PDO message **publishing** the content of one or more dictionary entries after an event (timer, RTR message, external IO, etc...)

During a **PDO Receive (RPDO)**, a node send a PDO message **writing** one or more dictionary entries. 

**PDO** must be configured before use, see the linked guides

An example of these process can be found [here](http://canopensolutions.com/english/about_canopen/device_configuration_canopen.shtml)

## Links

[a-m-c.com/CAN_Manual](http://www.a-m-c.com/download/sw/dw300_3-0-3/CAN_Manual300_3-0-3.pdf)  - Has good schematics and message examples
