//
//  ViewController.swift
//  AudioPlayer
//
//  Created by Freddie Tibbles on 23/11/2015.
//  Copyright © 2015 TibblesScribbles. All rights reserved.
//

import UIKit
import AVFoundation

class ViewController: UIViewController {
    
    @IBOutlet weak var PausePlay: UIButton!
    
    var ButtonAudioPlayer: AVAudioPlayer = AVAudioPlayer()
    var errorHandler : NSError? = nil

    override func viewDidLoad() {
        super.viewDidLoad()

        try! ButtonAudioPlayer = AVAudioPlayer(contentsOfURL: NSURL(string: NSBundle.mainBundle().pathForResource("TheReach", ofType: "mp3")!)!)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func PlayAudio1(sender: AnyObject) {
        ButtonAudioPlayer.play()
    }

    @IBAction func PausePlay(sender: AnyObject) {
        
        if (ButtonAudioPlayer.playing == true) {
            PausePlay.setTitle("Play", forState: UIControlState.Normal)
            ButtonAudioPlayer.pause()
        }else {
            PausePlay.setTitle("Pause", forState: UIControlState.Normal)
            ButtonAudioPlayer.play()
        }
    }

    @IBAction func Restart(sender: AnyObject) {
        ButtonAudioPlayer.stop()
        ButtonAudioPlayer.currentTime = 0
        ButtonAudioPlayer.play()
    }
}

