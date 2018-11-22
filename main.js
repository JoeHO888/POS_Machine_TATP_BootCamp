const db = require('./db.js');

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
	
	if ((PromotionList[0].barcodes.filter(e=>e == barcode)).length==1){
		detailsOfAnItem['promotionType']= PromotionList[0].type
	}else{
		detailsOfAnItem['promotionType']= ""	
	}
	
	detailsOfAnItem['needToBeWeighted']= needToBeWeighted
	detailsOfAnItem['count']= count
	
	return detailsOfAnItem
}

const getSummary = (DetailsArray,barcode) =>{
	const selectedDetails = DetailsArray.filter(e=>e.barcode==barcode)
	summary = {}
	summary['name'] = selectedDetails[0].name
	summary['price'] = selectedDetails[0].price
	summary['count'] = selectedDetails.map(e=>e.count).reduce(add,0.00)
	
	if (selectedDetails[0].promotionType == "BUY_TWO_GET_ONE_FREE"){
		summary['subtotal'] = (Math.floor(summary['count']/3)*2+summary['count']%3)*summary['price']
	}else{
		summary['subtotal'] = summary['count']*summary['price']
	}
	
	summary['unit'] = getUnit(selectedDetails,summary)
	
	return summary
}

const getUnit = (selectedDetails,summary)=>{
	let unit
	
	if ( selectedDetails[0].unit!='kg'&& selectedDetails[0].unit!='box'&&summary['count']>1){
		unit = selectedDetails[0].unit+'s'
	}else if(summary['unit']=='box'){
		unit = selectedDetails[0].unit+'es'
	}else{
		unit = selectedDetails[0].unit
	}
	return unit
	
}

const add = (a, b) => a + b

const createALineOfReceipt = summary=>"Name: "+summary.name+", Quantity: "+summary.count+" "+summary.unit+", Unit price: "+summary.price.toFixed(2).toString()+" (yuan), Subtotal: "+summary.subtotal.toFixed(2).toString()+" (yuan)"


const printReceipt = barcodeArray=>{
	let receipt = "***<store earning no money>Receipt ***\n"
	let sum = 0;
	let saving = 0;
	const detailsArray = barcodeArray.map(e=>getAllDetailsOfAnItem(e))
	const uniqueBarcode = [...new Set(detailsArray.map(e=>e.barcode))] 
	uniqueBarcode.map(e=>{
		let summary = getSummary(detailsArray,e)
		
		receipt+=createALineOfReceipt(summary)
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
  createALineOfReceipt:createALineOfReceipt,
  printReceipt:printReceipt
}