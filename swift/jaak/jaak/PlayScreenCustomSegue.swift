//
//  PlayScreenCustomSegue.swift
//  jaak
//
//  Created by Freddie Tibbles on 14/01/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import UIKit

class PlayScreenCustomSegue: UIStoryboardSegue {
    
//    override func viewDidLoad() {
//        super.viewDidLoad()
//        
//        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "showPlayScreenViewController")
//        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
//        self.view.addGestureRecognizer(swipeGestureRecognizer)
//    }
//    
//    func showPlayScreenViewController() {
//        self.performSegueWithIdentifier("playScreenSegue", sender: self)
//    }
    
    override func perform() {
        
        let trackListingsVCView = self.sourceViewController.view as UIView!
        let playScreenVCView: UIView = self.destinationViewController.view as UIView!
        
        let screenWidth = UIScreen.mainScreen().bounds.size.width
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        let window = UIApplication.sharedApplication().keyWindow
        dispatch_async(dispatch_get_main_queue(), {
            playScreenVCView.frame = CGRectMake(0.0, screenHeight, screenWidth, screenHeight)
            
            window?.insertSubview(playScreenVCView, aboveSubview: trackListingsVCView)
            
            
            UIView.animateWithDuration(0.2, animations: { () -> Void in
                trackListingsVCView.frame = CGRectOffset(trackListingsVCView.frame, 0.0, -screenHeight)
                playScreenVCView.frame = CGRectOffset(playScreenVCView.frame, 0.0, -screenHeight)
                
                }) { (Finished) -> Void in
                    self.sourceViewController.presentViewController(self.destinationViewController as UIViewController, animated: false, completion: nil)
                    
            }
        })
        
        
    }

}
