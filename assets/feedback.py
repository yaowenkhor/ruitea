from flask import Flask
from flask_socketio import SocketIO, emit
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

def handle_rating_response(rating):
    match rating:
        case 5:
            return "Thank you for the 5-star rating! We're thrilled you had a fantastic experience."
        case 4:
            return "Thank you for the 4-star review. We're delighted to hear you enjoyed your experience. Your feedback is valuable."
        case 3:
            return "Thanks for the 3-star rating! We're glad you had a positive experience. We'd love to hear how we can improve for your next visit."
        case 2:
            return "Thank you for your feedback. We apologize for the inconvenience and are committed to improving"
        case 1:
            return "Thank you for your feedback. We apologize for the inconvenience and are committed to improving"    
        case _:
            return "Thank you for your feedback!"

@socketio.on('connect', namespace='/feedback')
def handle_connect_feedback():
    print('Connected to /feedback')

@socketio.on('client_connected', namespace='/feedback')
def handle_connect_connected_feedback(json):
    print('Connection Status: {}'.format(json['connected']))

@socketio.on('client_send', namespace='/feedback')
def handle_client_send_feedback(json):
    feedback = json['feedback']
    rating = int(feedback['rating']) 
    print(rating)

    rating_response = handle_rating_response(rating)

    emit_reply_response(rating_response)

def emit_reply_response(rating_response):
    emit('server_send', json.dumps({
        'rating_response' : rating_response
    }), namespace='/feedback')


if __name__ == '__main__':
   socketio.run(app, port=5001, debug=True)