class TipCalculator {
    let total: Double
    let taxPct: Double
    let subTotal: Double
    
    init(total: Double, taxPct: Double) {
        self.total = total
        self.taxPct = taxPct
        subTotal = total / (taxPct + 1)
    }
    
    func calcTipWithTipPct(tipPct: Double) -> Double {
        return subTotal * tipPct
    }
    
    func returnPossibleTips() -> [Int: Double] {
        let possibleTipsInferred = [0.15, 0.18, 0.20]
        
        var retval = [Int: Double]()
        for possibleTip in possibleTipsInferred {
            let intPct = Int(possibleTip * 100)
            
            retval[intPct] = calcTipWithTipPct(possibleTip)
        }
        return retval
    }
}

let tipCalc = TipCalculator(total: 32.00, taxPct: 0.06)
tipCalc.returnPossibleTips()