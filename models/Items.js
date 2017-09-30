const conn = require('../db/dbconn.js');

exports.findOne = function(req, res) {
	var id = req.params.id;	
	var query = `SELECT * FROM ITEMS WHERE IDOPERATION = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT 
			IDOPERATION, 
			OPERATIONTYPE, 
			IDITEM, 
			ITEMTYPE
		FROM ITEMS`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.insert = function(req, res) {
	var data = req.data;

	var query = `
		INSERT INTO ITEMS (
			IDOPERATION, 
			OPERATIONTYPE, 
			IDITEM, 
			ITEMTYPE
		) VALUES (
			${data.idOperation}, 
			${data.operationType}, 
			${data.idItem}, 
			${data.itemType}
		)
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.update = function(req, res) {
	var data = req.data;
	var columns = req.columns;
	var query = `
		UPDATE CAR SET 
			IDOPERATION = ${data.idOperation}, 
			OPERATIONTYPE = ${data.operationType}, 
			IDITEM = ${data.idItem}, 
			ITEMTYPE = '${data.itemType}',
		WHERE IDOPERATION = ${data.idOperation}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idOperation;
	var query = `DELETE FROM ITEMS WHERE IDOPERATION = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
