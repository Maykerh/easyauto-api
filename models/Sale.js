const conn = require('../db/dbconn.js');

exports.findOne = function(req, res) {
	var id = req.params.idSale;	
	var query = `
		SELECT 
			IDSALE,
			TOTALVALUE,
			PAYMENTDATE,
			DUEDATE,
			PAYMENTCODE
		FROM SALE 
		WHERE IDSALE = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT
			IDSALE,
			TOTALVALUE,
			PAYMENTDATE,
			DUEDATE,
			PAYMENTCODE
		FROM SALE
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
		INSERT INTO SALE(
			TOTALVALUE,
			PAYMENTDATE,
			DUEDATE,
			PAYMENTCODE
		) VALUES(
			${data.totalValues},
			${data.paymentDate},
			${data.dueDate},
			${data.paymentCode}
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
		UPDATE SALE SET
			TOTALVALUE = ${data.totalValues},
			PAYMENTDATE = ${data.paymentDate},
			DUEDATE = ${data.dueDate},
			PAYMENTCODE = ${data.paymentCode}
		WHERE IDSALE =${data.idSale};
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idSale;
	var query = `DELETE FROM SALE WHERE IDSALE = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
