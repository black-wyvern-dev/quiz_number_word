/*
 * Author: Jerome Renaux
 * E-mail: jerome.renaux@gmail.com
 */

class ProfileScreen extends Phaser.Scene{
    constructor(){
        super({key: "ProfileScreen"});
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
        this.load.plugin('rexcanvasplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexcanvasplugin.min.js', true);
        this.load.plugin('rexfilechooserplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexfilechooserplugin.min.js', true);
        this.load.plugin('rexinputtextplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexinputtextplugin.min.js', true);

        this.avatar = "";
    }

    create() {
        this.cameras.main.fadeIn(1000, 16, 110, 173);
        // Create button
        var button = this.add.image(540,400,'EmptyUser').setOrigin(0.5,0.5);
        // Create canvas   
        var canvas = this.add.rexCanvas(540, 400, 300, 300).setOrigin(0.5,0.5);
        canvas.fitTo = (function (parent) {
            var newSize = FitTo(this, parent, true);
            this.setDisplaySize(newSize.width, newSize.height);
        }).bind(canvas)
        this.userAvatar_cover = this.add.image(540,400,'avatar_cover').setDepth(5);

        var self = this;
        // Create a transparent file chooser
        this.add.rexFileChooser({
            accept: 'image/*'
        })
        .syncTo(button)
        .on('change', function (gameObject) {
            var files = gameObject.files;
            if (files.length === 0) {
                self.avatar = "";
                return;
            }

            var url = URL.createObjectURL(files[0]);
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function () {
                self.avatar = reader.result;
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
            canvas.loadFromURLPromise(url)
                .then(function () {
                    URL.revokeObjectURL(url);
                    canvas.fitTo(button);
                });
        });
        
        this.userNameImage = this.add.image(540,700,'InputBack');
        this.userName = this.add.rexInputText(540, 700, 620, 70, 
            {
                text:'admin',
                type:'text',
                fontSize: '64px',
                fontFamily: 'RR',
                color: '#000000',
            })
        .setOrigin(0.5,0.5);

        this.userNameText = this.add.text(210, 635, 'Username', { fixedWidth: 200, fixedHeight: 32 })
        .setStyle({
            fontSize: '28px',
            fontFamily: 'RR',
            fontWeight: 'bold',
            color: '#ffffff',
        })
        .setOrigin(0,0.5);

        this.emailImage = this.add.image(540,850,'InputBack');
        this.email = this.add.rexInputText(540, 850, 620, 70, 
        {
            text:'',
            type:'text',
            fontSize: '64px',
            fontFamily: 'RR',
            color: '#000000',
        })
        .setOrigin(0.5,0.5);
        this.emailText = this.add.text(210, 785, 'Email', { fixedWidth: 200, fixedHeight: 32 })
        .setStyle({
            fontSize: '28px',
            fontFamily: 'RR',
            fontWeight: 'bold',
            color: '#ffffff',
        })
        .setOrigin(0,0.5);

        this.passwordImage = this.add.image(540,1000,'InputBack');
        this.password = this.add.rexInputText(540, 1000, 620, 70, 
            {
                text:'1234',
                type:'password',
                fontSize: '64px',
                fontFamily: 'RR',
                color: '#000000',
            })
        .setOrigin(0.5,0.5);
        this.passwordText = this.add.text(210, 935, 'Password', { fixedWidth: 200, fixedHeight: 32 })
        .setStyle({
            fontSize: '28px',
            fontFamily: 'RR',
            fontWeight: 'bold',
            color: '#ffffff',
        })
        .setOrigin(0,0.5);

        this.registerButton = this.add.image(540,1200,'SignUp1');
        this.registerButton.setInteractive().on('pointerdown', () => {
            Client.register(this.userName.text, this.email.text, this.password.text, this.avatar);
        });

        this.mainPageButton = this.add.image(540,1400,'MainPage');
        this.mainPageButton.setInteractive().on('pointerdown', () => {
            this.cameras.main.fadeOut(1000, 16, 110, 173);
            this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, (cam, effect) => {
                game.scene.stop('ProfileScreen');
                game.scene.start('HomeScreen');
            });
        });
    }

    update(){
    }
}

var FitTo = function (child, parent, out) {
    if (out === undefined) {
        out = {};
    } else if (out === true) {
        out = globalSize;
    }

    if ((child.width <= parent.width) && (child.height <= parent.height)) {
        out.width = child.width;
        out.height = child.height;
        return out;
    }

    var childRatio = child.width / child.height;
    out.width = Math.min(child.width, parent.width);
    out.height = Math.min(child.height, parent.height);
    var ratio = out.width / out.height;

    if (ratio < childRatio) {
        out.height = out.width / childRatio;
    } else if (ratio > childRatio) {
        out.width = out.height * childRatio;
    }

    return out;
}

var globalSize = {};
