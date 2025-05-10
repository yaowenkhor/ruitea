import sqlite3
db = sqlite3.connect('ruitea.sqlite')

db.execute('DROP TABLE IF EXISTS users')
db.execute('DROP TABLE IF EXISTS drinks')
db.execute('DROP TABLE IF EXISTS cart')
db.execute('DROP TABLE IF EXISTS orderHistory')
db.execute('DROP TABLE IF EXISTS feedback')

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
    tag text NOT NULL,
    price numberic(5,2) NOT NULL
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

db.execute('''CREATE TABLE orderHistory(
    order_id integer PRIMARY KEY,
    user_id integer NOT NULL,
    drink_id integer NOT NULL,
    quantity integer NOT NULL,
    size text NOT NULL,
    sugar text NOT NULL,
    date text NOT NULL,
    order_number text NOT NULL,
    status text NOT NULL DEFAULT 'Preparing'
    )''')

db.execute('''CREATE TABLE feedback(
    feedback_id integer PRIMARY KEY,
    user_id integer NOT NULL,
    order_number text NOT NULL,
    rating integer NOT NULL,
    comment text
    )''')


cursor = db.cursor()


cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(1, 'Caramel', 'Sweet caramel flavored coffee', 'Coffee', 'Caramel', 'popular', 13.99)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(2, 'Hazelnut', 'Rich hazelnut infused coffee', 'Coffee', 'Hazelnut', 'normal', 13.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(3, 'Ice Latte', 'Chilled latte perfect for hot days', 'Coffee', 'IceLatte', 'popular', 14.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(4, 'Ice Vietnamese Coffee', 'Strong Vietnamese style iced coffee', 'Coffee', 'IceVietnameseCoffee', 'new', 14.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(5, 'Mocha', 'Chocolate flavored coffee delight', 'Coffee', 'Mocha', 'normal', 14.00)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(6, 'Vanilla', 'Classic vanilla flavored coffee', 'Coffee', 'Vanilla', 'normal', 13.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(7, 'Brown Sugar Milk Tea', 'Creamy milk tea with brown sugar', 'MilkTea', 'BrownSugarMilkTea', 'popular', 14.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(8, 'Matcha Milk Tea', 'Green tea flavored milk tea', 'MilkTea', 'MatchaMilkTea', 'normal', 14.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(9, 'Milk Tea', 'Classic original milk tea', 'MilkTea', 'MilkTea', 'normal', 13.99)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(10, 'Thai Milk Tea', 'Authentic Thai style milk tea', 'MilkTea', 'ThaiMilkTea', 'new', 14.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(11, 'Ice Blended Coffee', 'Frozen blended coffee drink', 'SmoothieBlended', 'IceBlendedCoffee', 'popular', 15.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(12, 'Ice Blended Cookie And Cream', 'Cookie and cream blended delight', 'SmoothieBlended', 'IceBlendedCookieAndCream', 'new', 15.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(13, 'Ice Blended Matcha', 'Refreshing green tea blended drink', 'SmoothieBlended', 'IceBlendedMatcha', 'normal', 15.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(14, 'Ice Blended Vanilla Coffee', 'Vanilla coffee blended to perfection', 'SmoothieBlended', 'IceBlendedVanillaCoffee', 'normal', 15.00)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(15, 'Ice Blended White Chocolate', 'Creamy white chocolate blended drink', 'SmoothieBlended', 'IceBlendedWhiteChocolate', 'new', 15.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(16, 'English Breakfast Tea', 'Classic English breakfast tea', 'Tea', 'EnglishBreakfastTea', 'normal', 13.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(17, 'Gen Maicha', 'Japanese roasted green tea', 'Tea', 'GenMaicha', 'new', 14.00)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(18, 'Lemonade Tea', 'Refreshing tea with lemonade', 'Tea', 'LemonadeTea', 'popular', 13.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(19, 'Passion Fruit Tea', 'Tropical passion fruit flavored tea', 'Tea', 'PassionFruitTea', 'normal', 14.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(20, 'Pomegranate Tea', 'Antioxidant-rich pomegranate tea', 'Tea', 'PomegranateTea', 'new', 14.25)
''')


db.commit()
db.close()






