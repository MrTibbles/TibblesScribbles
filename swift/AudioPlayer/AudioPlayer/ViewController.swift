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
    
    var audioUrl = NSURL(fileURLWithPath: NSBundle.mainBundle().pathForResource("TheReach", ofType: "mp3")!)
    var ButtonAudioPlayer = AVAudioPlayer()

    override func viewDidLoad() {
        super.viewDidLoad()
        ButtonAudioPlayer = AVAudioPlayer(contentsOfURL: audioUrl, fileTypeHint: "mp3", error: print("NO"))
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func PlayAudio1(sender: AnyObject) {
        ButtonAudioPlayer.play()
    }

    @IBAction func Stop(sender: AnyObject) {
        ButtonAudioPlayer.stop()
    }

    @IBAction func Restart(sender: AnyObject) {
//        ButtonAudioPlayer.
    }
}

