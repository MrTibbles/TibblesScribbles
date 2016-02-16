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
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        UIApplication.sharedApplication().beginReceivingRemoteControlEvents()
        
        do {
            try AVAudioSession.sharedInstance().setCategory(AVAudioSessionCategoryPlayback)
            do {
                try AVAudioSession.sharedInstance().setActive(true)
                print("AVAudioSession is Active")
            } catch let error as NSError {
                print(error.localizedDescription)
            }
        } catch let error as NSError {
            print(error.localizedDescription)
        }
        
        
        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "PlayScreenToTrackListings")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeGestureRecognizer)
        
        let url = NSURL(string: selectedTrackObject.stream_url!)
        playerItem = AVPlayerItem(URL: url!)
        player = AVPlayer(playerItem: playerItem!)
        
        let playerLayer = AVPlayerLayer(player: player!)
        playerLayer.frame = CGRectMake(0,0,10,10)
        self.view.layer.addSublayer(playerLayer)
        
//        let newArtworkUrl = self.selectedTrackObject.artwork_url!.stringByReplacingOccurrencesOfString("large", withString: "t500x500")
//        print(self.selectedTrackObject.artwork_data)
//        var artworkData:NSData? = nil
        print(selectedTrackObject.artwork_url)
        getDataFromUrl(selectedTrackObject.artwork_url!) { (data, response, error)  in
            dispatch_async(dispatch_get_main_queue()) { () -> Void in
                            //                                guard let data = data where error == nil else { return }
                selectedTrackObject.artwork_data = data!
                self.setTrackInfo()
            }
        }
        self.artworkBGImageView.downloadedFrom(link: selectedTrackObject.artwork_url!, contentMode: UIViewContentMode.Center)
        
        self.trackNameTextLabel.text = selectedTrackObject.title
        self.artistNameTextLabel.text = selectedTrackObject.user

        player!.play()
        
        playButton.addTarget(self, action: "playButtonTapped:", forControlEvents: .TouchUpInside)
    }
    
    override func remoteControlReceivedWithEvent(event: UIEvent?) { // *
        let rc = event!.subtype
        print("received remote control \(rc.rawValue)") // 101 = pause, 100 = play
        switch rc {
            case .RemoteControlTogglePlayPause:
                self.playButtonTapped(self)
            case .RemoteControlPlay:
                player!.play()
            case .RemoteControlPause:
                player!.pause()
            case .RemoteControlNextTrack:
                self.goToNextTrack(self)
            default:break
        }
        
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
    
    func goToNextTrack(sender: AnyObject) {
//        let currentTrackIdx = TrackListings.indexOf("G")
    }
    
    func setTrackInfo() {
//        
//        commandCenter.playCommand.addTarget(self, action: "playButtonTapped")
//        commandCenter.pauseCommand.addTarget(self, action: "playButtonTapped")
        let image = UIImage(data: selectedTrackObject.artwork_data!)
        
        nowPlayingInfo[MPMediaItemPropertyArtist] = selectedTrackObject.user!
        nowPlayingInfo[MPMediaItemPropertyTitle] = selectedTrackObject.title!
        nowPlayingInfo[MPMediaItemPropertyArtwork] = MPMediaItemArtwork(image: image!)
        
//                if item.commonKey  == "title" {
//                    print(item.stringValue)
//                    nowPlayingInfo[MPMediaItemPropertyTitle] = item.stringValue
//                }
//                if item.commonKey   == "type" {
//                    print(item.stringValue)
//                    nowPlayingInfo[MPMediaItemPropertyGenre] = item.stringValue
//                }
//                if item.commonKey  == "albumName" {
//                    print(item.stringValue)
//                    nowPlayingInfo[MPMediaItemPropertyAlbumTitle] = item.stringValue
//                }
//                if item.commonKey   == "artist" {
//                    print(item.stringValue)
//                    nowPlayingInfo[MPMediaItemPropertyArtist] = item.stringValue
//                }
//                if item.commonKey  == "artwork" {
//                    if let image = UIImage(data: item.value as! NSData) {
//                        nowPlayingInfo[MPMediaItemPropertyArtwork] = MPMediaItemArtwork(image: image)
//                        print(image.description)
//                    }
//                }
        audioInfo.nowPlayingInfo = nowPlayingInfo
        
    }


}
