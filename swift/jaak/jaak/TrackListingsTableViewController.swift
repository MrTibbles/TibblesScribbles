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

class TrackListingsTableViewController: UITableViewController {

    var TrackListings:[TrackListing] = tracksData
    var soundcloudTracks:[TrackListing] = []

       
    override func viewDidLoad() {
        super.viewDidLoad()

        // Uncomment the following line to preserve selection between presentations
        // self.clearsSelectionOnViewWillAppear = false

        // Uncomment the following line to display an Edit button in the navigation bar for this view controller.
        // self.navigationItem.rightBarButtonItem = self.editButtonItem()
        
        Alamofire.request(.GET, "https://api.soundcloud.com/users/149454089/favorites?client_id=331226404e6d7bc552199d8887d17537")
            .response { request, response, data, error in
                let cleanJson = JSON(data: data!)
//                print(cleanJson[0]["stream_url"])
                for (key, cleanJson):(String, JSON) in cleanJson {
                    var id = cleanJson["id"].int
                    var user = cleanJson["user"]["username"].string
                    var title = cleanJson["title"].string
                    var playback_count = cleanJson["playback_count"].int
                    var artwork_url = cleanJson["artwork_url"].string
                    var stream_url = cleanJson["stream_url"].string
                    var duration = cleanJson["duration"].int
                    var durationClean = cleanJson["duration"].int
                    
                    
                    self.soundcloudTracks.append(TrackListing(id: id, user: user, title: title, playback_count: playback_count, artwork_url: artwork_url, stream_url: stream_url, duration: duration, durationClean: duration))
                }
                
                
//                do {
//                    if let jsonResponse = try NSJSONSerialization.JSONObjectWithData(data!, options: []) as? NSDictionary {
////                        print("JSON: \(jsonResponse)")
//                    }
//                } catch let error as NSError {
//                    print(error)
//                }
        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

    // MARK: - Table view data source

    override func numberOfSectionsInTableView(tableView: UITableView) -> Int {
        return 5
    }
    
    override func tableView(tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return self.soundcloudTracks.count
    }
    
    //heightForRowAtIndexPath - varying height cells
    override func tableView(tableView: UITableView, cellForRowAtIndexPath indexPath: NSIndexPath) -> UITableViewCell {
        let cell = tableView.dequeueReusableCellWithIdentifier("TrackListingCell", forIndexPath: indexPath) as! TrackCell
        
        let track = self.soundcloudTracks[indexPath.row] as! TrackListing
        cell.track = track
        return cell
    }
    
    @IBAction func playButtonTapped(sender: UIButton) {
        self.performSegueWithIdentifier("playScreenSegue", sender: self)
    }
    
    @IBAction func returnFromSegueActions(sender: UIStoryboardSegue) {
        
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

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepareForSegue(segue: UIStoryboardSegue, sender: AnyObject?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
