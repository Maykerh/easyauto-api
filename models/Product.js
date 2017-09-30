const conn = require('../db/dbconn.js');

exports.nameExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDPRODUCT IS NOT NULL' : 'IDPRODUCT != ' + req.data["idProduct"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM PRODUCT WHERE NAME = '${req.data["name"]}' AND ${filter}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		if (result[0]['EXISTS'] > 0) {
			return res.status(409).json({
				statusCode: 409, 
				message: `The name '${req.data["name"]}' already exists in database`
			});
		}

		next();
	});
};

exports.findOne = function(req, res) {
	var id = req.params.idProduct;	
	var query = `
		SELECT 
			IDPRODUCT,
			NAME,
			MAKER,
			CATEGORY,
			DESCRIPTION,
			BUYVALUE,
			SELLVALUE,
			QUANTITY
		FROM PRODUCT 
		WHERE IDPRODUCT = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT
			IDPRODUCT,
			NAME,
			MAKER,
			CATEGORY,
			DESCRIPTION,
			BUYVALUE,
			SELLVALUE,
			QUANTITY
		FROM PRODUCT
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.insert = function(req, res) {
	var data = req.data;

	var query = `
		INSERT INTO PRODUCT(
			NAME,
			MAKER,
			CATEGORY,
			DESCRIPTION,
			BUYVALUE,
			SELLVALUE,
			QUANTITY
		) VALUES(
			${data.name},
			${data.maker},
			${data.category},
			${data.description},
			${data.buyValue},
			${data.sellValue},
			${data.quantity}
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
		UPDATE PRODUCT SET
			NAME = ${data.name},
			MAKER = ${data.maker},
			CATEGORY = ${data.category},
			DESCRIPTION = ${data.description},
			BUYVALUE = ${data.buyValue},
			SELLVALUE = ${data.sellValue},
			QUANTITY = ${data.quantity}
		WHERE IDPRODUCT =${data.idProduct};
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idProduct;
	var query = `DELETE FROM PRODUCT WHERE IDPRODUCT = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
