//
//  RegisterPageViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 09/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit
import Alamofire

class RegisterPageViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate {

    @IBOutlet weak var inputFieldsBg: UIView!
    @IBOutlet weak var cameraButton: UIButton!
    @IBOutlet weak var libraryButton: UIButton!
    @IBOutlet weak var imageView: UIImageView!
    
    @IBOutlet weak var firstnameTextField: UITextField!
    @IBOutlet weak var lastnameTextField: UITextField!
    @IBOutlet weak var passwordTextField: UITextField!
//    let imageView = UIImageView(frame: CGRectMake(0, 0, 100, 100))
    

    override func viewDidLoad() {
        super.viewDidLoad()

        let background = CAGradientLayer().jaakGrdnt()
        background.frame = self.view.bounds
        inputFieldsBg.layer.insertSublayer(background, atIndex: 0)
        inputFieldsBg.layer.cornerRadius = inputFieldsBg.frame.size.width/14
        inputFieldsBg.clipsToBounds = true
        
        imageView.layer.cornerRadius = imageView.frame.size.width/2
        imageView.clipsToBounds = true

        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "showInitialEmailEntry")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Down
        self.view.addGestureRecognizer(swipeGestureRecognizer)
    }
    
    func showInitialEmailEntry() {
        self.performSegueWithIdentifier("CheckUserRegisterSegueUnwind", sender: self)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    @IBAction func viewTapped(sender : AnyObject) {
        firstnameTextField.resignFirstResponder()
        lastnameTextField.resignFirstResponder()
        passwordTextField.resignFirstResponder()
    }


    @IBAction func libraryAction(sender: UIButton) {
        
        let picker = UIImagePickerController()
        picker.delegate = self
        picker.sourceType = .PhotoLibrary
        
        presentViewController(picker, animated: true, completion: nil)
        
    }
    
    @IBAction func cameraAction(sender: UIButton) {
        
        let picker = UIImagePickerController()
        picker.delegate = self
        picker.sourceType = .Camera
        
        presentViewController(picker, animated: true, completion: nil)
        
    }
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : AnyObject]) {
        
        imageView.image = info[UIImagePickerControllerOriginalImage] as? UIImage;
        imageView.frame = CGRectMake(0, 0, 100, 100)
        dismissViewControllerAnimated(true, completion: nil)
        
    }
    
    func randomStringWithLength(len : Int) -> NSString {
        
        let letters : NSString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
        
        let randomString : NSMutableString = NSMutableString(capacity: len)
        
        for (var i=0; i < len; i++){
            let length = UInt32 (letters.length)
            let rand = arc4random_uniform(length)
            randomString.appendFormat("%C", letters.characterAtIndex(Int(rand)))
        }
        
        return randomString
    }
    
    @IBAction func registerUser(sender: UIButton) {
        
        let userEmail = NSUserDefaults.standardUserDefaults().stringForKey("userEmail")!
        let userFirstname = firstnameTextField.text!
        let userLastname = lastnameTextField.text!
        let userPassword = passwordTextField.text!
        let groupName = randomStringWithLength(32)
        let imageData = UIImageJPEGRepresentation(imageView.image!, 1)
        
        let userParameters = [
            "email": userEmail,
            "firstname": userFirstname,
            "lastname": userLastname,
            "password": userPassword,
            "group_name": groupName
        ]
        
        NSUserDefaults.standardUserDefaults().setObject(imageData, forKey: "userProfileImage")
        NSUserDefaults.standardUserDefaults().synchronize()
        
        let regUrl = NSURL(string: "http://\(jaakDomain)/userRegister.php")
        
        Alamofire.request(.POST, regUrl!, parameters: userParameters)
            .response { request, response, data, error in
                do {
                    if data != nil && error == nil {
                        NSUserDefaults.standardUserDefaults().setObject(userParameters, forKey: "userObject")
                        NSUserDefaults.standardUserDefaults().synchronize()
                    }
                } catch let error as NSError  {
                    print(error)
                }
        }
        
    }
    
}
