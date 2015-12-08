//
//  CAGradientLayer+Convenience.swift
//  UserLogin
//
//  Created by Freddie Tibbles on 08/12/2015.
//  Copyright © 2015 TibblesScribbles. All rights reserved.
//

import UIKit

extension CAGradientLayer {

    func jaakGrdnt() -> CAGradientLayer {

        let topColour = UIColor(red: (249/255.0), green: (30/255.0), blue: (108/255.0), alpha: 1)
        let btmColour = UIColor(red: (239/255.0), green: (39/255.0), blue: (54/255.0), alpha: 1)
        
        let gradientColours: [CGColor] = [topColour.CGColor, btmColour.CGColor]
        let gradientLocations: [Float] = [0.0, 1.0]
        
        let gradientLayer: CAGradientLayer = CAGradientLayer()
        gradientLayer.colors = gradientColours
        gradientLayer.locations = gradientLocations
        
        return gradientLayer
    }
    
}
