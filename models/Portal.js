const conn = require('../db/dbconn.js');

exports.nameExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDPORTAL IS NOT NULL' : 'IDPORTAL != ' + req.data["idPortal"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM PORTAL WHERE NAME = '${req.data["name"]}' AND ${filter}`;

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
	var id = req.params.idPortal;	
	var query = `
		SELECT 
			IDPORTAL,
			NAME,
			WEBADDRESS,
			MAINCOLOR,
			PHONE,
			EMAIL,
			LOGO
		FROM PORTAL 
		WHERE IDPORTAL = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT
			IDPORTAL,
			NAME,
			WEBADDRESS,
			MAINCOLOR,
			PHONE,
			EMAIL,
			LOGO
		FROM PORTAL
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
		INSERT INTO PORTAL(
			NAME,
			WEBADDRESS,
			MAINCOLOR,
			PHONE,
			EMAIL,
			LOGO
		) VALUES(
			${data.name},
			${data.webAddress},
			${data.mainColor},
			${data.phone},
			${data.email},
			${data.logo}
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
		UPDATE PORTAL SET
			NAME = ${data.name},
			WEBADDRESS = ${data.webAddress},
			MAINCOLOR = ${data.mainColor},
			PHONE = ${data.phone},
			EMAIL = ${data.email},
			LOGO = ${data.logo}
		WHERE IDPORTAL =${data.idProduct};
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idProduct;
	var query = `DELETE FROM PORTAL WHERE IDPORTAL = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
