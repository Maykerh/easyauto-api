const conn = require('../db/dbconn.js');

exports.userNameExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDUSER IS NOT NULL' : 'IDUSER != ' + req.data["idUser"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM USER WHERE USERNAME = '${req.data["userName"]}' AND ${filter}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		if(result[0]['EXISTS'] > 0)
			return res.status(409).json({statusCode: 409, message:`The username '${req.data["userName"]}' already exists in database`});

		next();
	});
};

exports.findOne = function(req, res) {
	var id = req.params.idUser;	
	var query = `SELECT * FROM USER WHERE IDUSER = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT 
			IDUSER,
			NAME,
			LASTNAME,
			USERNAME,
			PASSWORD,
			USERTYPE,
			REGISTERDATE 
		FROM USER
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
		INSERT INTO USER(
			NAME,
			LASTNAME,
			USERNAME,
			PASSWORD,
			USERTYPE,
			REGISTERDATE
		) VALUES(
			${data.name},
			${data.lastName},
			${data.userName},
			${data.password},
			${data.userType},
			${data.registerDate}
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
		UPDATE USER SET
			NAME = ${name},
			LASTNAME = ${lastName},
			USERNAME = ${userName},
			PASSWORD = ${password},
			USERTYPE = ${userType},
			REGISTERDATE = ${registerDate}
		WHERE IDUSER =${idUser}>;
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idUser;
	var query = `DELETE FROM USER WHERE IDUSER = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
