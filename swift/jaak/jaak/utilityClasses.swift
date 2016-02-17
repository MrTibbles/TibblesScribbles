//
//  utilityClasses.swift
//  jaak
//
//  Created by Freddie Tibbles on 17/02/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import Foundation

class CountdownTimer {
    var time: NSTimeInterval
    
    private var startTime: NSDate?
    
    init(countDownFrom timeInSeconds: Double) {
        time = NSTimeInterval(timeInSeconds)
    }
    
    func start() {
        startTime = NSDate()
    }
    
    func isValid() -> Bool {
        if (startTime != nil) {
            let timePassed: NSTimeInterval = -(startTime!.timeIntervalSinceNow)
            
//            print(time)
//            print(time - timePassed)
            
            return timePassed < time
        }
        else {
            return false
        }
    }
    
    func elapsedTime() -> String {
        return "G"
    }
}