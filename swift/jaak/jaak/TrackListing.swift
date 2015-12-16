//
//  TrackListing.swift
//  jaak
//
//  Created by Freddie Tibbles on 16/12/2015.
//  Copyright © 2015 jaak. All rights reserved.
//

import UIKit

struct TrackListing {
    
    var trackName: String?
    var artistName: String?
    var artworkURL: String?
    var streamURL: String?
    
    init(trackName: String?, artistName: String?, artworkURL: String?, streamURL: String?) {
        self.trackName = trackName
        self.artistName = artistName
        self.artworkURL = artworkURL
        self.streamURL = streamURL
    }
}

//func getDataFromUrl(url:NSURL, completion: ((data: NSData?, response: NSURLResponse?, error: NSError? ) -> Void)) {
//    NSURLSession.sharedSession().dataTaskWithURL(url) { (data, response, error) in
//        completion(data: data, response: response, error: error)
//        }.resume()
//}
//
//func downloadImage(url: NSURL){
//    print("Download Started")
//    print("lastPathComponent: " + (url.lastPathComponent ?? ""))
//    getDataFromUrl(url) { (data, response, error)  in
//        dispatch_async(dispatch_get_main_queue()) { () -> Void in
//            guard let data = data where error == nil else { return }
//            print(response?.suggestedFilename ?? "")
//            print("Download Finished")
//            artworkURL.image = UIImage(data: data)
//        }
//    }
//}