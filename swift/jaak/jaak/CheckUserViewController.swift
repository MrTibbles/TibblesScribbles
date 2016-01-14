//
//  ViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 09/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class CheckUserViewController: UIViewController {

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
        
        let userEmail = userEmailTextField.text!
        
        //Check for empty form
        if (userEmail.isEmpty) {
            displayAlertMsg("Please complete the form in order to continue")
            return
        }
        
        
        let regUrl = NSURL(string: "http://tibblesscribbles.com/jaak-reg/checkUser.php")
        let request = NSMutableURLRequest(URL: regUrl!)
        request.HTTPMethod = "POST"
        
        let postString = "email=\(userEmail)"
        
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
            data, response, error in
            
//            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//            print("*** response data=\(responseString)")
            
            //            var jsonResponse = NSJSONSerialization.JSONObjectWithData(data!, options: .MutableLeaves, error: &err) as? NSDictionary
            
            do {
                if let jsonResponse = try NSJSONSerialization.JSONObjectWithData(data!, options: []) as? NSDictionary {
                    let respMsg = jsonResponse.valueForKey("message") as! String!
                    
                    if respMsg == "User does not exist" {
                        NSUserDefaults.standardUserDefaults().setObject(userEmail, forKey: "userEmail")
                        NSUserDefaults.standardUserDefaults().synchronize()
                        
                        return self.performSegueWithIdentifier("checkUserRegisterSegue", sender: self);
                    } else {
                        NSUserDefaults.standardUserDefaults().setBool(true, forKey: "userRecognised")
                        NSUserDefaults.standardUserDefaults().synchronize()
                        
                        //Forward them through to home screen page
                        return self.performSegueWithIdentifier("checkUserTrackListingsSegue", sender: self);
                    }
                    
                }
            } catch let error as NSError {
                print(error.localizedDescription)
            }

        }
        task.resume()
    }
    
    @IBAction func returnFromSegueActions(sender: UIStoryboardSegue){
        
    }
    
    override func segueForUnwindingToViewController(toViewController: UIViewController, fromViewController: UIViewController, identifier: String?) -> UIStoryboardSegue {
        if let id = identifier {
            if id == "CheckUserRegisterSegueUnwind" {
                let unwindSegue = CheckUserRegisterSegueUnwind(identifier: id, source: fromViewController, destination: toViewController, performHandler: { () -> Void in
                    
                })
                return unwindSegue
            }
        }
        return super.segueForUnwindingToViewController(toViewController, fromViewController: fromViewController, identifier: identifier)!
    }
    
    func displayAlertMsg(userMessage: String) {
        let theAlert = UIAlertController(title: "Form Validation", message: userMessage, preferredStyle: UIAlertControllerStyle.Alert)
        
        let okAction = UIAlertAction(title: "Ok", style: UIAlertActionStyle.Default, handler: nil)
        
        theAlert.addAction(okAction)
        
        self.presentViewController(theAlert, animated: true, completion: nil)
    }

}

