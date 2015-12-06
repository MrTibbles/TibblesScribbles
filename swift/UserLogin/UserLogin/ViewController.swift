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
        // Do any additional setup after loading the view, typically from a nib.
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

