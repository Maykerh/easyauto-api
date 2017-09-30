const conn = require('../db/dbconn.js');

exports.nameExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDSERVICE IS NOT NULL' : 'IDSERVICE != ' + req.data["idService"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM SERVICE WHERE NAME = '${req.data["name"]}' AND ${filter}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		if(result[0]['EXISTS'] > 0)
			return res.status(409).json({statusCode: 409, message:`The name '${req.data["name"]}' already exists in database`});

		next();
	});
};

exports.findOne = function(req, res) {
	var id = req.params.idService;	
	var query = `SELECT * FROM SERVICE WHERE IDSERVICE = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT 
			IDSERVICE,
			NAME,
			DESCRIPTION,
			VALUE 
		FROM SERVICE
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
		INSERT INTO SERVICE(
			NAME,
			DESCRIPTION,
			VALUE
		) VALUES(
			${data.name},
			${data.description},
			${data.value}
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
		UPDATE SERVICE SET
			NAME = ${data.name},
			DESCRIPTION = ${data.description},
			VALUE = ${data.value},
		WHERE IDSERVICE =${data.idService};
	`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.idService;
	var query = `DELETE FROM SERVICE WHERE IDSERVICE = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
