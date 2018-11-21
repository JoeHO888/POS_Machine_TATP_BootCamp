const main = require('../main');


const text1 = {
		'barcode': 'ITEM000001',
		'name': 'Sprite',
		'unit': 'bottle',
		'price': 3.00,
		'PromotionType':'BUY_TWO_GET_ONE_FREE',
		'needToBeWeighted':false,
		'count':1
		
		
	}
	
const text2 = {
		'barcode': 'ITEM000003',
		'name': 'Litchi',
		'unit': 'kg',
		'price': 15.00,
		'PromotionType':'',
		'needToBeWeighted':true,
		'count':2
		
		
	}
	
	

it ('should output an obeject with all details', () => {
    expect(main.getAllDetailsOfAnItem('ITEM000001')).toEqual(text1);
});

it ('should output an obeject with all details', () => {
    expect(main.getAllDetailsOfAnItem('ITEM000003-2')).toEqual(text2);
});
	