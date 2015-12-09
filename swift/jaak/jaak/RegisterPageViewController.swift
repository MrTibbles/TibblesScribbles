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
    @IBOutlet weak var activityIndicator: UIActivityIndicatorView!
    
    override func viewDidLoad() {
        super.viewDidLoad()

        let background = CAGradientLayer().jaakGrdnt()
        background.frame = self.view.bounds
        inputFieldsBg.layer.insertSublayer(background, atIndex: 0)
        inputFieldsBg.layer.cornerRadius = inputFieldsBg.frame.size.width/14
        inputFieldsBg.clipsToBounds = true
        
        imageView.layer.cornerRadius = imageView.frame.size.width/2
        imageView.clipsToBounds = true
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
    
    @IBAction func registerUser(sender: UIButton) {
        
        let userEmail = NSUserDefaults.standardUserDefaults().stringForKey("userEmail")!
        let userFirstname = firstnameTextField.text!
        let userLastname = lastnameTextField.text!
        let userPassword = passwordTextField.text!
        let groupName = "testing"
        
        let regUrl = NSURL(string: "http://jaak.reg/userRegister.php")
        let request = NSMutableURLRequest(URL: regUrl!)
        request.HTTPMethod = "POST"
        
        let boundary = generateBoundaryString()
        
        request.setValue("multipart/form-data; boundary=\(boundary)", forHTTPHeaderField: "Content-Type")
        
        let imageData = UIImageJPEGRepresentation(imageView.image!, 1)
        
        if (imageData == nil) {
            return
        }
        
        let params = [
            "email" : userEmail,
            "password": userPassword,
            "firstname" : userFirstname,
            "lastname" : userLastname,
            "group_name": groupName
        ]
        
//        let postString = "email=\(userEmail)&password=\(userPassword)&group_name=\(groupName)&firstname=\(userFirstname)&lastname=\(userLastname)"
        
//        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
        request.HTTPBody = createBodyWithParameters(params, filePathKey: "file", imageDataKey: imageData!, boundary: boundary)
        
        self.activityIndicator.startAnimating()
        
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
                    
                    dispatch_async(dispatch_get_main_queue(), {
                        self.activityIndicator.stopAnimating()
                    })
                }
            } catch let error as NSError {
                print(error.localizedDescription)
            }
            
        }
        
        task.resume()
        
    }
    
    func createBodyWithParameters(parameters: [String: String]?, filePathKey: String?, imageDataKey: NSData, boundary: String) -> NSData {
        let body = NSMutableData()
        
        if parameters != nil {
            for (key, value) in parameters! {
                body.appendString("--\(boundary)\r\n")
                body.appendString("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n")
                body.appendString("\(value)\r\n")
            }
        }
        
        let filename = "user-profile.jpg"
        
        let mimetype = "image/jpg"
        
        body.appendString("--\(boundary)\r\n")
        body.appendString("Content-Disposition: form-data; name=\"\(filePathKey!)\"; filename=\"\(filename)\"\r\n")
        body.appendString("Content-Type: \(mimetype)\r\n\r\n")
        body.appendData(imageDataKey)
        body.appendString("\r\n")
        
        
        
        body.appendString("--\(boundary)--\r\n")
        
        return body
    }
    
    func generateBoundaryString() -> String {
        return "Boundary-\(NSUUID().UUIDString)"
    }
    
}

extension NSMutableData {
    
    func appendString(string: String) {
        let data = string.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: true)
        appendData(data!)
    }
}
