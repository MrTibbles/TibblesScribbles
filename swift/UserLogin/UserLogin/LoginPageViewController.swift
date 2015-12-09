//
//  LoginPageViewController.swift
//  UserLogin
//
//  Created by Freddie Tibbles on 06/12/2015.
//  Copyright © 2015 TibblesScribbles. All rights reserved.
//

import UIKit

class LoginPageViewController: UIViewController {

    @IBOutlet weak var userEmailTextField: UITextField!
    var userRecognised = false
    
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
    

    @IBAction func loginButtonTapped(sender: AnyObject) {
        
        let userEmail = userEmailTextField.text
        
        //Check local storage
        let userEmailStored = NSUserDefaults.standardUserDefaults().stringForKey("userEmail")
        
        
        if (userEmailStored == userEmail) {
            
            NSUserDefaults.standardUserDefaults().setBool(true, forKey: "userRecognised")
            NSUserDefaults.standardUserDefaults().synchronize()
            userRecognised = true
//            self.dismissViewControllerAnimated(true, completion: nil)
        }
    }
    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
