# CAN - wiring

## BUS

Wiring schematics:

![can wiring](/uploads/can-wiring.png)

*from [Controller Area Network Physical Layer Requirements - Texas Instruments](http://www.ti.com/lit/an/slla270/slla270.pdf)*

### cPCI-7841

The [cPCI-7841](cpci-7841.md) card provides one of the two **120Ω** resistences at the end of its connector:

![cpci-7841-resistor](/uploads/can-wiring-cpci7841-jumpers.png)

JP1 enables the terminal resistor for port0 and JP2 enables the terminal resistor for port1

![cpci-7841-connectors](/uploads/can-wiring-cpci7841-connector.png)

### Elmo solo whistle

The [Elmo solo whistle](elmo_solo_whistle.md) drive has two CAN ports, a CANin and a CANout. The ports are **not** isolated and they do **not** have any terminal resistor.

![elmo main power](/uploads/can-wiring-elmo-main-power.png)
![elmo can ports](/uploads/can-wiring-elmo-can-ports.png)


## Troubleshooting

Network problems are often caused by not using proper termination at both ends, wrong bit rates for cable lengths,
incorrectly installed cables, and poor signal quality

We have an arduino [ArCan](http://www.arcan.es/) shield that we can use for debugging (e.g. print CAN packet as they arrive)

[ArCan library code](http://forja.rediris.es/frs/download.php/1222/ArCan_v1.00.tar.gz)

For reference and a copy of the ArCan library, checkout the firmware of the rover 1.0, on our google drive.

warning: The ArCan shield requires different wiring for Arduino Mega, see Antonello Tartamo Thesis

[ArCan software Manual](https://forja.rediris.es/docman/view.php/443/847/Manual%20Software_A5_v2.pdf)
[ArCan hardware Manual](https://forja.rediris.es/docman/view.php/443/846/Manual%20Hardware_A5_v4.pdf)

## Examples

[](https://www.youtube.com/watch?v=f5lvxXVYxKY)

## Links

[CANOpen](can_open.md)
[Controller Area Network Physical Layer Requirements - Texas Instruments](http://www.ti.com/lit/an/slla270/slla270.pdf)*

