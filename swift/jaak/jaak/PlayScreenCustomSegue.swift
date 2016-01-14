//
//  PlayScreenCustomSegue.swift
//  jaak
//
//  Created by Freddie Tibbles on 14/01/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import UIKit

class PlayScreenCustomSegue: UIStoryboardSegue {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "showPlayScreenViewController")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeGestureRecognizer)
    }
    
    func showPlayScreenViewController() {
        self.performSegueWithIdentifier("playScreenSegue", sender: self)
    }
    
    override func perform() {
        
        let trackListingsVCView: UIView = self.sourceViewController.view
        let playScreenVCView: UIView = self.destinationViewController.view
        let screenWidth = UIScreen.mainScreen().bounds/size.width
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        playScreenVCView.frame = CGRectMake(0.0, screenHeight, screenWidth, screenHeight)
        
        let window = UIApplication.sharedApplication().keyWindow
        window?.insertSubView(playScreenVCView, aboveSubView: trackListingsVCView)
        
        UIView.animateWithDuration(0.2, animations: { () -> Void in
            trackListingsVCView.frame = CGRectOffset(trackListingsVCView.frame, 0.0, -screenHeight)
            playScreenVCView.frame = CGRectOffset(playScreenVCView.frame, 0.0, -screenHeight)
            }) { (Finished) -> Void in
                self.sourceViewController.presentViewController(self.destinationViewController as UIViewController, animated: false, completion: nil)
        }
        
        
    }

}
