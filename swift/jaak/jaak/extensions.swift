//
//  extensions.swift
//  jaak
//
//  Created by Freddie Tibbles on 09/02/2016.
//  Copyright © 2016 jaak. All rights reserved.
//

import Foundation

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