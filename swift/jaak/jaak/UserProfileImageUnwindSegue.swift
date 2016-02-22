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
        
        var userProfileVCView = self.sourceViewController.view as UIView!
        var trackListingsVCView = self.destinationViewController.view as UIView!
        
        let screenHeight = UIScreen.mainScreen().bounds.size.height
        
        let window = UIApplication.sharedApplication()
        
    }
}
