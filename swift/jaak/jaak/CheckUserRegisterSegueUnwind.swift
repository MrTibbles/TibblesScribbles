//
//  CheckUserRegisterSegueUnwind.swift
//  jaak
//
//  Created by Freddie Tibbles on 17/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class CheckUserRegisterSegueUnwind: UIStoryboardSegue {
    
    override func perform() {
        // Assign the source and destination views to local variables.
        let registerVCView = self.sourceViewController.view as UIView!
        let initialVCView = self.destinationViewController.view as UIView!
        
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        let window = UIApplication.sharedApplication().keyWindow
        dispatch_async(dispatch_get_main_queue(), {
            window?.insertSubview(initialVCView, aboveSubview: registerVCView)
        
            UIView.animateWithDuration(0.2, animations: { () -> Void in
                initialVCView.frame = CGRectOffset(initialVCView.frame, 0.0, screenHeight)
                registerVCView.frame = CGRectOffset(registerVCView.frame, 0.0, screenHeight)
            
                }) { (Finished) -> Void in
                
                self.sourceViewController.dismissViewControllerAnimated(false, completion: nil)
            }
        })
    }

}
