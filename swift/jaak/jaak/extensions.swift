//
//  extensions.swift
//  jaak
//
//  Created by Freddie Tibbles on 09/02/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import Foundation
import UIKit

extension String {
    /// Truncates the string to length number of characters and
    /// appends optional trailing string if longer
    func truncate(length: Int, trailing: String? = "...") -> String {
        if countElements(self) >= length {
            return self.substringToIndex(self.startIndex.advancedBy(length)) + (trailing ?? "")
        } else {
            return self
        }
    }
}

func countElements(str: String) -> Int {
    return str.characters.count
}

func getDataFromUrl(url:String, completion: ((data: NSData?, response: NSURLResponse?, error: NSError? ) -> Void)) {
    NSURLSession.sharedSession().dataTaskWithURL(NSURL(string: url)!) { (data, response, error) in
        completion(data: data, response: response, error: error)
    }.resume()
}

extension UIImageView {
    
    func downloadedFrom(link link:String, contentMode mode: UIViewContentMode) {
        guard
            let url = NSURL(string: link)
            else {return}
//        contentMode = mode
        NSURLSession.sharedSession().dataTaskWithURL(url, completionHandler: { (data, response, error) -> Void in
            guard
                let httpURLResponse = response as? NSHTTPURLResponse where httpURLResponse.statusCode == 200,
                let mimeType = response?.MIMEType where mimeType.hasPrefix("image"),
                let data = data where error == nil,
                let image = UIImage(data: data)
                else { return }
            dispatch_async(dispatch_get_main_queue()) { () -> Void in
                self.image = image
            }
        }).resume()
    }
    
    func getDataFromUrl(url:String, completion: ((data: NSData?, response: NSURLResponse?, error: NSError? ) -> Void)) {
        NSURLSession.sharedSession().dataTaskWithURL(NSURL(string: url)!) { (data, response, error) in
            completion(data: data, response: response, error: error)
            }.resume()
    }
    
}
