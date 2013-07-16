from mindwavesocket import app
from gevent import monkey
from socketio.server import SocketIOServer


monkey.patch_all()

PORT = 7000

if __name__ == '__main__':
    print 'Listening on http://127.0.0.1:%s and on port 10843 (flash policy server)' % PORT
    SocketIOServer(('0.0.0.0', PORT), app, resource="socket.io").serve_forever()
