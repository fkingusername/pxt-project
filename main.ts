Makercloud_Kitten.registerTopicKeyValueMessageHandler("AP5WE9Q ", function (key, value) {
    if (key == "Booking") {
        RFID_Value = value
    }
})
function UNLOCK () {
    if (powerbrick.Ultrasonic(powerbrick.Ports.PORT1) > 10) {
        powerbrick.Servo(powerbrick.Servos.S1, -45)
        powerbrick.MotorRun(powerbrick.Motors.M1, -45)
    } else {
        powerbrick.MotorStop(powerbrick.Motors.M1)
    }
}
Makercloud_Kitten.registerTopicKeyValueMessageHandler("LL3AS6C ", function (status, book_value) {
    if (status == "status") {
        if (book_value == "booked") {
            ONOFF += 1
        } else {
            basic.showIcon(IconNames.Happy)
        }
    }
})
function LIGHT () {
    if (input.lightLevel() < 180) {
        led.setBrightness(180)
    } else {
        led.setBrightness(180)
    }
}
function CHECK () {
    if (input.temperature() > 25 && input.isGesture(Gesture.ThreeG)) {
    	
    } else {
        if (time < 900) {
            book_value = ""
            if (book_value == "booked") {
                basic.showIcon(IconNames.No)
            } else {
                basic.showLeds(`
                    . # # # .
                    # . . . #
                    . . . # .
                    . . # . .
                    . . # . .
                    `)
            }
        } else {
            ONOFF = 0
            time = 0
        }
    }
}
powerbrick.RfidPresent(function () {
    Makercloud_Kitten.subscrbeTopic("AP5WE9Q")
    if (powerbrick.RfidUUID() == RFID_Value) {
        ONOFF += 1
        UNLOCK()
    }
})
input.onButtonPressed(Button.B, function () {
    ONOFF = 0
    time = 0
    basic.showString("BYE")
})
function RETURNLOCK () {
    if (powerbrick.Ultrasonic(powerbrick.Ports.PORT1) > 5) {
        powerbrick.MotorRun(powerbrick.Motors.M1, 45)
    } else {
        powerbrick.MotorStop(powerbrick.Motors.M1)
        powerbrick.Servo(powerbrick.Servos.S1, 45)
    }
}
input.onButtonPressed(Button.A, function () {
    if (time > 60) {
        basic.showNumber(time / 60)
        basic.showString("MIN")
        basic.showNumber(time % 60)
        basic.showString("S")
    } else {
        basic.showNumber(time)
        basic.showString("S")
    }
})
let book_value = ""
let RFID_Value = ""
let time = 0
let ONOFF = 0
ONOFF = 0
time = 0
Makercloud_Kitten.configRxTxPwbrick(Makercloud_Kitten.SerialPorts.PORT2)
Makercloud_Kitten.init()
Makercloud_Kitten.setupWifi("CityU_WPA", "P@ssw0rd ")
Makercloud_Kitten.connectMqtt()
basic.forever(function () {
    if (ONOFF == 0) {
        RETURNLOCK()
        Makercloud_Kitten.subscrbeTopic("LL3AS6C")
        powerbrick.RfidProbe()
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            . . . . .
            `)
        CHECK()
        LIGHT()
        time = time + 1
        basic.pause(1000)
    }
})
