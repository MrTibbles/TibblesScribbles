//
//  PlayScreenViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class PlayScreenViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "PlayScreenToTrackListings")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeGestureRecognizer)
    }
    
    func PlayScreenToTrackListings() {
        self.performSegueWithIdentifier("PlayScreenSegueUnwind", sender: self)
    }    

}
