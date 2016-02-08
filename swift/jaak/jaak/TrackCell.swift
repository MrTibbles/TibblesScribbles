//
//  TrackCell.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

class TrackCell: UITableViewCell {
    
    @IBOutlet weak var trackNameLabel: UILabel!
    @IBOutlet weak var artistNameLabel: UILabel!
    @IBOutlet weak var artworkImageView: UIImageView!
    
    var track: TrackListing! {
        didSet {
            trackNameLabel.text = track.title
            artistNameLabel.text = track.user
            
            downloadImage(track.artwork_url!)
        }
    }
    
    func getDataFromUrl(url:String, completion: ((data: NSData?, response: NSURLResponse?, error: NSError? ) -> Void)) {
        NSURLSession.sharedSession().dataTaskWithURL(NSURL(string: url)!) { (data, response, error) in
            completion(data: data, response: response, error: error)
            }.resume()
    }
    
    func downloadImage(url: String){
        let newUrl = url.stringByReplacingOccurrencesOfString("large", withString: "t500x500")
        getDataFromUrl(newUrl) { (data, response, error)  in
            dispatch_async(dispatch_get_main_queue()) { () -> Void in
                guard let data = data where error == nil else { return }
                self.artworkImageView.image = UIImage(data: data)
            }
        }
    }

}
