//
//  UserProfileViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 10/02/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import UIKit

class UserProfileViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate  {
    
    @IBOutlet weak var inviteButton: UIButton!
    @IBOutlet weak var userProfileImageView: UIImageView!
    @IBOutlet weak var userNameLabel: UILabel!
    @IBOutlet weak var jaakCreditCountView: UIView!
    @IBOutlet weak var friendsCountView: UIView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        let background = CAGradientLayer().jaakGrdnt()
        background.frame = self.view.bounds
        self.view.layer.insertSublayer(background, atIndex: 0)
        
        userProfileImageView.layer.cornerRadius = userProfileImageView.frame.width/2
        
        jaakCreditCountView.layer.cornerRadius = jaakCreditCountView.frame.size.width/14
        jaakCreditCountView.clipsToBounds = true
        
        friendsCountView.layer.cornerRadius = friendsCountView.frame.size.width/14
        friendsCountView.clipsToBounds = true
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    @IBAction func userProfileCameraButtonTapped(sender: AnyObject) {
        let picker = UIImagePickerController()
        picker.delegate = self
        picker.sourceType = .Camera
        
        presentViewController(picker, animated: true, completion: nil)
    }
    
    func imagePickerController(picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : AnyObject]) {
        
        userProfileImageView.image = info[UIImagePickerControllerOriginalImage] as? UIImage;
        userProfileImageView.frame = CGRectMake(0, 0, 100, 100)
        userProfileImageView.layer.cornerRadius = userProfileImageView.frame.width/2
        userProfileImageView.clipsToBounds = true
        dismissViewControllerAnimated(true, completion: nil)
        
        //save data to DB
        
    }
}
