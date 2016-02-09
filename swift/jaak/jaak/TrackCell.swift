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
    @IBOutlet weak var artistProfileImageView: UIImageView!
    
    let borderWidth: CGFloat = 2.0
//    let borderColour
    
    var track: TrackListing! {
        didSet {
            trackNameLabel.text = track.title!.truncate(30)
            artistNameLabel.text = track.user
            
            //cannot assign to immutable expression of type CIImage - trying to send object
            downloadImage(track.artwork_url!, targetElement: "artwork")
            var artworkImage = artworkImageView.downloadedFrom(link: track.artwork_url!, contentMode: UIViewContentMode.ScaleToFill)
            artworkImageView.image = artworkImageView.downloadedFrom(link: track.artwork_url!, contentMode: UIViewContentMode.ScaleToFill)
            downloadImage(track.user_profile!, targetElement: "avatar")
        }
    }
    
    func getDataFromUrl(url:String, completion: ((data: NSData?, response: NSURLResponse?, error: NSError? ) -> Void)) {
        NSURLSession.sharedSession().dataTaskWithURL(NSURL(string: url)!) { (data, response, error) in
            completion(data: data, response: response, error: error)
            }.resume()
    }
    
    func downloadImage(url: String, targetElement: String){
        let newUrl = url.stringByReplacingOccurrencesOfString("large", withString: "t500x500")
        getDataFromUrl(newUrl) { (data, response, error)  in
            dispatch_async(dispatch_get_main_queue()) { () -> Void in
                guard let data = data where error == nil else { return }
                
                if targetElement == "artwork" {
                    self.artworkImageView.image = UIImage(data: data)
                } else {
                    self.artistProfileImageView.image = UIImage(data: data)
                    self.artistProfileImageView.layer.cornerRadius = self.artistProfileImageView.frame.size.width/2
                    self.artistProfileImageView.layer.borderColor = UIColor(red:141/255.0, green:141/255.0, blue:141/255.0, alpha: 0.75).CGColor
                    self.artistProfileImageView.layer.borderWidth = 2.0
                    
                    self.artistProfileImageView.clipsToBounds = true
                }
            }
        }
    }

}
