var assert = chai.assert;

suite('PRUEBAS PARA COMPROBAR LA ASOCIATIVIDAD A IZQUIERDAS', function() {
	test('a = 1 + 2 * 3 / 4 .', function() {
		var tree = pl0.parse('a = 1 + 2 * 3 / 4 .');
		assert.equal(tree.block[0].statement.type, '=')
		assert.equal(tree.block[0].statement.right.type, '+')
		assert.equal(tree.block[0].statement.right.right.type, '/')
		assert.equal(tree.block[0].statement.right.right.left.type, '*')
	});
});

suite('PRUEBAS PARA COMPROBAR LOS CONSTRUCTORES DEL LENGUAJE', function() {
	test('VAR', function() {
   	 	var aux = pl0.parse('var a, b;.')
   	 	$('#output').html(JSON.stringify(aux,undefined,2));
		assert.equal(output.innerHTML,'{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "VAR",\n      "value": [\n        {\n          "type": "ID",\n          "value": "a"\n        },\n        {\n          "type": "ID",\n          "value": "b"\n        }\n      ]\n    }\n  ]\n}');
		assert.isString($("#output").val());
    });	
    test('CONST', function() {
   	 	var aux = pl0.parse('const a = 2, b = 3;.')
   	 	$('#output').html(JSON.stringify(aux,undefined,2));
		assert.equal(output.innerHTML,'{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "CONST",\n      "value": [\n        {\n          "type": "=",\n          "left": {\n            "type": "ID",\n            "value": "a"\n          },\n          "right": {\n            "type": "NUM",\n            "value": 2\n          }\n        },\n        {\n          "type": "=",\n          "left": {\n            "type": "ID",\n            "value": "b"\n          },\n          "right": {\n            "type": "NUM",\n            "value": 3\n          }\n        }\n      ]\n    }\n  ]\n}');
		assert.isString(output.innerHTML);
    });
    test('PROCEDURE y BEGIN', function() {
		var tree = pl0.parse('procedure area; var b, h, a; begin a = b * h end.');
		assert.isUndefined(tree.block[0].procedure.argument)
		assert.equal(tree.block[0].statement.type, 'BEGIN')
	});
	test('IF y IFELSE', function() {
		var if_ = pl0.parse('if a == 3 then b = 1.');
		var ifelse = pl0.parse('if b >= 3 then b = a else a = b.');
 
		assert.isNumber(if_.block[0].statement.c.right.value)
		assert.deepEqual(if_.block[0].statement.type, 'IF')

		assert.deepEqual(ifelse.block[0].statement.type, 'IFELSE')
	});
	test('CALL', function() {
		var call_ = pl0.parse('call area (a).');
		var call = pl0.parse('call area .');
 
		assert.equal(call_.block[0].statement.type, 'CALL')
		assert.equal(call_.block[0].statement.argument[0].value, 'a')

		assert.deepEqual(call.block[0].statement.type, 'CALL')
		assert.isNull(call.block[0].statement.argument)
	});
	test('WHILE', function() {
		var while_ = pl0.parse('while a > 3 do a = 4.');
 
		assert.isNumber(while_.block[0].statement.c.right.value, '3')
		assert.isString(while_.block[0].statement.c.type, 'COMPARISON')
		assert.deepEqual(while_.block[0].statement.type, 'WHILE')
	});
});

suite('PRUEBAS PARA SITUACIONES DE ERROR', function() {
	test('a = 1 + 2 * 3 / 4 ', function() {
		assert.throws(function() { pl0.parse('a = 1 + 2 * 3 / 4 '); }, /Expected/);
	});
});

suite('PRUEBAS PARA EL LOCALSTORAGE', function() {
	test('Soporta localStorage', function() {
		if (window.localStorage) {
			localStorage.output = '{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "VAR",\n      "value": [\n        {\n          "type": "ID",\n          "value": "a"\n        },\n        {\n          "type": "ID",\n          "value": "b"\n        }\n      ]\n    }\n  ]\n}';
			assert.deepEqual(localStorage.output, '{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "VAR",\n      "value": [\n        {\n          "type": "ID",\n          "value": "a"\n        },\n        {\n          "type": "ID",\n          "value": "b"\n        }\n      ]\n    }\n  ]\n}');
		}
	});
});