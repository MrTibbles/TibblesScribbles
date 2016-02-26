//
//  PlayScreenViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit
import AVFoundation
import MediaPlayer

var playerItem:AVPlayerItem?
var player:AVPlayer?
let audioInfo = MPNowPlayingInfoCenter.defaultCenter()
let commandCenter = MPRemoteCommandCenter.sharedCommandCenter()
var nowPlayingInfo:[String:AnyObject] = [:]
var selectedTrackObject:TrackListing!

class PlayScreenViewController: UIViewController {
    
    
    @IBOutlet weak var playButton: UIButton!
    @IBOutlet weak var trackNameTextLabel: UILabel!
    @IBOutlet weak var artistNameTextLabel: UILabel!
    @IBOutlet weak var artworkBGImageView: UIImageView!
    @IBOutlet weak var durationTextLabel: UILabel!
    
    var countDownTimer = CountdownTimer(countDownFrom: 0)
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        UIApplication.sharedApplication().beginReceivingRemoteControlEvents()
        
        do {
            try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback)
            do {
                try AVAudioSession.sharedInstance().setActive(true)
            } catch let error as NSError {
                print(error.localizedDescription)
            }
        } catch let error as NSError {
            print(error.localizedDescription)
        }
        
        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "PlayScreenToTrackListings")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeGestureRecognizer)
        
        playTrack(selectedTrackObject)
//        self.artworkBGImageView.downloadedFrom(link: selectedTrackObject.artwork_url!, contentMode: UIViewContentMode.Center)
        
    }
    
    override func remoteControlReceivedWithEvent(event: UIEvent?) { // *
        let rc = event!.subtype
        print("received remote control \(event!.subtype)") // 101 = pause, 100 = play
        switch rc {
            case .RemoteControlTogglePlayPause:
                playButtonTapped(self)
            case .RemoteControlPlay:
                playButtonTapped(self)
            case .RemoteControlPause:
                playButtonTapped(self)
            case .RemoteControlNextTrack:
                goToTrack(self, direction: "next")
            case .RemoteControlPreviousTrack:
                goToTrack(self, direction: "prev")
            default:break
        }
        
    }
    
    func playTrack(track: TrackListing) {
        let url = NSURL(string: selectedTrackObject.stream_url!)
        playerItem = AVPlayerItem(URL: url!)
        player = AVPlayer(playerItem: playerItem!)
        
        let playerLayer = AVPlayerLayer(player: player!)
        countDownTimer = CountdownTimer(countDownFrom: selectedTrackObject.durationClean!)
        
        playerLayer.frame = CGRectMake(0,0,10,10)
        self.view.layer.addSublayer(playerLayer)
        
        player!.play()
        countDownTimer.start()
        playButton.addTarget(self, action: "playButtonTapped:", forControlEvents: .TouchUpInside)
        
        getDataFromUrl(selectedTrackObject.artwork_url!) { (data, response, error)  in
            dispatch_async(dispatch_get_main_queue()) { () -> Void in
                //                                guard let data = data where error == nil else { return }
                selectedTrackObject.artwork_data = data!
                self.artworkBGImageView.image = UIImage(data: data!)
                self.setTrackInfo()
            }
        }
    }
    
    func trackDuration() {
//        while self.countDownTimer.isValid() {
//            print("g")
//        }
        let trackDuration = selectedTrackObject.durationRaw
        print(trackDuration)
//        dispatch_async(dispatch_get_main_queue()) {
//            for var index = 0; index < trackDuration; ++index {
//                print(index)
//            }
//        }
    }

    
    func PlayScreenToTrackListings() {
        self.performSegueWithIdentifier("PlayScreenSegueUnwind", sender: self)
    }
    
    func playButtonTapped(sender: AnyObject) {
        if player?.rate == 0 {
            player!.play()
            playButton.setImage(UIImage(named: "pause-icon.40x49"), forState: UIControlState.Normal)
        } else {
            player!.pause()
            playButton.setImage(UIImage(named: "play-icon.40x49"), forState: UIControlState.Normal)
        }
    }
    
    func goToTrack(sender: AnyObject, direction: String) {
        for var idx = TrackListings.count - 1; idx >= 0; --idx {
            if TrackListings[idx].id == selectedTrackObject.id {
                if direction == "next" && (idx + 1) > (TrackListings.count - 1) {
                    selectedTrackObject = TrackListings[0]
                } else if direction == "prev" && (idx - 1) < 0 {
                    selectedTrackObject = TrackListings[TrackListings.count - 1]
                }else {
                    selectedTrackObject = (direction == "next") ? TrackListings[idx + 1] : TrackListings[idx - 1]
                }
                
                let url = NSURL(string: selectedTrackObject.stream_url!)
                playerItem = AVPlayerItem(URL: url!)
                player!.replaceCurrentItemWithPlayerItem(playerItem!)

                return getDataFromUrl(selectedTrackObject.artwork_url!) { (data, response, error)  in
                    dispatch_async(dispatch_get_main_queue()) { () -> Void in
                        //                                guard let data = data where error == nil else { return }
                        selectedTrackObject.artwork_data = data!
                        self.artworkBGImageView.image = UIImage(data: data!)
                        self.setTrackInfo()
                    }
                }
            }
        }
    }
    
    func setTrackInfo() {

        self.trackNameTextLabel.text = selectedTrackObject.title
        self.artistNameTextLabel.text = selectedTrackObject.user
        self.durationTextLabel.text = selectedTrackObject.durationString!

        let image = UIImage(data: selectedTrackObject.artwork_data!)
        
        nowPlayingInfo[MPMediaItemPropertyArtist] = selectedTrackObject.user!
        nowPlayingInfo[MPMediaItemPropertyTitle] = selectedTrackObject.title!
        nowPlayingInfo[MPMediaItemPropertyArtwork] = MPMediaItemArtwork(image: image!)
        nowPlayingInfo[MPNowPlayingInfoPropertyPlaybackRate] = 1 //to make the duration move maaaaan
        nowPlayingInfo[MPMediaItemPropertyPlaybackDuration] = NSTimeInterval(selectedTrackObject.durationClean!)
        
        audioInfo.nowPlayingInfo = nowPlayingInfo
        
        trackDuration()
    }


}
