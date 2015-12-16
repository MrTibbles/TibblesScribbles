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
            trackNameLabel.text = track.trackName
            artistNameLabel.text = track.artistName
            //            artworkImageView.image = getImageFromUrl(track.artworkURL)
        }
    }
    
    //    func getImageFromURL(url: String) -> UIImage? {
    //        let imageURL = NSURL(string: url)
    //        return UIImage(imageURL)
    //    }
}
