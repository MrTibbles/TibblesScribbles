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
    
    var playerItem:AVPlayerItem?
    var player:AVPlayer?
    var selectedTrackObject:TrackListing!
    @IBOutlet weak var playButton: UIButton!
    @IBOutlet weak var trackNameTextLabel: UILabel!
    @IBOutlet weak var artistNameTextLabel: UILabel!
    @IBOutlet weak var artworkBGImageView: UIImageView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "PlayScreenToTrackListings")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeGestureRecognizer)
        
        let url = NSURL(string: self.selectedTrackObject.stream_url!)
        playerItem = AVPlayerItem(URL: url!)
        player = AVPlayer(playerItem: playerItem!)
        
        let playerLayer = AVPlayerLayer(player: player!)
        playerLayer.frame = CGRectMake(0,0,10,10)
        self.view.layer.addSublayer(playerLayer)
        
        let newArtworkUrl = self.selectedTrackObject.artwork_url!.stringByReplacingOccurrencesOfString("large", withString: "t500x500")
        self.artworkBGImageView.downloadedFrom(link: newArtworkUrl, contentMode: UIViewContentMode.Center)
        
        self.trackNameTextLabel.text = self.selectedTrackObject.title
        self.artistNameTextLabel.text = self.selectedTrackObject.user    

        player!.play()
        playButton.addTarget(self, action: "playButtonTapped:", forControlEvents: .TouchUpInside)
    }
    
    func PlayScreenToTrackListings() {
        self.performSegueWithIdentifier("PlayScreenSegueUnwind", sender: self)
    }
    
    func playButtonTapped(sender: AnyObject) {
        if player?.rate == 0 {
            player!.play()
//            playButton.setImage(UIImage(named: "bla-bla.png"), forState: UIControlState.Normal)
        } else {
            player!.pause()
        }
    }


}
