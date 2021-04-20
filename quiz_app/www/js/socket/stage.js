Client.stage_start = function(){
    Client.socket.emit('stage_start', {username : userData.userName});
};

Client.stage_end = function(isWin){
    if(isWin)
        Client.socket.emit('standalone_end', {username : userData.userName, heart:1, point:cur_point, coin:1});
};

Client.socket.on('stage_start',function(data){
    if(data.result)
    {
        if(game.scene.isActive('HomeScreen'))
        {
            gameData = data.gameData;
            game_type = "stage";
            game_state = "";
            cur_number = 0;
            cur_word = 0;
            cur_point = 0;
            game.scene.stop('HomeScreen');
            game.scene.start('NumberGameScreen');
        }
        else if(game.scene.isActive('EndScreen'))
        {
            gameData = data.gameData;
            game_type = "stage";
            game_state = "";
            cur_number = 0;
            cur_word = 0;
            cur_point = 0;
            game.scene.stop('EndScreen');
            game.scene.start('NumberGameScreen');
        }
        console.log(data);
    }
    else
    {
        game.scene.getScene('HomeScreen').toast_stage_failed();
        console.log('failed');
    }
});
