import eventlet
eventlet.monkey_patch()

from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect', namespace='/order')
def handle_connect_order():
    print('Connected to /order')
    
@socketio.on('client_connected', namespace='/order')
def handle_connect_connected_order(json):
    print('Connection Status: {}'.format(json['connected']))
    
@socketio.on('client_send', namespace='/order')
def handle_client_send_order(json):
    order = json['order']
    order_number = order['order_number']
    items = order.get('items', [])
    
    statuses = ["Preparing", "Ready to pick up"]
     
    #Calculate delivering time 
    item_count = sum(item.get('quantity', 1) for item in items)
    preparingTime = 5 * item_count 
    
    emit_preparing_result(preparingTime, order_number, statuses)

def emit_preparing_result(preparingTime, order_number, statuses):
    for status in statuses:
        emit('server_send', json.dumps({
            'order_number': order_number,
            'status': status
        }), namespace='/order')
        socketio.sleep(preparingTime)
    
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000, debug=True)
    