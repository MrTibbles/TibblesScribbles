//
//  ViewController.swift
//  UserLogin
//
//  Created by Freddie Tibbles on 06/12/2015.
//  Copyright © 2015 TibblesScribbles. All rights reserved.
//

import UIKit

class ViewController: UIViewController {
    
    

    override func viewDidLoad() {
        super.viewDidLoad()
        
        let background = CAGradientLayer().jaakGrdnt()
        background.frame = self.view.bounds
        self.view.layer.insertSublayer(background, atIndex: 0)
        
        let loggedIn = NSUserDefaults.standardUserDefaults().boolForKey("loggedIn")
        
        if (loggedIn == false) {
            self.performSegueWithIdentifier("loginView", sender: self);
        } else {
            
        }
    }
    
    @IBAction func logoutButtonTapped(sender: AnyObject) {
        NSUserDefaults.standardUserDefaults().setBool(false, forKey: "loggedIn")
        NSUserDefaults.standardUserDefaults().synchronize()
        
        self.performSegueWithIdentifier("loginView", sender: self);
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
//    overirde func viewDidAppear(animated: Bool) {
//        self.performSegueWithIdentifier("loginView", sender: self);
//    }

}

