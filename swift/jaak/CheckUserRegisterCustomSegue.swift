//
//  checkUserRegisterCustomSegue.swift
//  jaak
//
//  Created by Freddie Tibbles on 17/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class CheckUserRegisterCustomSegue: UIStoryboardSegue {
    
    override func perform() {
        let initialVCView = self.sourceViewController.view as UIView!
        let registerVCView = self.destinationViewController.view as UIView!
        
        let screenWidth = UIScreen.mainScreen().bounds.size.width
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        let window = UIApplication.sharedApplication().keyWindow
        dispatch_async(dispatch_get_main_queue(), {
            registerVCView.frame = CGRectMake(0.0, screenHeight, screenWidth, screenHeight)
            
            window?.insertSubview(registerVCView, aboveSubview: initialVCView)
        
        
            UIView.animateWithDuration(0.5, animations: { () -> Void in
                initialVCView.frame = CGRectOffset(initialVCView.frame, 0.0, -screenHeight)
                registerVCView.frame = CGRectOffset(registerVCView.frame, 0.0, -screenHeight)
            
                }) { (Finished) -> Void in
                    self.sourceViewController.presentViewController(self.destinationViewController as UIViewController, animated: false, completion: nil)
                
            }
        })
    }
    
}
