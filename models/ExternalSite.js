const conn = require('../db/dbconn.js');

exports.nameExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDEXTERNALSITE IS NOT NULL' : 'IDEXTERNALSITE != ' + req.data["idExternalSite"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM EXTERNALSITE WHERE NAME = '${req.data["name"]}' AND ${filter}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		if(result[0]['EXISTS'] > 0)
			return res.status(409).json({statusCode: 409, message:`The NAME '${req.data["name"]}' already exists in database`});

		next();
	});
};

exports.findOne = function(req, res) {
	var id = req.params.idExternalSite;	
	var query = `SELECT * FROM EXTERNALSITE WHERE IDEXTERNALSITE = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT 
			IDEXTERNALSITE,
			IDUSER,
			NAME,
			WEBADDRESS,
			USERNAME,
			PASSWORD
		FROM EXTERNALSITE
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
		INSERT INTO EXTERNALSITE(
			IDUSER,
			NAME,
			WEBADDRESS,
			USERNAME,
			PASSWORD
		) VALUES(
			${data.idUser},
			${data.name},
			${data.webAddress},
			${data.username},
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
		UPDATE CUSTOMER SET
			IDUSER = ${data.idUser},
			NAME = ${data.name},
			USERNAME = ${data.userName},
			WEBADDRESS = ${data.webAddress},
			PASSWORD = ${data.password}
		WHERE IDEXTERNALSITE =${idExternalSite}>;
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idCustomer;
	var query = `DELETE FROM CUSTOMER WHERE IDCUSTOMER = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
