//
//  PlayScreenViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit
import AVFoundation

class PlayScreenViewController: UIViewController {
    
    var player = AVPlayer()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "PlayScreenToTrackListings")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeGestureRecognizer)
        
        self.setupPlayer()
    }
    
    func PlayScreenToTrackListings() {
        self.performSegueWithIdentifier("PlayScreenSegueUnwind", sender: self)
    }
    
    func setupPlayer() {
        
        let url = NSURL(string: "https://api.soundcloud.com/tracks/244967972/stream")
        let playerItem = AVPlayerItem(URL:url!)
        self.player = AVPlayer(playerItem: playerItem)
        
        self.player.rate = 1.0
        player.play()
        
    }

}
