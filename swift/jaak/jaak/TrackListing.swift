//
//  TrackListing.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

struct TrackListing {
    
    var id: Int? = 99
    var user: String? = "jaak"
    var title: String? = "jaak"
    var playback_count: Int? = 99
    var artwork_url: String? = "jaak"
    //    var artworkImage: UIImageView?
    var stream_url: String? = "jaak"
    var duration: Int? = 99
    var durationClean: Int? = 99
    
    init(id: Int?, user: String?, title: String?, playback_count: Int?, artwork_url: String?, stream_url: String?, duration: Int?, durationClean: Int?) {
        if id != nil {
            self.id = id!
        }
        if user != nil {
            self.user = user!
        }
        if title != nil {
            self.title = title!
        }
        if playback_count != nil {
            self.playback_count = playback_count!
        }
        if artwork_url != nil {
            self.artwork_url = artwork_url!
        }
        if stream_url != nil {
            self.stream_url = stream_url!
        }
        if duration != nil {
            self.duration = duration!
        }
        if duration != nil {
            self.durationClean = durationClean!
        }
        
        //        downloadImage(artworkURL!)
    }
    
    //    func getDataFromUrl(url:NSURL, completion: ((data: NSData?, response: NSURLResponse?, error: NSError? ) -> Void)) {
    //        NSURLSession.sharedSession().dataTaskWithURL(url) { (data, response, error) in
    //            completion(data: data, response: response, error: error)
    //            }.resume()
    //    }
    //
    //    func downloadImage(url: NSURL){
    //        print("Download Started - lastPathComponent: " + (url.lastPathComponent ?? ""))
    //
    //        getDataFromUrl(url) { (data, response, error)  in
    //            dispatch_async(dispatch_get_main_queue()) { () -> Void in
    //                guard let data = data where error == nil else { return }
    //                print(response?.suggestedFilename ?? "")
    //                print("Download Finished")
    //                self.artworkImage!.image = UIImage(data: data)
    //            }
    //        }
    //    }
}
