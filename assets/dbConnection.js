import {
  SQLiteDatabase,
  enablePromise,
  openDatabase,
} from 'react-native-sqlite-storage';
import shortid from 'shortid';

const databaseName = 'ruitea.sqlite';

enablePromise(true);

// Connect to database
export const getDBConnection = async () => {
  return openDatabase(
    {name: `${databaseName}`, createFromLocation: `${databaseName}`},
    openCallback,
    errorCallback,
  );
};

export const getTodayDate = () =>{
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); 
    var yyyy = today.getFullYear();

    today = dd + '-' + mm + '-' + yyyy;
    return today;
}

// Drink Images object map
const drinkImageMap = {
    Caramel: require('../img/Coffee/Caramel.png'),
    Hazelnut: require('../img/Coffee/Hazelnut.png'),
    IceLatte: require('../img/Coffee/IceLatte.png'),
    IceVietnameseCoffee: require('../img/Coffee/IceVietnameseCoffee.png'),
    Mocha: require('../img/Coffee/Mocha.png'),
    Vanilla: require('../img/Coffee/Vanilla.png'),
    BrownSugarMilkTea: require('../img/MilkTea/BrownSugarMilkTea.png'),
    MatchaMilkTea: require('../img/MilkTea/MatchaMilkTea.png'),
    MilkTea: require('../img/MilkTea/MilkTea.png'),
    ThaiMilkTea: require('../img/MilkTea/ThaiMilkTea.png'),
    IceBlendedCoffee: require('../img/SmoothieBlended/IceBlendedCoffee.png'),
    IceBlendedCookieAndCream: require('../img/SmoothieBlended/IceBlendedCookieAndCream.png'),
    IceBlendedMatcha: require('../img/SmoothieBlended/IceBlendedMatcha.png'),
    IceBlendedVanillaCoffee: require('../img/SmoothieBlended/IceBlendedVanillaCoffee.png'),
    IceBlendedWhiteChocolate: require('../img/SmoothieBlended/IceBlendedWhiteChocolate.png'),
    EnglishBreakfastTea: require('../img/Tea/EnglishBreakfastTea.png'),
    GenMaicha: require('../img/Tea/GenMaicha.png'),
    LemonadeTea: require('../img/Tea/LemonadeTea.png'),
    PassionFruitTea: require('../img/Tea/PassionFruitTea.png'),
    PomegranteTea: require('../img/Tea/PomegranteTea.png')
};

export const getImage = key => drinkImageMap[key];

// Get all category drinks
export const getAllDrinks = async db => {
  try {

        const drinkData = [];
        const query = `SELECT * FROM drinks`;
        const results = await db.executeSql(query);

        results.forEach(result => {
            result.rows.raw().forEach(drink => {
                drinkData.push({...drink, image: getImage(drink.image)});
            });
        });

    return drinkData;
  } catch (error) {
        console.error(error);
        throw Error('Failed to get drinks data');
  }
};

// Get specific category drinks
export const getCategoryDrinks = async (db, category) => {
  try {

        const drinkData = [];
        const query = `SELECT * FROM drinks WHERE category=?`;
        const results = await db.executeSql(query,[category]);

        results.forEach(result => {
            result.rows.raw().forEach(drink => {
                drinkData.push({...drink, image: getImage(drink.image)});
            });
        });

        return drinkData;
  } catch (error) {
        console.error(error);
        throw Error('Failed to get drinks data');
  }
};

//Get drinks by tag
export const getTagDrinks = async (db, tag) =>{
    try {

        const drinkData = [];
        const query = `SELECT * FROM drinks WHERE tag=?`;
        const results = await db.executeSql(query,[tag]);

        results.forEach(result => {
            result.rows.raw().forEach(drink => {
                drinkData.push({...drink, image: getImage(drink.image)});
            });
        });

        return drinkData;
  } catch (error) {
        console.error(error);
        throw Error('Failed to get drinks data');
  }
}

// Add item to cart
export const addCartItem = async (db, user_id, drink_id, quantity, size, sugar) =>{
    try {

        const checkQuery = `SELECT * FROM cart WHERE user_id=? AND drink_id=? AND size=? AND sugar=?`;
        const checkResult = await db.executeSql(checkQuery,[user_id, drink_id, size, sugar]);
        const [result] = checkResult;

        if(result.rows.length > 0){
            const increaseQuery = `UPDATE cart SET quantity = quantity + ? WHERE user_id=? AND drink_id=? AND size=? AND sugar=?`;
            await db.executeSql(increaseQuery,[quantity, user_id, drink_id, size, sugar]);
        }else{
            const query = `INSERT INTO cart (user_id, drink_id, quantity, size, sugar) VALUES (?, ?, ?, ?, ?)`;
            await db.executeSql(query,[user_id, drink_id, quantity, size, sugar]);
        }   
            
    } catch (error) {
        console.error(error);
        throw Error('Failed to add item to cart');
    }
}

// Remove items from cart
export const removeCartItem = async (db, cart_id) =>{
    try {
        const query = `DELETE FROM cart WHERE cart_id=?`;
        await db.executeSql(query,[cart_id]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to delete item from cart');
    }
}

// Edit items from cart
export const updateCartItem = async (db, cart_id, quantity, size, sugar) =>{
    try {
        const query = `UPDATE cart set quantity=? ,size=? ,sugar=? WHERE cart_id=?`;
        await db.executeSql(query,[quantity, size, sugar, cart_id]);
    } catch (error) {
        console.error(error);
        throw Error('Failed to update cart item');
    }
}

// Retreive cart item
export const getCartItem = async (db, user_id) =>{
    try {

        const cartData = [];
        const query = `SELECT * FROM cart JOIN drinks ON cart.drink_id = drinks.drink_id WHERE cart.user_id=? `;
        const results = await db.executeSql(query,[user_id]);

        results.forEach(result => {
            result.rows.raw().forEach(drink => {
                cartData.push({...drink, image: getImage(drink.image)});
            });
        });

        return cartData;

    } catch (error) {
        console.error(error);
        throw Error('Failed to get cart item');
    }
}

// 
export const processCheckout = async (db, user_id) =>{
    try {
        
        const date = getTodayDate();
        const cartItems = await getCartItem(db, user_id);
        const orderNumber = shortid.generate();

        const insertQuery = `INSERT INTO orderHistory (user_id, drink_id, quantity, size, sugar, date, order_number, status) VALUES (?, ?, ?, ?, ?, ?, ?, 'Preparing')`; 

        for(const item of cartItems){
            await db.executeSql(insertQuery,[item.user_id, item.drink_id, item.quantity, item.size, item.sugar, date, orderNumber]);
        }

        const deleteQuery = `DELETE FROM cart WHERE user_id=?`;
        await db.executeSql(deleteQuery,[user_id]);

        return orderNumber;

    } catch (error) {
        console.error(error);
        throw Error('Failed to process checkout');
    }
}

export const updateOrderStatus = async (db, orderNumber, status) =>{
    try {
        const query = `UPDATE orderHistory SET status=? WHERE orderNumber=?`;
        await db.executeSql(query,[status, orderNumber]);
        return true;
    } catch (error) {
        console.error(error);
        throw Error('Failed to update order status');
    }
}

export const getOrderHistory = async (db, user_id) =>{
    try {
        const orderData = [];
        const query = `SELECT * FROM orderHistory JOIN drinks ON orderHistory.drink_id = drinks.drink_id WHERE orderHistory.user_id=? ORDER BY substr(orderHistory.date, 7, 4) DESC, substr(orderHistory.date, 4, 2) DESC, substr(orderHistory.date, 1, 2) DESC`;
        const results = await db.executeSql(query,[user_id]);

        results.forEach(result => {
            result.rows.raw().forEach(drink => {
                orderData.push({...drink, image: getImage(drink.image)});
            });
        });

        return orderData;

    } catch (error) {
        console.error(error);
        throw Error('Failed to get order history');
    }
}