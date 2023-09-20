import 'phaser';

// import space3 from '../assets/space3.png'
import field from '../assets/field.jpg';
// @ts-ignore
import bee from '../assets/bees/bee-hero.png';

// import buzzz from '../assets/buzzz.m4a'
import butterfly2 from '../assets/butterflies/2.png'
import butterfly3 from '../assets/butterflies/3.png'
import butterfly4 from '../assets/butterflies/4.png'
import butterfly5 from '../assets/butterflies/5.png'
import butterfly6 from '../assets/butterflies/6.png'
import butterfly7 from '../assets/butterflies/7.png'
import butterfly8 from '../assets/butterflies/8.png'
import butterfly9 from '../assets/butterflies/9.png'
import butterfly10 from '../assets/butterflies/10.png'
import bubble from '../assets/bubble.png';
import red from '../assets/red.png'
import ouch from '../assets/ouch.png'

// import AudioFile from '../assets/fsm-team-happy-days.mp3'

import happier from '../assets/audio/2tech-audio-happier.mp3';
import together from '../assets/audio/2tech-audio-together.mp3';
import carefree from '../assets/audio/fsm-team-carefree-play.mp3';
import friends from '../assets/audio/fsm-team-friends-forever.mp3';
import sunny from '../assets/audio/fsm-team-sunny-morning.mp3';
import happy from '../assets/audio/fsm-team-we-are-happy.mp3';
import commercial from '../assets/audio/maxkomusic-happy-commercial.mp3';
// import ukulele from '../assets/audio/maxkomusic-ukulele-and-piano.mp3'
// import asleep from '../assets/audio/fall-asleep-like-a-baby-relax-music-blubon-relaxon-9643.mp3';
// import forest from '../assets/audio/forest-lullaby-110624.mp3';
// import inside from '../assets/audio/inside-you-162760.mp3';
// import kids from '../assets/audio/kids-117853.mp3';
// import sunshine from '../assets/audio/sunshine-108600.mp3';
// import surf from '../assets/audio/surf-house-productions-sea-and-sun.mp3';
// import twinkle from '../assets/audio/twinkle-like-a-star-8026.mp3';

enum AudioFile {
    HAPPIER = 'happier',
    TOGETHER = 'together',
    CAREFREE = 'carefree',
    FRIENDS = 'friends',
    SUNNY = 'sunny',
    HAPPY = 'happy',
    COMMERCIAL = 'commercial',
    ASLEEP = 'asleep',
    FOREST = 'forest',
    INSIDE = 'inside',
    KIDS = 'kids',
    UKULELE = 'ukulele',
    SUNSHINE = 'sunshine',
    SURF = 'surf',
    TWINKLE = 'twinkle'
}

export default class MainScene extends Phaser.Scene {

    main_audio: Phaser.Sound.BaseSound = null as any;

    constructor() {
        super('main')
    }

    preload() {
        // this.load.setBaseURL('https://labs.phaser.io')

        this.load.image('bee', bee);
        this.load.image('red', red);
        this.load.image('ouch', ouch);
        this.load.image('sky', field);
        this.load.image('bubble', bubble);
        this.load.image('butterfly2', butterfly2);
        this.load.image('butterfly3', butterfly3);
        this.load.image('butterfly4', butterfly4);
        this.load.image('butterfly5', butterfly5);
        this.load.image('butterfly6', butterfly6);
        this.load.image('butterfly7', butterfly7);
        this.load.image('butterfly8', butterfly8);
        this.load.image('butterfly9', butterfly9);
        this.load.image('butterfly10', butterfly10);

        this.load.audio(AudioFile.HAPPIER, [happier], { instances: 1 });
        this.load.audio(AudioFile.TOGETHER, [together], { instances: 1 });
        this.load.audio(AudioFile.CAREFREE, [carefree], { instances: 1 });
        this.load.audio(AudioFile.FRIENDS, [friends], { instances: 1 });
        this.load.audio(AudioFile.SUNNY, [sunny], { instances: 1 });
        this.load.audio(AudioFile.HAPPIER, [happy], { instances: 1 });
        this.load.audio(AudioFile.COMMERCIAL, [commercial], { instances: 1 });
        // this.load.audio(AudioFile.UKULELE, [ukulele], { instances: 1 });
        // this.load.audio(AudioFile.ASLEEP, [asleep], { instances: 1 });
        // this.load.audio(AudioFile.FOREST, [forest], { instances: 1 });
        // this.load.audio(AudioFile.INSIDE, [inside], { instances: 1 });
        // this.load.audio(AudioFile.KIDS, [kids], { instances: 1 });
        // this.load.audio(AudioFile.SUNSHINE, [sunshine], { instances: 1 });
        // this.load.audio(AudioFile.TWINKLE, [twinkle], { instances: 1 });
        // this.load.audio(AudioFile.SURF, [surf], { instances: 1 });
    }

    create() {
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'sky')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        /*
            Create the BumbleBee
        */
        const rn = this.randomRange(0, 1000)
        const bf = this.physics.add.sprite(50 + rn, 50 + rn, `bee`)
        scale = this.randomRange(.05, .15);
        bf.setScale(scale);

        // @ts-ignore
        bf.setInteractive().on('pointerdown', function (pointer, localX, localY, event) {
            // @ts-ignore
            // const sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this;
            // const scene: MainScene = sprite.scene as MainScene;

            // scene.

            alert('ouch!')
            // this.destroy()
        });

        const hv = this.randomRange(1, 100)  // horizontal
        const vv = this.randomRange(101, 200)  // vertical
        bf.setVelocity(hv, vv)
        bf.setBounce(1, 1)
        bf.setCollideWorldBounds(true)


        /*
            Add Butterflies
        */
        for (let i = 2; i < 8; i++) {
            const rn = this.randomRange(0, 1000) // random location
            const bf = this.physics.add.sprite(50 + rn, 50 + rn, `butterfly${i}`);

            bf.setCollideWorldBounds(true)

            // Adjust the scale randomly
            const scale = this.randomRange(.3, .6);
            bf.setScale(scale);

            // Adjust the direction randomly
            const hv = this.randomRange(1, 100)  // horizontal
            const vv = this.randomRange(101, 200)  // vertical
            bf.setVelocity(hv, vv)

            // Adjust the bounce randomly
            // TODO
            /*
                Need to model this butterfly in a class and encapsulate this noise here
                Phaser is a black box that renders whatever I tell it to render
                So how will I keep track of what I want to render?
                In this case I have X bf 1 bb 1 bubble 1 ouch and sound files
                I need to model my world into objects and iterate those objects for 
                changes required.  I need my own loop.  I need reactive programming.
                
                Ok, I will finally learn RxJS.  I did really good with a small topic but
                I got it, so I'll be fine.




            */
            bf.setBounce(1, 1)

            // @ts-ignore
            bf.setInteractive().on('pointerdown', async function (pointer, localX, localY, event) {
                // is very weird how this is a sprite right now....
                // @ts-ignore
                const sprite: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody = this;
                const scene: MainScene = sprite.scene as MainScene;

                sprite.setTexture('bubble');
                scene.destroyThat(sprite, 1000, 4000);
            }); // if this pass as 3rd this above is MainScene otherwise the sprite

            // emitter.startFollow(butterfly)
            // bf.addListener('keydown', (event: any) => {
            //     alert(event);
            // })
        }

        this.sound.pauseOnBlur = false;
        const soundIndex = this.randomRange(0,  6, true);
        switch (soundIndex) {
            case 0:
                this.main_audio = this.sound.add(AudioFile.CAREFREE, { loop: true });
                break;
            case 1:
                this.main_audio = this.sound.add(AudioFile.COMMERCIAL, { loop: true });
                break;
            case 2:
                this.main_audio = this.sound.add(AudioFile.FRIENDS, { loop: true });
                break;
            case 3:
                this.main_audio = this.sound.add(AudioFile.HAPPIER, { loop: true });
                break;
            case 4:
                this.main_audio = this.sound.add(AudioFile.HAPPY, { loop: true });
                break;
            // case 5:
            //     this.main_audio = this.sound.add(AudioFile.SEA, { loop: true });
            //     break;
            case 6:
                this.main_audio = this.sound.add(AudioFile.SUNNY, { loop: true });
                break;
            case 7:
                this.main_audio = this.sound.add(AudioFile.TOGETHER, { loop: true });
                break;
            case 8:
                this.main_audio = this.sound.add(AudioFile.UKULELE, { loop: true });
                break;
            case 9:
                this.main_audio = this.sound.add(AudioFile.ASLEEP, { loop: true });
                break;
            case 10:
                this.main_audio = this.sound.add(AudioFile.FOREST, { loop: true });
                break;
            case 11:
                this.main_audio = this.sound.add(AudioFile.INSIDE, { loop: true });
                break;
            case 12:
                this.main_audio = this.sound.add(AudioFile.KIDS, { loop: true });
                break;
            case 13:
                this.main_audio = this.sound.add(AudioFile.SUNSHINE, { loop: true });
                break;
            case 14:
                this.main_audio = this.sound.add(AudioFile.SURF, { loop: true });
                break;
            default:
                throw new Error(`Unknown Audio Index ${soundIndex}`);
                break;
        }
        this.main_audio.play();
    }

    destroyThat(that: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, min: number, max: number) {
        const millis = this.randomRange(min, max, true);
        setTimeout(() => {
            // new Promise(resolve => {
            that.destroy();
            // resolve(true);
            // });
        }, millis)
    }

    randomRange(min: number, max: number, makeInt?: boolean) {
        let cal: any = (Math.random() * (max - min) + min);
        return makeInt ? parseInt(cal) : parseFloat(cal);
    }
}


        // const particles = this.add.particles('red')

        // const emitter = particles.createEmitter({
        //     speed: 100,
        //     scale: { start: 1, end: 0 },
        //     blendMode: 'ADD',
        // })
        // const butterfly = this.physics.add.image(50, 50, 'butterfly2')
        // butterfly.setScale(.08)
        // butterfly.setVelocity(100, 200)
        // butterfly.setBounce(1, 1)
        // butterfly.setCollideWorldBounds(true)
        // emitter.startFollow(butterfly)

