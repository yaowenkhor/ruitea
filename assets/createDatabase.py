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

cursor = db.cursor()


cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(1, 'Caramel', 'Sweet caramel flavored coffee', 'Coffee', 'Caramel', 'popular', 3.99)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(2, 'Hazelnut', 'Rich hazelnut infused coffee', 'Coffee', 'Hazelnut', 'normal', 3.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(3, 'Ice Latte', 'Chilled latte perfect for hot days', 'Coffee', 'IceLatte', 'popular', 4.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(4, 'Ice Vietnamese Coffee', 'Strong Vietnamese style iced coffee', 'Coffee', 'IceVietnameseCoffee', 'new', 4.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(5, 'Mocha', 'Chocolate flavored coffee delight', 'Coffee', 'Mocha', 'normal', 4.00)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(6, 'Vanilla', 'Classic vanilla flavored coffee', 'Coffee', 'Vanilla', 'normal', 3.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(7, 'Brown Sugar Milk Tea', 'Creamy milk tea with brown sugar', 'MilkTea', 'BrownSugarMilkTea', 'popular', 4.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(8, 'Matcha Milk Tea', 'Green tea flavored milk tea', 'MilkTea', 'MatchaMilkTea', 'normal', 4.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(9, 'Milk Tea', 'Classic original milk tea', 'MilkTea', 'MilkTea', 'normal', 3.99)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(10, 'Thai Milk Tea', 'Authentic Thai style milk tea', 'MilkTea', 'ThaiMilkTea', 'new', 4.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(11, 'Ice Blended Coffee', 'Frozen blended coffee drink', 'SmoothieBlended', 'IceBlendedCoffee', 'popular', 5.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(12, 'Ice Blended Cookie And Cream', 'Cookie and cream blended delight', 'SmoothieBlended', 'IceBlendedCookieAndCream', 'new', 5.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(13, 'Ice Blended Matcha', 'Refreshing green tea blended drink', 'SmoothieBlended', 'IceBlendedMatcha', 'normal', 5.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(14, 'Ice Blended Vanilla Coffee', 'Vanilla coffee blended to perfection', 'SmoothieBlended', 'IceBlendedVanillaCoffee', 'normal', 5.00)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(15, 'Ice Blended White Chocolate', 'Creamy white chocolate blended drink', 'SmoothieBlended', 'IceBlendedWhiteChocolate', 'new', 5.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(16, 'English Breakfast Tea', 'Classic English breakfast tea', 'Tea', 'EnglishBreakfastTea', 'normal', 3.50)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(17, 'Gen Maicha', 'Japanese roasted green tea', 'Tea', 'GenMaicha', 'new', 4.00)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(18, 'Lemonade Tea', 'Refreshing tea with lemonade', 'Tea', 'LemonadeTea', 'popular', 3.75)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(19, 'Passion Fruit Tea', 'Tropical passion fruit flavored tea', 'Tea', 'PassionFruitTea', 'normal', 4.25)
''')

cursor.execute('''
    INSERT INTO drinks(drink_id, name, description, category, image, tag, price)
    VALUES(20, 'Pomegranate Tea', 'Antioxidant-rich pomegranate tea', 'Tea', 'PomegranteTea', 'new', 4.25)
''')


db.commit()
db.close()






