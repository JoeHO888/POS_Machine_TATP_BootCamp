

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

const getPromotionType = (PromotionList,barcode)=>{
	let promotionType
	if ((PromotionList[0].barcodes.filter(e=>e == barcode)).length==1){
		promotionType= PromotionList[0].type
	}else{
		promotionType= ""	
	}

	return promotionType
	
}

const getSubtotal = (selectedDetails,summary)=>{
	let subtotal 
	
	if (selectedDetails[0].promotionType == "BUY_TWO_GET_ONE_FREE"){
		subtotal = (Math.floor(summary['count']/3)*2+summary['count']%3)*summary['price']
	}else{
		subtotal = summary['count']*summary['price']
	}
	
	return subtotal
	
}

const add = (a, b) => a + b

const createALineOfReceipt = summary=>"Name: "+summary.name+", Quantity: "+summary.count+" "+summary.unit+", Unit price: "+summary.price.toFixed(2).toString()+" (yuan), Subtotal: "+summary.subtotal.toFixed(2).toString()+" (yuan)"

module.exports = {
  getUnit: getUnit,
  add:add,
  createALineOfReceipt:createALineOfReceipt,
  getPromotionType:getPromotionType,
  getSubtotal:getSubtotal
}