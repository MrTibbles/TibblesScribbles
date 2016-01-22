//
//  PlayScreenViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class PlayScreenViewController: UIViewController {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        let swipeGestureRecognizer: UISwipeGestureRecognizer = UISwipeGestureRecognizer(target: self, action: "PlayScreenToTrackListings")
        swipeGestureRecognizer.direction = UISwipeGestureRecognizerDirection.Right
        self.view.addGestureRecognizer(swipeGestureRecognizer)
    }
    
    func PlayScreenToTrackListings() {
        self.performSegueWithIdentifier("PlayScreenSegueUnwind", sender: self)
    }    

}


class BackendService {
    
    
    class func performLogin(#email: String, password: String, success:((res: NSHTTPURLResponse, json: JSON, statusCode: HTTPStatus))->(), failure: (NSError)->()) {
        
        let loginURL = baseURL + "/login"
        let parameters = ["email": email, "password": password]
        
        Alamofire.request(.POST, loginURL, parameters: parameters).responseJSON { (req, res, json, err) in
            
            if(err != nil) {
                let response = (error: err!)
                failure(response)
            }
            else {
                
                
                if let httpStatus = HTTPStatus(rawValue: res!.statusCode) {
                    let response = (res: res, json: JSON(json!) , statusCode: httpStatus)
                    success(response)
                }
            }
        }
        
}