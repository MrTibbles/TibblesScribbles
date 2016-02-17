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
    var user_profile: String? = "jaak"
    var title: String? = "jaak"
    var playback_count: Int? = 99
    var artwork_url: String? = "jaak"
    var artwork_data:NSData? = nil
    var stream_url: String? = "jaak"
    var durationRaw: Int? = 0
    var durationClean: Double? = 0.0
    var durationString: String? = "0:0.00"
    
    init(id: Int?, user: String?, user_profile: String?, title: String?, playback_count: Int?, artwork_url: String?, artwork_data: NSData?, stream_url: String?, durationRaw: Int?, durationClean: Double?, durationString: String?) {
        if id != nil {
            self.id = id!
        }
        if user != nil {
            self.user = user!
        }
        if user_profile != nil {
            self.user_profile = user_profile!
        }
        if title != nil {
            self.title = title!
        }
        if playback_count != nil {
            self.playback_count = playback_count!
        }
        if artwork_url != nil {
            self.artwork_url = artwork_url!.stringByReplacingOccurrencesOfString("large", withString: "t500x500")
        }
        if artwork_data != nil {
            self.artwork_data = artwork_data!
        }
        if stream_url != nil {
            self.stream_url = stream_url!+"?client_id=13c08d059109e6e6e7144bef8e8d82ba"
        }
        if durationRaw != nil {
            self.durationRaw = durationRaw!
        }
        if durationClean != nil {
            self.durationClean = durationRaw!.msToSeconds
        }
        if durationRaw != nil {
            let formatted = durationRaw?.msToSeconds.minuteSecondMS
            self.durationString = formatted!
        }
        
    }
    
    func getValue(key: String!) -> String {
        print(self)
        return key
    }
    
}
