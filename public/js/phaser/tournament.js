/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

class TournamentScreen extends Phaser.Scene{
    constructor(){
        super({key: "TournamentScreen"});
        this.userList = [];
        this.pointList = [];
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        this.userName = this.add.text(50, 100, userData.username, { fixedWidth: 100, fixedHeight: 36 });
        
        if(userData.username == tournamentData.userName)
        {
            this.startButton = this.add.text(150, 100, 'start');
            this.startButton.setInteractive().on('pointerdown', () => {
                Client.start();
            });
        }
        else{
            this.readyButton = this.add.text(150, 100, 'unReady');
            this.readyButton.setInteractive().on('pointerdown', () => {
                Client.ready();
            });
        }

        var plus=0;
        if(userData.username != tournamentData.userName)
        {
            plus=1;
            this.userList.push(this.add.text(50, 150, tournamentData.userName, { fixedWidth: 100, fixedHeight: 36 }));
            this.stateList.push(this.add.text(150, 150, 'Creator', { fixedWidth: 100, fixedHeight: 36 }));
        }
        for(let i = 0; i<tournamentData.joinUsers.length; i++)
        {
            if(tournamentData.joinUsers[i].userName == userData.username)
                continue;
            this.userList.push(this.add.text(50, 100 + (i+1+plus)*50, tournamentData.joinUsers[i].userName, { fixedWidth: 100, fixedHeight: 36 }));
            this.stateList.push(this.add.text(150, 100 + (i+1+plus)*50, tournamentData.joinUsers[i].isReady?'Ready' : 'unReady', { fixedWidth: 100, fixedHeight: 36 }));
        }
    }
    update(){
        var plus=0;
        if(userData.username != tournamentData.userName)
        {
            plus=1;
        }
        for(let i=0; i<tournamentData.joinUsers.length; i++)
        {
            if(tournamentData.joinUsers[i].userName == userData.username)
            {
                if(tournamentData.joinUsers[i].isReady)
                {
                    this.readyButton.setText('Ready');
                    this.readyButton.setInteractive(false);
                }
                continue;
            }
            if(i>=this.userList.length-plus)
            {
                this.userList.push(this.add.text(50, 100 + (i+1+plus)*50, tournamentData.joinUsers[i].userName, { fixedWidth: 100, fixedHeight: 36 }));
                this.stateList.push(this.add.text(150, 100 + (i+1+plus)*50, tournamentData.joinUsers[i].isReady?'Ready' : 'unReady', { fixedWidth: 100, fixedHeight: 36 }));
                continue;
            }
            if(tournamentData.joinUsers[i].userName != this.userList[i+plus].text)
            {
                let deleted_item = this.userList.splice(i+plus);
                deleted_item.destroy();
                deleted_item = this.stateList.splice(i+plus);
                deleted_item.destroy();
                continue;
            }
            if(this.stateList[i+plus].text == 'unReady' && tournamentData.joinUsers[i].isReady)
                this.stateList[i+plus].setText('Ready');
            this.userList[i+plus].setPosition(50, 100 + (i+1+plus)*50);
            this.stateList[i+plus].setPosition(150, 100 + (i+1+plus)*50);
        }
    }
}
