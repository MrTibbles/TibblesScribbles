//
//  TrackListingsTableViewController.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit
import Alamofire
import SwiftyJSON

var TrackListings:[TrackListing] = []

class TrackListingsTableViewController: UITableViewController {

    @IBOutlet weak var plusBarButton: UIButton!
    @IBOutlet weak var equaliserBarButton: UIButton!
    @IBOutlet weak var userProfileImageView: UIImageView!
       
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
        if let userProfileImage = NSUserDefaults.standardUserDefaults().objectForKey("userProfileImage") {
            self.userProfileImageView.image = UIImage(data: userProfileImage as! NSData)
            self.userProfileImageView.layer.cornerRadius = self.userProfileImageView.frame.size.width/2
            self.userProfileImageView.clipsToBounds = true
        }
        
        get_data_from_url(scUrl)
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 1
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return TrackListings.count
    }
    
    //heightForRowAtIndexPath - varying height cells
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("TrackListingCell", forIndexPath: indexPath) as! TrackCell
        let track = TrackListings[indexPath.row]
        cell.track = track
        return cell
    }
    
    override func tableView(tableView: UITableView, didSelectRowAtIndexPath indexPath: NSIndexPath) {
        self.performSegueWithIdentifier("playScreenSegue", sender: self)
    }
    
    func get_data_from_url(url: String) {
        Alamofire.request(.GET, url)
            .response { request, response, data, error in
                do {
                    if data != nil && error == nil {
                        self.extractJSON(data!)
                    }
                } catch let error as NSError  {
                    print(error)
                }
        }
    }

    
    func extractJSON(jsonData:NSData) {
        do {
            if let tracks_list = try NSJSONSerialization.JSONObjectWithData(jsonData, options: []) as? NSArray  {
                for (var i = 0; i < tracks_list.count; i++ ) {
                    if let track_obj = tracks_list[i] as? NSDictionary {
//                        let artworkUrlString = track_obj["stream_url"] as? String {
//                            
//                        }
//                        getDataFromUrl() { (data, response, error) in
//                            dispatch_async(dispatch_get_main_queue()) { () -> Void in
//                                // guard let data = data where error == nil else { return }
//                                let streamData = data
//                            }
//                        }
                        if let track_id = track_obj["id"] as? Int {
                            if let user_obj = track_obj["user"] as? NSDictionary {
                                if let user = user_obj["username"] as? String {
                                    if let user_profile = user_obj["avatar_url"] as? String {
                                        if let title = track_obj["title"] as? String {
                                            if let playback_count = track_obj["playback_count"] as? Int {
                                                if let artwork_url = track_obj["artwork_url"] as? String {
                                                    if let stream_url = track_obj["stream_url"] as? String {
                                                        if let duration = track_obj["duration"] as? Int {
                                                            TrackListings.append(TrackListing(id: track_id, user: user, user_profile: user_profile, title: title, playback_count: playback_count, artwork_url: artwork_url, artwork_data: nil, stream_url: stream_url, durationRaw: duration, durationClean: 0.0, durationString: ""))
                                                        }
                                                    }
                                                }
                                            } else {
                                                print("no artwork for: \(track_obj["title"])")
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } catch let error as NSError {
            print(error)
        }
        doTableRefresh();
    }
    
    func doTableRefresh() {
        dispatch_async(dispatch_get_main_queue(), {
            self.tableView.reloadData()
            return
        })
    }
    
    // MARK: - Navigation
    
    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
        let playScreenVC: PlayScreenViewController = segue.destinationViewController
            as! PlayScreenViewController
        
        if let indexPath = self.tableView.indexPathForSelectedRow {
            let selectedTrack = TrackListings[indexPath.row]
            selectedTrackObject = selectedTrack
        }
    }
    
    @IBAction func returnFromSegueActions(sender: UIStoryboardSegue) {
//        if
    }
    
    override func segueForUnwindingToViewController(toViewController: UIViewController, fromViewController: UIViewController, identifier: String?) -> UIStoryboardSegue? {
        if let id = identifier {
            if id == "PlayScreenSegueUnwind" {
                let unwindSegue = PlayScreenSegueUnwind(identifier: id, source: fromViewController, destination: toViewController, performHandler: { () -> Void in
                    
                })
                return unwindSegue
            }
        }
        return super.segueForUnwindingToViewController(toViewController, fromViewController: fromViewController, identifier: identifier)
    }
    
    @IBAction func refreshTrackListings(sender: AnyObject) {
        //        get_data_from_url("https://api.soundcloud.com/users/149454089/favorites?client_id=331226404e6d7bc552199d8887d17537")
        print("Updating feed")
    }
       
    @IBAction func showCurrentPlaying(sender: AnyObject) {
        
    }

    /*
    // Override to support conditional editing of the table view.
    override func tableView(tableView: UITableView, canEditRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the specified item to be editable.
        return true
    }
    */

    /*
    // Override to support editing the table view.
    override func tableView(tableView: UITableView, commitEditingStyle editingStyle: UITableViewCellEditingStyle, forRowAtIndexPath indexPath: NSIndexPath) {
        if editingStyle == .Delete {
            // Delete the row from the data source
            tableView.deleteRowsAtIndexPaths([indexPath], withRowAnimation: .Fade)
        } else if editingStyle == .Insert {
            // Create a new instance of the appropriate class, insert it into the array, and add a new row to the table view
        }    
    }
    */

    /*
    // Override to support rearranging the table view.
    override func tableView(tableView: UITableView, moveRowAtIndexPath fromIndexPath: NSIndexPath, toIndexPath: NSIndexPath) {

    }
    */

    /*
    // Override to support conditional rearranging of the table view.
    override func tableView(tableView: UITableView, canMoveRowAtIndexPath indexPath: NSIndexPath) -> Bool {
        // Return false if you do not want the item to be re-orderable.
        return true
    }
    */
    

}
