import socket

serversocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serversocket.bind(('192.168.2.69', 8089))
serversocket.listen(5) # become a server socket, maximum 5 connections
connection, address = serversocket.accept()
print 'Connection address:', address
while True:
    buf = connection.recv(64)
    print(buf)

# #!/usr/bin/env python
#
# import socket
#
#
# TCP_IP = '192.168.2.69'
# TCP_PORT = 5005
# BUFFER_SIZE = 20  # Normally 1024, but we want fast response
#
# s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
# s.bind((TCP_IP, TCP_PORT))
# s.listen(1)
#
# conn, addr = s.accept()
# print 'Connection address:', addr
# print conn
# conn.send("lol")
# while 1:
#     print("while true")
#     data = conn.recv(1024)
#     print "received data:", data
# conn.close()