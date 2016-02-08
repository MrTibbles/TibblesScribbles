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
//    var userProfile: String? = "jaak"
    var title: String? = "jaak"
    var playback_count: Int? = 99
    var artwork_url: String? = "jaak"
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
        
    }
    
}
