//
//  CheckUserRegisterSegueUnwind.swift
//  jaak
//
//  Created by Freddie Tibbles on 17/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class ShowPlayScreenSegueUnwind: UIStoryboardSegue {
    
    override func perform() {
        print("ShowPlayScreenSegueUnwind")
        
        // Assign the source and destination views to local variables.
        let playScreenVCView = self.sourceViewController.view as UIView!
        let trackListingsVCView = self.destinationViewController.view as UIView!
        
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        let window = UIApplication.sharedApplication().keyWindow
        dispatch_async(dispatch_get_main_queue(), {
            window?.insertSubview(trackListingsVCView, aboveSubview: playScreenVCView)
            
            UIView.animateWithDuration(0.2, animations: { () -> Void in
                trackListingsVCView.frame = CGRectOffset(trackListingsVCView.frame, 0.0, screenHeight)
                playScreenVCView.frame = CGRectOffset(playScreenVCView.frame, 0.0, screenHeight)
                
                }) { (Finished) -> Void in
                    
                    self.sourceViewController.dismissViewControllerAnimated(false, completion: nil)
            }
        })
    }
    
}
