import sqlite3
from flask import Flask, jsonify, request
import bcrypt

app = Flask(__name__)

DB = 'ruitea.sqlite'

# Function to convert a database row to a dictionary
def get_row_as_dict(row):
    row_dict = {
        'id': row[0],
        'email': row[1],
        'name': row[2],
        'phone': row[3],
    }

    return row_dict

# Function to hash password
def hash_password(password):
    bytes = password.encode('utf-8')
    salt = bcrypt.gensalt()
    hash = bcrypt.hashpw(bytes, salt) 
    
    return hash

# Route to handle POST request to create new user account
@app.route('/api/user/create', methods=['POST'])
def create_user():
    
    if not request.json:
        return jsonify({"error": "No JSON data is provided"})
       
    hash = hash_password(request.json['password'])
    
    new_user = (
        request.json['email'],
        request.json['name'],
        request.json['phone'],
        hash
    )
    
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    
    if(cursor.execute('SELECT * FROM users WHERE email=?',(request.json['email'],))).fetchone():
        return jsonify({"error": "Email already registered. Please try again"}), 409
    
    cursor.execute('''
        INSERT INTO users(email,name,phone,password)
        VALUES(?,?,?,?)
    ''', new_user)
    
    db.commit()
    db.close()
    
    return jsonify({"success": "User successfully created"}), 201

# Route to handle PUT request to update user details
@app.route('/api/user/update/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    if not request.json:
        return jsonify({"error": "No JSON data is provided"})

    db = sqlite3.connect(DB)
    cursor = db.cursor()

    name = request.json.get('name')
    phone = request.json.get('phone')
    password = request.json.get('password')

    if password:
        hashed = hash_password(password)
        cursor.execute('''
            UPDATE users SET name=?, phone=?, password=? WHERE user_id=?
        ''', (name, phone, hashed, user_id))
    else:
        cursor.execute('''
            UPDATE users SET name=?, phone=? WHERE user_id=?
        ''', (name, phone, user_id))

    db.commit()
    db.close()
    return jsonify({"success": "User successfully updated"}), 201

# Route to handle GET request to retrieve user details
@app.route('/api/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    
    if not (cursor.execute('SELECT user_id, email, name, phone FROM users WHERE user_id=?', (user_id,))).fetchone():
        return jsonify({"error": "User not found"})
    
    cursor.execute('SELECT user_id, email, name, phone FROM users WHERE user_id=?', (user_id,))
    row = cursor.fetchone()
    
    db.close()
    
    return jsonify(get_row_as_dict(row)), 200

# Route to handle POST request for user login
@app.route('/api/user/login', methods=['POST'])
def user_login():
    
    if 'email' not in  request.json or 'password' not in request.json:
        return jsonify({"error": "No JSON data is provided or some field is missing"})
        
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    
    user = cursor.execute('SELECT user_id, email, name, phone, password FROM users WHERE email=?',(request.json['email'],)).fetchone()
    
    if not user:
         return jsonify({"auth": False, "error": "Invalid credentials"}), 401
     
    userBytes = request.json['password'].encode('utf-8') 
    
    stored_hash = user[4]

    user_data ={
        'user_id': user[0],
        'email': user[1],
        'name': user[2],
        'phone': user[3]
    }
    
    if bcrypt.checkpw(userBytes, stored_hash):
        print('true')
        print(user_data)
        return jsonify({"auth": True, "success": "Successfully login", "user": user_data}), 200
    else:
        print('false')
        return jsonify({"auth": False, "error": "Invalid credentials"}), 401

        
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5003)

    


