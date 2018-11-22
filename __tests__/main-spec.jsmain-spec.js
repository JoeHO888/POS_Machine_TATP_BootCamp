const main = require('../main');
const auxiliary = require('../auxiliary.js');


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
	},{
		'barcode': 'ITEM000001',
		'name': 'Sprite',
		'unit': 'bottle',
		'price': 3.00,
		'promotionType':'BUY_TWO_GET_ONE_FREE',
		'needToBeWeighted':false,
		'count':1	
	},{
		'barcode': 'ITEM000001',
		'name': 'Sprite',
		'unit': 'bottle',
		'price': 3.00,
		'promotionType':'BUY_TWO_GET_ONE_FREE',
		'needToBeWeighted':false,
		'count':1	
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
	
const text5 = {
		'name': 'Sprite',
		'unit': 'bottles',
		'price': 3.00,
		'count':4,
		'subtotal':9.00
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
    expect(auxiliary.createALineOfReceipt(text3)).toEqual(text4);
});

it ('should output a summary for a specific barcode', () => {
    expect(main.getSummary(input3,'ITEM000001')).toEqual(text5);
});

it('should print text', () => {

    const tags = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2.5',
      'ITEM000005',
      'ITEM000005-2',
    ];
    const expectText = '***<store earning no money>Receipt ***\n'+'Name: Sprite, Quantity: 5 bottles, Unit price: 3.00 (yuan), Subtotal: 12.00 (yuan)\n'+'Name: Litchi, Quantity: 2.5 kg, Unit price: 15.00 (yuan), Subtotal: 37.50 (yuan)\n'+'Name: Noodles, Quantity: 3 bags, Unit price: 4.50 (yuan), Subtotal: 9.00 (yuan)\n'+'----------------------\n'+'Total: 58.50 (yuan)\n'+'Saving: 7.50 (yuan)\n'+'**********************'
    expect(main.printReceipt(tags)).toEqual(expectText);
  });
