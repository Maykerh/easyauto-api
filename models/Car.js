const conn = require('../db/dbconn.js');

exports.plateExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDCAR IS NOT NULL' : 'IDCAR != ' + req.data["id"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM CAR WHERE PLATE = '${req.data["license_plate"]}' AND ${filter}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		if(result[0]['EXISTS'] > 0)
			return res.status(409).json({statusCode: 409, message:`The plate '${req.data["license_plate"]}' already exists in database`});

		next();
	});
};

exports.findOne = function(req, res) {
	var id = req.params.id;	
	var query = `SELECT * FROM CAR WHERE IDCAR = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT 
			MODEL, 
			MAKER, 
			DOORS, 
			KM, 
			NMCOLOR, 
			PLATE, 
			MAKEYEAR, 
			BUYVALUE, 
			SELLVALUE, 
			OPTIONALS 
		FROM CAR`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.insert = function(req, res) {
	var data = req.data;

	var query = `
		INSERT INTO CAR (
			MODEL, 
			MAKER, 
			DOORS, 
			KM,
			NMCOLOR, 
			PLATE,
			MAKEYEAR,
			BUYVALUE,
			OPTIONALS
		) VALUES (
			'${data.model}', 
			 ${data.maker}, 
			 ${data.km}, 
			'${data.nmcolor}',
			 ${data.plate},
			 ${data.makeyear},
			 ${data.buyvalue},
			 ${data.optionals}
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
			MODEL = '${data["model"]}', 
			MAKER = ${data['maker']}, 
			DOORS = ${data['doors']}, 
			KM = '${data["km"]}',
			NMCOLOR = '${data["nmcolor"]}',
			PLATE = '${data["plate"]}',
			MAKEYEAR = '${data["makeYear"]}',
			BUYVALUE = '${data["buyValue"]}',
			OPTIONALS = '${data["optionals"]}'
		WHERE IDCAR = ${data['id']}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};

exports.delete = function(req, res) {
	var id = req.params.id;
	var query = `DELETE FROM CAR WHERE IDCAR = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		return res.json(result);
	});
};
