//
//  PlayScreenCustomSegue.swift
//  jaak
//
//  Created by Freddie Tibbles on 14/01/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import UIKit

class PlayScreenCustomSegue: UIStoryboardSegue {

    override func perform() {
       
        let trackListingsVCView = self.sourceViewController.view as UIView!
        let playScreenVCView: UIView = self.destinationViewController.view as UIView!
        
        let screenWidth = UIScreen.mainScreen().bounds.size.width
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        let window = UIApplication.sharedApplication().keyWindow
        dispatch_async(dispatch_get_main_queue(), {
            //Initial position of destination view
            playScreenVCView.frame = CGRectMake(screenWidth, screenHeight, screenWidth, screenHeight)
            
            window?.insertSubview(playScreenVCView, aboveSubview: trackListingsVCView)
            
            
            UIView.animateWithDuration(0.2, animations: { () -> Void in
                trackListingsVCView.frame = CGRectOffset(trackListingsVCView.frame, -screenWidth, 0.0)
                playScreenVCView.frame = CGRectOffset(playScreenVCView.frame, -screenWidth, 0.0)
                
                }) { (Finished) -> Void in
                    self.sourceViewController.presentViewController(self.destinationViewController as UIViewController, animated: false, completion: nil)
            }
        })
        
        
    }

}
