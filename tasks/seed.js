const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const puzzle = require('./puzzle');
const users = data.users;
const rooms = data.rooms;
const words = data.words;

async function main() {


    const db = await dbConnection();
    // await db.dropDatabase();

    await words.addWord({word: 'ROCKET', matchArray: ['OK', 'OCR']});
    await words.addWord({word: 'COMPUTER', matchArray: ['COM', 'PUT', 'POT', 'ROM', 'ROME']});
    await words.addWord({word: 'NATION', matchArray: ['NAT', 'NIT', 'NOT', 'TON', 'NAN']});
    // await words.removeword('Rocket');

    // let isAdded = await users.addUser({username: "testuser", password: "1234", email: "testuser@gmail.com"});
    // if (isAdded) console.log('user Added');
    // else console.log("user not added");

    // await users.startStage('testuser2');

    // isAdded = await users.addUser({username: "testuser2", password: "1234", email: "testuser2@gmail.com"});
    // if (isAdded) console.log('user Added');
    // else console.log("user not added");

    // let addedData = await rooms.createRoom('createuser');
    // if (addedData) console.log(`room created: ${JSON.stringify(addedData)}`);
    // else console.log('room not created');

    // let result = await rooms.getRooms();
    // if (result) console.log(result);

    // result = await rooms.joinRoom(addedData.id, 'joinuser');
    // if (result) console.log(`user joined: ${JSON.stringify(result)}`);
    // else console.log('user is not joined');

    // result = await rooms.getRooms();
    // if (result) console.dir(result, { 'maxArrayLength': null, depth: null });

    // result = await rooms.readyUser(addedData.id, 'joinuser');
    // if (result) console.log(`user id ready: ${JSON.stringify(result)}`);
    // else console.log('user is not ready');

    // result = await rooms.getRooms();
    // if (result) console.dir(result, { 'maxArrayLength': null, depth: null });

    // result = await rooms.startRoom(addedData.id);
    // if (result) console.log(`room started: ${JSON.stringify(result)}`);
    // else console.log('room is not started');

    // result = await rooms.getRooms();
    // if (result) console.log(result);

    // result = await rooms.removeRoom(addedData[0].id);
    // if (result) console.log('room removed');
    // else console.log('room is not removed');

    console.log('Done seeding database');

    await db.serverConfig.close();
}

main();