const conn = require('../db/dbconn.js');

exports.accountExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDBANKACCOUNT IS NOT NULL' : 'IDBANKACCOUNT != ' + req.data["idBankAccount"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM BANKACCOUNT WHERE ACCOUNTNUMBER = '${req.data["accountNumber"]}' AND ${filter}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		if (result[0]['EXISTS'] > 0) {
			return res.status(409).json({
				statusCode: 409, 
				message: `The account number '${req.data["accountNumber"]}' already exists in database`
			});
		}

		next();
	});
};

exports.findOne = function(req, res) {
	var id = req.params.idBankAccount;	
	var query = `SELECT * FROM BANKACCOUNT WHERE IDBANKACCOUNT = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT
			IDBANKACCOUNT,
			OWNERNAME,
			ACCOUNTNUMBER,
			AGENCY,
			BANKNAME,
			USERNAME,
			PASSWORD 
		FROM BANKACCOUNT
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
		INSERT INTO BANKACCOUNT(
			OWNERNAME,
			ACCOUNTNUMBER,
			AGENCY,
			BANKNAME,
			USERNAME,
			PASSWORD
		) VALUES(
			${data.ownerName},
			${data.accountNumber},
			${data.agency},
			${data.bankName},
			${data.userName},
			${data.password}
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
		UPDATE BANKACCOUNT SET
			OWNERNAME = ${data.name},
			ACCOUNTNUMBER = ${data.description},
			AGENCY = ${data.value},
			BANKNAME = ${data.bankName},
			USERNAME = ${data.userName},
			PASSWORD = ${data.password}
		WHERE IDBANKACCOUNT =${data.idBankAccount};
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idBankAccount;
	var query = `DELETE FROM BANKACCOUNT WHERE IDBANKACCOUNT = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
