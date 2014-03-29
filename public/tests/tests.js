var assert = chai.assert;

suite('PRUEBAS PARA COMPROBAR LA ASOCIATIVIDAD A IZQUIERDAS', function() {
	test('a = 1 + 2 * 3 / 4 .', function() {
		var tree = pl0.parse('a = 1 + 2 * 3 / 4 .');
		assert.equal(tree.block[0].type, '=')
		assert.equal(tree.block[0].right.type, '+')
		assert.equal(tree.block[0].right.right.type, '/')
		assert.equal(tree.block[0].right.right.left.type, '*')
	});
});

suite('PRUEBAS PARA COMPROBAR LOS CONSTRUCTORES DEL LENGUAJE', function() {
	test('VAR', function() {
   	 	var aux = pl0.parse('var a, b; call a.')
   	 	$('#output').html(JSON.stringify(aux,undefined,2));
		assert.equal(output.innerHTML,'{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "VAR",\n      "value": [\n        {\n          "type": "ID",\n          "value": "a"\n        },\n        {\n          "type": "ID",\n          "value": "b"\n        }\n      ]\n    },\n    {\n      "type": "CALL",\n      "value": {\n        "type": "ID",\n        "value": "a"\n      },\n      "argument": null\n    }\n  ]\n}');
		assert.isString($("#output").val());
    });	
    test('CONST', function() {
   	 	var aux = pl0.parse('const a = 2, b = 3; call b (2).')
   	 	$('#output').html(JSON.stringify(aux,undefined,2));
		assert.equal(output.innerHTML,'{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "CONST",\n      "value": [\n        {\n          "type": "=",\n          "left": {\n            "type": "ID",\n            "value": "a"\n          },\n          "right": {\n            "type": "NUM",\n            "value": 2\n          }\n        },\n        {\n          "type": "=",\n          "left": {\n            "type": "ID",\n            "value": "b"\n          },\n          "right": {\n            "type": "NUM",\n            "value": 3\n          }\n        }\n      ]\n    },\n    {\n      "type": "CALL",\n      "value": {\n        "type": "ID",\n        "value": "b"\n      },\n      "argument": [\n        {\n          "type": "NUM",\n          "value": 2\n        }\n      ]\n    }\n  ]\n}');
		assert.isString(output.innerHTML);
    });
    test('PROCEDURE y BEGIN', function() {
		var tree = pl0.parse('procedure area; var b, h, a; begin a = b * h end call area (1, 2).');
		assert.isNull(tree.block[0].argument)
		assert.equal(tree.block[0].type, 'PROCEDURE')
		assert.equal(tree.block[0].block[1].type, 'BEGIN')
		assert.equal(tree.block[1].type, 'CALL')
	});
	test('IF y IFELSE', function() {
		var if_ = pl0.parse('if a == 3 then b = 1.');
		var ifelse = pl0.parse('if b >= 3 then b = a else a = b.');
 
		assert.isNumber(if_.block[0].c.right.value)
		assert.deepEqual(if_.block[0].type, 'IF')

		assert.deepEqual(ifelse.block[0].type, 'IFELSE')
	});
	test('CALL', function() {
		var call_ = pl0.parse('call area (a).');
		var call = pl0.parse('call area .');
 
		assert.equal(call_.block[0].type, 'CALL')
		assert.equal(call_.block[0].argument[0].value, 'a')

		assert.deepEqual(call.block[0].type, 'CALL')
		assert.isNull(call.block[0].argument)
	});
	test('WHILE', function() {
		var while_ = pl0.parse('while a > 3 do a = 4.');
 
		assert.isNumber(while_.block[0].c.right.value, '3')
		assert.isString(while_.block[0].c.type, 'COMPARISON')
		assert.deepEqual(while_.block[0].type, 'WHILE')
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
			localStorage.output = '{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "VAR",\n      "value": [\n        {\n          "type": "ID",\n          "value": "a"\n        },\n        {\n          "type": "ID",\n          "value": "b"\n        }\n      ]\n    },\n    {\n      "type": "CALL",\n      "value": {\n        "type": "ID",\n        "value": "a"\n      },\n      "argument": null\n    }\n  ]\n}';
			assert.deepEqual(localStorage.output, '{\n  "type": "PROGRAM",\n  "block": [\n    {\n      "type": "VAR",\n      "value": [\n        {\n          "type": "ID",\n          "value": "a"\n        },\n        {\n          "type": "ID",\n          "value": "b"\n        }\n      ]\n    },\n    {\n      "type": "CALL",\n      "value": {\n        "type": "ID",\n        "value": "a"\n      },\n      "argument": null\n    }\n  ]\n}');
		}
	});
});