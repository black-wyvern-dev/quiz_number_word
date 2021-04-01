Client.tournament_in = function(){
    Client.socket.emit('tournament_start', {username : userData.username});
};

Client.tournament_out = function(){
    Client.socket.emit('tournament_out', {username : userData.username});
};

Client.tournament_end = function(isAlive){
    Client.socket.emit('tournament_end', {isAlive : isAlive, username : userData.username, point: cur_point});
};

Client.socket.on('tournament_in',function(data){
    if(data.result)
    {
        if(data.result.userName == userData.username)
        {
            tournamentData = data.result;
            game.scene.stop('HomeScreen');
            game.scene.start('TournamentScreen');
        }
        else{
            if(game.scene.isActive('TournamentScreen'))
            {
                let scene = game.scene.getScene('TournamentScreen');
                scene.add_user(data.result);
            }
        }
        console.log('success');
    }
    else
    {
        console.log('failed');
    }
});

Client.socket.on('tournament_out',function(data){
    if(data.result)
    {
        tournamentData = data.result;
        if(game.scene.isActive('RoomScreen'))
        {
            game.scene.getScene('RoomScreen').update();
        }
        else if(game.scene.isActive('ListScreen'))
        {
            game.scene.stop('ListScreen');
            game.scene.start('RoomScreen');
        }
        console.log(data);
    }
    else
    {
        console.log('failed');
    }
});

Client.socket.on('tournament_start',function(data){
    if(data.result)
    {
        gameData = data.gameData;
        game.scene.stop('RoomScreen');
        game.scene.start('NumberGameScreen');
        console.log(data);
    }
    else
    {
        console.log('failed');
    }
});

Client.socket.on('tournament_end',function(data){
    if(data.result)
    {
        winner_name = data.winner;
        if(game.scene.isActive('EndScreen'))
            game.scene.getScene('EndScreen').updateResult();
        else if(game.scene.isActive('WordGameScreen')){
            game.scene.stop('WordGameScreen');
            game.scene.start('EndScreen');
        }
        else if(game.scene.isActive('NumberGameScreen')){
            game.scene.stop('NumberGameScreen');
            game.scene.start('EndScreen');
        }
        console.log(data);
    }
    else
    {
        console.log('failed');
    }
});
