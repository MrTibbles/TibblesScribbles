//
//  PlayScreenSegueUnwind.swift
//  jaak
//
//  Created by Freddie Tibbles on 14/01/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import UIKit

class PlayScreenSegueUnwind: UIStoryboardSegue {
    
    override func perform() {
        
        let playScreenVCView = self.sourceViewController.view as UIView!
        let trackListingsVCView = self.destinationViewController.view as UIView!
        
        let screenHeight = UIScreen.mainScreen().bounds.size.height
//        let screenWidth = UIScreen.mainScreen().bounds.size.width
        
        let window = UIApplication.sharedApplication().keyWindow
        window?.insertSubview(trackListingsVCView, aboveSubview: playScreenVCView)
        
//        trackListingsVCView.frame = CGRectMake(screenWidth, screenHeight, screenWidth, screenHeight)
        
        UIView.animateWithDuration(0.2, animations: { () -> Void in
            trackListingsVCView.frame = CGRectOffset(trackListingsVCView.frame, 0.0, screenHeight)
            playScreenVCView.frame = CGRectOffset(playScreenVCView.frame, 0.0, screenHeight)
            
            }) { (Finished) -> Void in
                    self.sourceViewController.dismissViewControllerAnimated(false, completion: nil)
        }
    }

}
