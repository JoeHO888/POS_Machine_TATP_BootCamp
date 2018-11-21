const main = require('../main');


const text1 = {
		'barcode': 'ITEM000001',
		'name': 'Sprite',
		'unit': 'bottle',
		'price': 3.00,
		'promotionType':'BUY_TWO_GET_ONE_FREE',
		'needToBeWeighted':false,
		'count':1	
	}
	
const text2 = {
		'barcode': 'ITEM000003',
		'name': 'Litchi',
		'unit': 'kg',
		'price': 15.00,
		'promotionType':'',
		'needToBeWeighted':true,
		'count':2
	}
	

const input3 = [{
		'barcode': 'ITEM000003',
		'name': 'Litchi',
		'unit': 'kg',
		'price': 15.00,
		'promotionType':'',
		'needToBeWeighted':true,
		'count':2
	},{
		'barcode': 'ITEM000001',
		'name': 'Sprite',
		'unit': 'bottle',
		'price': 3.00,
		'promotionType':'BUY_TWO_GET_ONE_FREE',
		'needToBeWeighted':false,
		'count':1	
	}]
	
const text3 = {
		'name': 'Litchi',
		'unit': 'kg',
		'price': 15.00,
		'count':2,
		'subtotal':30.00
	}
	
const text4 = "Name: Litchi, Quantity: 2 kg, Unit price: 15.00 (yuan), Subtotal: 30.00 (yuan)"
	

it ('should output an obeject with all details', () => {
    expect(main.getAllDetailsOfAnItem('ITEM000001')).toEqual(text1);
});

it ('should output an obeject with all details', () => {
    expect(main.getAllDetailsOfAnItem('ITEM000003-2')).toEqual(text2);
});

it ('should output a summary for a specific barcode', () => {
    expect(main.getSummary(input3,'ITEM000003')).toEqual(text3);
});

it ('should output a line of summary', () => {
    expect(main.createALineOfReceipt(text3)).toEqual(text4);
});
	