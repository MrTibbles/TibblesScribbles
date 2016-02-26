//
//  PlayControls.swift
//  jaak
//
//  Created by Freddie Tibbles on 26/02/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import Foundation
import UIKit
import AVFoundation
import MediaPlayer

class PlayControls {
    
    func playButtonTapped(sender: AnyObject) {
        if player?.rate == 0 {
            player!.play()
//            playButton.setImage(UIImage(named: "pause-icon.40x49"), forState: UIControlState.Normal)
        } else {
            player!.pause()
//            playButton.setImage(UIImage(named: "play-icon.40x49"), forState: UIControlState.Normal)
        }
    }
    
}