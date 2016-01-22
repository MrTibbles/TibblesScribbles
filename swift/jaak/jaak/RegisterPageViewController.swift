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
    
    // this function creates the required URLRequestConvertible and NSData we need to use Alamofire.upload
    func urlRequestWithComponents(urlString:String, parameters:Dictionary<String, String>, imageData:NSData) -> (URLRequestConvertible, NSData) {
        
        // create url request to send
        let mutableURLRequest = NSMutableURLRequest(URL: NSURL(string: urlString)!)
        mutableURLRequest.HTTPMethod = Alamofire.Method.POST.rawValue
        let boundaryConstant = "myRandomBoundary12345";
        let contentType = "multipart/form-data;boundary="+boundaryConstant
        mutableURLRequest.setValue(contentType, forHTTPHeaderField: "Content-Type")
        
        
        
        // create upload data to send
        let uploadData = NSMutableData()
        
        // add image
        uploadData.appendData("\r\n--\(boundaryConstant)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        uploadData.appendData("Content-Disposition: form-data; name=\"file\"; filename=\"file.png\"\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        uploadData.appendData("Content-Type: image/png\r\n\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        uploadData.appendData(imageData)
        
        // add parameters
        for (key, value) in parameters {
            uploadData.appendData("\r\n--\(boundaryConstant)\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
            uploadData.appendData("Content-Disposition: form-data; name=\"\(key)\"\r\n\r\n\(value)".dataUsingEncoding(NSUTF8StringEncoding)!)
        }
        uploadData.appendData("\r\n--\(boundaryConstant)--\r\n".dataUsingEncoding(NSUTF8StringEncoding)!)
        
        
        
        // return URLRequestConvertible and NSData
        return (Alamofire.ParameterEncoding.URL.encode(mutableURLRequest, parameters: nil).0, uploadData)
    }
    
    func imageUploadRequest() {
        
//        let imageUploadUrl = NSURL(string: "http://tibblesscribbles.com/jaak-reg/imageUpload.php")
        let imageData = UIImageJPEGRepresentation(imageView.image!, 0.5)
        let parameters = ["task": "newImage"]
        let urlRequest = urlRequestWithComponents("http://tibblesscribbles.com/jaak-reg/imageUpload.php", parameters: parameters, imageData: imageData!)
        
        Alamofire.upload(urlRequest.0, data: urlRequest.1)
            .progress { (bytesWritten, totalBytesWritten, totalBytesExpectedToWrite) in
                print("\(totalBytesWritten) / \(totalBytesExpectedToWrite)")
            }
            .responseJSON {  response in
                print("REQUEST \(response.request)")
                print("RESPONSE \(response.response)")
                print("JSON \(response.data)")
                print("ERROR \(response.result)")
        }
        
    }
    
    @IBAction func registerUser(sender: UIButton) {
        
//        let userEmail = NSUserDefaults.standardUserDefaults().stringForKey("userEmail")!
//        let userFirstname = firstnameTextField.text!
//        let userLastname = lastnameTextField.text!
//        let userPassword = passwordTextField.text!
//        let groupName = randomStringWithLength(32)
        
        dispatch_async(dispatch_get_main_queue(), {
            self.imageUploadRequest()
        })
        
//        let regUrl = NSURL(string: "http://tibblesscribbles.com/jaak-reg/userRegister.php")
//        let request = NSMutableURLRequest(URL: regUrl!)
//        request.HTTPMethod = "POST"
//        
//        let postString = "email=\(userEmail)&password=\(userPassword)&group_name=\(groupName)&firstname=\(userFirstname)&lastname=\(userLastname)"
//        
//        request.HTTPBody = postString.dataUsingEncoding(NSUTF8StringEncoding)
//        
//        let task = NSURLSession.sharedSession().dataTaskWithRequest(request) {
//            data, response, error in
//            
//            if error != nil {
//                print("error=\(error)")
//                return
//            }
//            
//            print("*** response data = \(response)")
//            
//            let responseString = NSString(data: data!, encoding: NSUTF8StringEncoding)
//            print("*** response data=\(responseString)")
//            
////            var jsonResponse = NSJSONSerialization.JSONObjectWithData(data!, options: .MutableLeaves, error: &err) as? NSDictionary
//            
//            do {
//                if let jsonResponse = try NSJSONSerialization.JSONObjectWithData(data!, options: []) as? NSDictionary {
//                    print(jsonResponse)
//                }
//            } catch let error as NSError {
//                print(error.localizedDescription)
//            }
//            
////            if let parseJSON = jsonResponse {
////                var emailValue = parseJSON["email"] as? String
////                var groupNameValue = parseJSON["group_name"]
////                var firstNameValue = parseJSON["firstname"] as? String
////                var lastNameValue = parseJSON["lastname"] as? String
////                
////                print("Email:\(emailValue), Groupname:\(groupNameValue), Firstname:\(firstNameValue), Lastname:\(lastNameValue)")
////            }
//        }
//        
//        task.resume()
        
    }
    
}

extension NSMutableData {
    func appendString(string: String) {
        let data = string.dataUsingEncoding(NSUTF8StringEncoding, allowLossyConversion: true)
        appendData(data!)
    }
}