//
//  RegisterPageViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 09/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

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
    
    func imageUploadRequest() {
        
        let imageData = UIImageJPEGRepresentation(imageView.image!, 0.5)
        
        if imageData != nil {
            
         
            
            let request = NSMutableURLRequest(URL: NSURL(string: "http://jaak.reg/imageUpload.php")!)
            
            request.HTTPMethod = "POST"
            
            let boundary = NSString(format: "_________________________12345567890112123123123123")
            let contentType = NSString(format: "multipart/form-data: boundary=%@", boundary)
            //            print("Content Type \(contentType)")
            request.addValue(contentType as String, forHTTPHeaderField: "Content-Type")
            
            let body = NSMutableData.init()
            
            //title
//            body.appendData(NSString(format: "--%@\r\n", boundary).dataUsingEncoding(NSUTF8StringEncoding)!)
//            body.appendData(NSString(format: "Content-Disposition: form-data; name=\"title\"\r\n\r\n").dataUsingEncoding(NSUTF8StringEncoding)!)
//            body.appendData("%@\r\n".dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: true)!)
            
            body.appendData(NSString(format: "\r\n--%@\r\n", boundary).dataUsingEncoding(NSUTF8StringEncoding)!)
            body.appendData(NSString(format: "Content-Disposition: form-data; name=\"file\"; type=\"file\"; filename=\"title.jpg\"\r\n").dataUsingEncoding(NSUTF8StringEncoding)!)
            body.appendData(NSString(format: "Content-Type: image/jpeg\r\n\r\n").dataUsingEncoding(NSUTF8StringEncoding)!)
            body.appendData(imageData!)
            body.appendData(NSString(format: "\r\n--%@--\r\n", boundary).dataUsingEncoding(NSUTF8StringEncoding)!)
            
            //var params = ["image":[ "content_type": "image/jpeg", "filename":"test.jpg", "file_data": base64String]]
            
            request.HTTPBody = body
            
            print(request.HTTPBody)
            
//            self.activityIndicator.startAnimating()
            
            let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
                data, response, error in
                
                if error != nil {
                    print("error=\(error)")
                    return
                }
                
                print(response)
                print("_________________________")
                
//                let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//                print("*** response data=\(responseString)")
                
                //            var jsonResponse = NSJSONSerialization.JSONObjectWithData(data!, options: .MutableLeaves, error: &err) as? NSDictionary
                
                do {
                    if let jsonResponse = try NSJSONSerialization.JSONObjectWithData(data!, options: []) as? NSDictionary {
                        print(jsonResponse)
                        
                        dispatch_async(dispatch_get_main_queue(), {
//                            self.activityIndicator.stopAnimating()
                        })
                    }
                } catch let error as NSError {
                    print(error.localizedDescription)
                }
                
            }
            
            task.resume()
            
        }
        
    }
    
    @IBAction func registerUser(sender: UIButton) {
        
        let userEmail = NSUserDefaults.standardUserDefaults().stringForKey("userEmail")!
        let userFirstname = firstnameTextField.text!
        let userLastname = lastnameTextField.text!
        let userPassword = passwordTextField.text!
        let groupName = randomStringWithLength(32)
        
        dispatch_async(dispatch_get_main_queue(), {
            self.imageUploadRequest()
        })
        
        let regUrl = NSURL(string: "http://jaak.reg/userRegister.php")
        let request = NSMutableURLRequest(URL: regUrl!)
        request.HTTPMethod = "POST"
        
        let postString = "email=\(userEmail)&password=\(userPassword)&group_name=\(groupName)&firstname=\(userFirstname)&lastname=\(userLastname)"
        
        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        
        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
            data, response, error in
            
            if error != nil {
                print("error=\(error)")
                return
            }
            
            print("*** response data = \(response)")
            
            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
            print("*** response data=\(responseString)")
            
//            var jsonResponse = NSJSONSerialization.JSONObjectWithData(data!, options: .MutableLeaves, error: &err) as? NSDictionary
            
            do {
                if let jsonResponse = try NSJSONSerialization.JSONObjectWithData(data!, options: []) as? NSDictionary {
                    print(jsonResponse)
                }
            } catch let error as NSError {
                print(error.localizedDescription)
            }
            
//            if let parseJSON = jsonResponse {
//                var emailValue = parseJSON["email"] as? String
//                var groupNameValue = parseJSON["group_name"]
//                var firstNameValue = parseJSON["firstname"] as? String
//                var lastNameValue = parseJSON["lastname"] as? String
//                
//                print("Email:\(emailValue), Groupname:\(groupNameValue), Firstname:\(firstNameValue), Lastname:\(lastNameValue)")
//            }
        }
        
        task.resume()
        
    }
    
}
