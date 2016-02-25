//
//  UserProfileImageUnwindSegue.swift
//  jaak
//
//  Created by Freddie Tibbles on 19/02/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import UIKit

class UserProfileImageUnwindSegue: UIStoryboardSegue {
    
    override func perform() {
        
        let userProfileVCView = self.sourceViewController.view as UIView!
        let trackListingsVCView = self.destinationViewController.view as UIView!
        
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        let window = UIApplication.sharedApplication().keyWindow
        window?.insertSubview(trackListingsVCView, aboveSubview: userProfileVCView)
        
        UIView.animateWithDuration(0.2, animations: { () -> Void in
            
            //CGRectOffset(<#T##rect: CGRect##CGRect#>, <#T##dx: CGFloat##CGFloat#>, <#T##dy: CGFloat##CGFloat#>)
            userProfileVCView.frame = CGRectOffset(userProfileVCView.frame, 0.0, screenHeight)
            trackListingsVCView.frame = CGRectOffset(trackListingsVCView.frame, 0.0, screenHeight)
            
            }) { (Finished) -> Void in
                self.sourceViewController.presentViewController(self.destinationViewController as UIViewController, animated: false, completion: nil)
        }
        
    }
}
