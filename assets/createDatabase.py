import sqlite3
db = sqlite3.connect('ruitea.sqlite')

db.execute('DROP TABLE IF EXISTS users')
db.execute('DROP TABLE IF EXISTS drinks')
db.execute('DROP TABLE IF EXISTS cart')

db.execute('''CREATE TABLE users(
    user_id integer PRIMARY KEY,
    email text NOT NULL UNIQUE,
    name text NOT NULL,
    phone text NOT NULL,
    password text NOT NULL
    )''')

db.execute('''CREATE TABLE drinks(
    drink_id integer PRIMARY KEY,
    name text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    image text NOT NULL, 
    tag text NOT NULL
    )''')

db.execute('''CREATE TABLE cart(
    cart_id integer PRIMARY KEY,
    user_id integer NOT NULL,
    drink_id integer NOT NULL,
    quantity integer NOT NULL,
    size text NOT NULL,
    sugar text NOT NULL,
    UNIQUE(user_id, drink_id, size, sugar)
    )''')

cursor = db.cursor()

db.commit();
db.close();






