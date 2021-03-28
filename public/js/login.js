/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

class LoginScreen extends Phaser.Scene{
    constructor(){
        super({key: "LoginScreen"});
    }

    preload() {
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);
    }

    create() {
        this.usernameText = scene.add.rexInputText(100, 100, 100, 50, config);
        this.password = scene.add.rexInputText(100, 200, 100, 50, config);
    
        this.helloButton = this.add.text(100, 300, 'Hello Phaser!', this.onLogin, this, 2, 1, 0);
        helloButton.setInteractive();
    }
    update(){
    }

    onLogin(){
        client.login(this.usernameText.text, this.password.text);
    }
}
