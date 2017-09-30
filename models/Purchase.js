const conn = require('../db/dbconn.js');

exports.findOne = function(req, res) {
	var id = req.params.idPurchase;	
	var query = `
		SELECT 
			IDPURCHASE,
			PROVIDERNAME,
			TOTALVALUE,
			PROVIDERPHONE,
			PAYMENTDATE
		FROM PURCHASE 
		WHERE IDPURCHASE = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT
			IDPURCHASE,
			PROVIDERNAME,
			TOTALVALUE,
			PROVIDERPHONE,
			PAYMENTDATE
		FROM PURCHASE
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
		INSERT INTO PURCHASE(
			PROVIDERNAME,
			TOTALVALUE,
			PROVIDERPHONE,
			PAYMENTDATE
		) VALUES(
			${data.providerName},
			${data.totalValue},
			${data.providerPhone},
			${data.paymentDate}
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
		UPDATE PURCHASE SET
			PROVIDERNAME = ${data.providerName},
			TOTALVALUE = ${data.totalValue},
			PROVIDERPHONE = ${data.providerPhone},
			PAYMENTDATE = ${data.paymentDate}
		WHERE IDPURCHASE =${data.idPurchase};
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idPurchase;
	var query = `DELETE FROM PURCHASE WHERE IDPURCHASE = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
