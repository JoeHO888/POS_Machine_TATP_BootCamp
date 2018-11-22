const db = require('./db.js');
const auxiliary = require('./auxiliary.js');

const getAllDetailsOfAnItem = barcode=> {
	let detailsOfAnItem
	let needToBeWeighted = false
	let count = 1
	let AllItems = db.loadAllItems()
	let PromotionList = db.loadPromotions()
	
	if (barcode.includes('-')){
		count = parseFloat(barcode.substring(barcode.indexOf("-")+1,barcode.length))
		barcode = barcode.substring(0,barcode.indexOf("-"))
		needToBeWeighted = true
	}

	detailsOfAnItem= AllItems.filter(e=>e.barcode == barcode)[0]
	detailsOfAnItem['promotionType'] = auxiliary.getPromotionType(PromotionList,barcode)
	detailsOfAnItem['needToBeWeighted']= needToBeWeighted
	detailsOfAnItem['count']= count
	
	return detailsOfAnItem
}

const getSummary = (DetailsArray,barcode) =>{
	const selectedDetails = DetailsArray.filter(e=>e.barcode==barcode)
	let summary = {}
	
	summary['name'] = selectedDetails[0].name
	summary['price'] = selectedDetails[0].price
	summary['count'] = selectedDetails.map(e=>e.count).reduce(auxiliary.add,0.00)
	summary['subtotal'] = auxiliary.getSubtotal(selectedDetails,summary)
	summary['unit'] = auxiliary.getUnit(selectedDetails,summary)
	
	return summary
}


const printReceipt = barcodeArray=>{
	let receipt = "***<store earning no money>Receipt ***\n"
	let sum = 0
	let saving = 0
	const detailsArray = barcodeArray.map(e=>getAllDetailsOfAnItem(e))
	const uniqueBarcode = [...new Set(detailsArray.map(e=>e.barcode))] 
	
	uniqueBarcode.map(e=>{
		let summary = getSummary(detailsArray,e)
		
		receipt+=auxiliary.createALineOfReceipt(summary)
		sum+=summary.subtotal
		saving+=(summary.count*summary.price)-summary.subtotal
		receipt+="\n"
	})
	receipt+= '----------------------\n'
	receipt+= 'Total: '+sum.toFixed(2).toString()+' (yuan)\n'
	receipt+= 'Saving: '+saving.toFixed(2).toString()+' (yuan)\n'
	receipt+='**********************'
	return receipt
}


module.exports = {
  getAllDetailsOfAnItem: getAllDetailsOfAnItem,
  getSummary:getSummary,
  printReceipt:printReceipt
}