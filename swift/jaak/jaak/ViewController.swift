//
//  ViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 09/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class ViewController: UIViewController {

    @IBOutlet weak var userEmailTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let background = CAGradientLayer().jaakGrdnt()
        background.frame = self.view.bounds
        self.view.layer.insertSublayer(background, atIndex: 0)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func checkUserEmail(sender: UIButton) {
        
        let userEmail = userEmailTextField.text
        //Check local storage
        NSUserDefaults.standardUserDefaults().setObject(userEmail, forKey: "userEmail")
        NSUserDefaults.standardUserDefaults().synchronize()
        
        //Check for empty form
        if (userEmail!.isEmpty) {
            displayAlertMsg("Please complete the form in order to continue")
            return
        }
        
//        if (userEmailStored == userEmail) {            
//            NSUserDefaults.standardUserDefaults().setBool(true, forKey: "userRecognised")
//            NSUserDefaults.standardUserDefaults().synchronize()
//
//        }
        self.performSegueWithIdentifier("checkUser", sender: self);
    }
    
    func displayAlertMsg(userMessage: String) {
        let theAlert = UIAlertController(title: "Form Validation", message: userMessage, preferredStyle: UIAlertControllerStyle.Alert)
        
        let okAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.Default, handler: nil)
        
        theAlert.addAction(okAction)
        
        self.presentViewController(theAlert, animated: true, completion: nil)
    }

}

