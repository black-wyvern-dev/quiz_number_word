/**
 * Created by Jerome on 03-03-17.
 */

var Client = {};
Client.socket = io.connect();

Client.login = function(username, password){
    Client.socket.emit('login', {username: username, password: password});
};


Client.register = function(username, email, password, avatar){
    Client.socket.emit('register', {username: username, email: email, password: password, avatar: avatar});
};


////////////////////////////////////////////////////////////////////////////

Client.socket.on('login',function(data){
    if(data.result)
    {
        userData = data.result;
        game.scene.stop('LoginScreen');
        game.scene.start('HomeScreen');
        console.log('success');
    }
    else
    {
        game.scene.getScene('LoginScreen').toast_failed();
        console.log('failed');
    }
});

Client.socket.on('register',function(data){
    if(data.result)
    {
        game.scene.stop('RegisterScreen');
        game.scene.start('LoginScreen');
        game.scene.getScene('LoginScreen').toast_register_succeed();
        console.log('success');
    }
    else
    {
        game.scene.getScene('RegisterScreen').toast_failed();
        console.log('failed');
    }
});

Client.socket.on('update_userdata',function(data){
    userData = data;
    if(game.scene.isActive('HomeScreen'))
        game.scene.getScene('HomeScreen').update();
});
