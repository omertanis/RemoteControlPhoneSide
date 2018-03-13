import bluetooth
# -*- coding: utf-8 -*-

server_sock=bluetooth.BluetoothSocket( bluetooth.RFCOMM )
server_sock.bind(("",bluetooth.PORT_ANY))
server_sock.listen(1)


bluetooth.advertise_service(server_sock, "helloService",
                     service_classes=[bluetooth.SERIAL_PORT_CLASS],
                     profiles=[bluetooth.SERIAL_PORT_PROFILE])

client_sock, address = server_sock.accept()
print "Accepted connection from ",address


while True:
    try:
        data = client_sock.recv(1024)
        if data != "":
            print(data)
            datas = []
            datas = data.split("/")

            # if mouse
            if(datas[0] == "mouse"):
                from pynput.mouse import Button, Controller
                mouse = Controller()
                if(datas[1] == "left"):
                    mouse.press(Button.left)
                    mouse.release(Button.left)
                elif(datas[1] == "right"):
                    mouse.press(Button.right)
                    mouse.release(Button.right)
                else:
                    mouseX, mouseY = (mouse.position)
                    mouse.position = (mouseX + (int(datas[1])/5), (mouseY +int(datas[2])/5))
            # if keyboard
            else:
                from pynput.keyboard import Key, Controller
                keyboard = Controller()
                if (datas[0]) == "Backspace":
                    keyboard.press(Key.backspace)
                else:
                    keyboard.press(datas[0])
                    keyboard.release(datas[0])




            # if data == "left":
            #     mouse.press(Button.left)
            #     mouse.release(Button.left)
            #
            # if data == "right":
            #     mouse.press(Button.right)
            #     mouse.release(Button.right)
            #
            # x,y = data.split("/")
            # mouseX, mouseY = (mouse.position)
            # mouse.position = (int(float(x))*5, int(float(y))*2)

            # if data == "Backspace":
            #     keyboard.press(Key.backspace)
            # else:
            #     keyboard.press(data)
            #     keyboard.release(data)
        else:
            print "connection lost"
            client_sock, address = server_sock.accept()
            print "Accepted connection from ", address
    except Exception as e:
        print(e)
        pass



    # client_sock.send("warning")
    # time.sleep(3)
    # print(count)
    # count = count+1



# 192.168.137.28