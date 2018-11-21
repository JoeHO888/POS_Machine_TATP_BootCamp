
	
	
function getAllDetailsOfAnItem (barcode) {
	let detailsOfAnItem
	let needToBeWeighted = false
	let count = 1
	
	if (barcode.includes('-')){
		count = parseFloat(barcode.substring(barcode.indexOf("-")+1,barcode.length))
		barcode = barcode.substring(0,barcode.indexOf("-"))
		needToBeWeighted = true
	}
	
	let AllItems = loadAllItems()
	let PromotionList = loadPromotions()
	
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
	summary['unit'] = selectedDetails[0].unit
	summary['price'] = selectedDetails[0].price
	summary['count'] = selectedDetails.map(e=>e.count).reduce(add,0.00)
	if (selectedDetails[0].promotionType == "BUY_TWO_GET_ONE_FREE"){
		summary['subtotal'] = (Math.floor(summary['count']/3)*2+summary['count']%3)*summary['price']
	}else{
		summary['subtotal'] = summary['count']*summary['price']
	}
	
	
	return summary
}

function add(a, b) {
    return a + b;
}

const createALineOfReceipt = summary=>"Name: "+summary.name+", Quantity: "+summary.count+" "+summary.unit+", Unit price: "+summary.price.toFixed(2).toString()+" (yuan), Subtotal: "+summary.subtotal.toFixed(2).toString()+" (yuan)"


const printReceipt = barcodeArray=>{
	let receipt = "***<store earning no money>Receipt ***"
	const detailsArray = barcodeArray.map(e=>getAllDetailsOfAnItem(e))
	const uniqueBarcode = [...new Set(detailsArray.map(e=>e.barcode))] 
	uniqueBarcode.map((e,index)=>{
		receipt+="\n"
		receipt+=createALineOfReceipt(getSummary(detailsArray,e))

	})
	receipt+= '----------------------'
	return receipt
}


const loadAllItems = ()=> {
  return [
    {
      barcode: 'ITEM000000',
      name: 'Coca-Cola',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000001',
      name: 'Sprite',
      unit: 'bottle',
      price: 3.00
    },
    {
      barcode: 'ITEM000002',
      name: 'Apple',
      unit: 'kg',
      price: 5.50
    },
    {
      barcode: 'ITEM000003',
      name: 'Litchi',
      unit: 'kg',
      price: 15.00
    },
    {
      barcode: 'ITEM000004',
      name: 'Battery',
      unit: 'box',
      price: 2.00
    },
    {
      barcode: 'ITEM000005',
      name: 'Noodles',
      unit: 'bag',
      price: 4.50
    }
  ];
}

const loadPromotions = ()=>  {
  return [
    {
      type: 'BUY_TWO_GET_ONE_FREE',
      barcodes: [
        'ITEM000000',
        'ITEM000001',
        'ITEM000005'
      ]
    }
  ];
}


//module.exports = {getAllDetailsOfAnItem:getAllDetailsOfAnItem(barcode)};
module.exports = {getAllDetailsOfAnItem,loadPromotions};

module.exports = {
  getAllDetailsOfAnItem: getAllDetailsOfAnItem,
  loadPromotions: loadPromotions,
  getSummary:getSummary,
  createALineOfReceipt:createALineOfReceipt
}