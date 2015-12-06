//
//  RegisterPageViewController.swift
//  UserLogin
//
//  Created by Freddie Tibbles on 06/12/2015.
//  Copyright © 2015 TibblesScribbles. All rights reserved.
//

import UIKit

class RegisterPageViewController: UIViewController {

    @IBOutlet weak var userEmailTextField: UITextField!
    @IBOutlet weak var userPasswordTextField: UITextField!
    @IBOutlet weak var repeatPasswordTextField: UITextField!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        // Do any additional setup after loading the view.
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    

    @IBAction func registerButtonTapped(sender: AnyObject) {
        
        let userEmail = userEmailTextField.text
        let userPassword = userPasswordTextField.text
        let userRepeatPassword = repeatPasswordTextField.text
        
        
        //Check for empty form
        if (userEmail!.isEmpty || userPassword!.isEmpty || userRepeatPassword!.isEmpty) {
            displayAlertMsg("Please complete the form in order to continue")
            return
        }
        
        if (userPassword != userRepeatPassword) {
            displayAlertMsg("Sorry, your passwords dont match")
            return
        }
        
        //Store data (locally)
        NSUserDefaults.standardUserDefaults().setObject(userEmail, forKey: "userEmail")
        NSUserDefaults.standardUserDefaults().setObject(userPassword, forKey: "userPassword")
        NSUserDefaults.standardUserDefaults().synchronize()
        
        //Display success msg
        let theSuccesAlert = UIAlertController(title: "Successfull signup", message: "Registration complete", preferredStyle: UIAlertControllerStyle.Alert)
        
        let okSuccessAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.Default){action in
            self.dismissViewControllerAnimated(true, completion: nil)
        }
        
        theSuccesAlert.addAction(okSuccessAction)

        self.presentViewController(theSuccesAlert, animated: true, completion: nil)

    }
    
    func displayAlertMsg(userMessage: String) {
        let theAlert = UIAlertController(title: "Form Validation", message: userMessage, preferredStyle: UIAlertControllerStyle.Alert)
        
        let okAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.Default, handler: nil)
        
        theAlert.addAction(okAction)
        
        self.presentViewController(theAlert, animated: true, completion: nil)
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
