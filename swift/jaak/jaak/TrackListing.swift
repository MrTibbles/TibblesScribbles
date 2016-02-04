//
//  TrackListing.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

struct TrackListing {
    
    var trackId: Int?
    var artistName: String?
    var trackName: String?
    var playbackCount: Int?
    var artworkURL: String?
    //    var artworkImage: UIImageView?
    var streamURL: String?
    var duration: Int?
    var durationClean: Int?
    
    init(trackId: Int?, artistName: String?, trackName: String?, playbackCount: Int?, artworkURL: String?, streamURL: String?, duration: Int?, durationClean: Int?) {
        self.trackId = trackId!
        self.artistName = artistName!
        self.trackName = trackName!
        self.playbackCount = playbackCount!
        self.artworkURL = artworkURL!
        self.streamURL = streamURL!
        self.duration = duration!
        self.durationClean = durationClean!
        
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
