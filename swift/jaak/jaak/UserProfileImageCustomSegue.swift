//
//  UserProfileImageCustomSegue.swift
//  jaak
//
//  Created by Freddie Tibbles on 19/02/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import UIKit

class UserProfileImageCustomSegue: UIStoryboardSegue {
    
    override func perform() {

        var trackListingsVCView = self.sourceViewController.view as UIView!
        var userProfileVCView = self.destinationViewController.view as UIView!
        
        let screenWidth = UIScreen.mainScreen().bounds.size.width
        let screenHeight = UIScreen.mainScreen().bounds.height
        
        //(<#T##x: CGFloat##CGFloat#>, <#T##y: CGFloat##CGFloat#>, <#T##width: CGFloat##CGFloat#>, <#T##height: CGFloat##CGFloat#>)
        userProfileVCView.frame = CGRectMake(0.0, -screenHeight, screenWidth, screenHeight)
        
        let window = UIApplication.sharedApplication().keyWindow
        window?.insertSubview(userProfileVCView, aboveSubview: trackListingsVCView)
        
        UIView.animateWithDuration(0.2, animations: { () -> Void in
            
            //CGRectOffset(<#T##rect: CGRect##CGRect#>, <#T##dx: CGFloat##CGFloat#>, <#T##dy: CGFloat##CGFloat#>)
            trackListingsVCView.frame = CGRectOffset(trackListingsVCView.frame, 0.0, screenHeight)
            userProfileVCView.frame = CGRectOffset(userProfileVCView.frame, 0.0, screenHeight)
            
            }) { (Finished) -> Void in
                self.sourceViewController.presentViewController(self.destinationViewController as UIViewController, animated: false, completion: nil)
        }
    }
    
}