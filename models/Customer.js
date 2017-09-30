const conn = require('../db/dbconn.js');

exports.CPFExists = function(req, res, next) {
	var filter = req.method == 'POST' ? 'IDCUSTOMER IS NOT NULL' : 'IDCUSTOMER != ' + req.data["idCustomer"];
	var query = `SELECT COUNT(1) AS 'EXISTS' FROM CUSTOMER WHERE CPF = '${req.data["cpf"]}' AND ${filter}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);

		if(result[0]['EXISTS'] > 0)
			return res.status(409).json({statusCode: 409, message:`The cpf '${req.data["cpf"]}' already exists in database`});

		next();
	});
};

exports.findOne = function(req, res) {
	var id = req.params.idCustomer;	
	var query = `SELECT * FROM CUSTOMER WHERE IDCUSTOMER = ${id}`;

	conn.query(query, function(err, result, fields) {
		if (err)
			return res.json(err);
		
		return res.json(result);
	});
};

exports.findAll = function(req, res) {
	var query = `
		SELECT 
			IDCUSTOMERKEY,
			NAME,
			LASTNAME,
			CITY,
			STATE,
			NEIGHBORHOOD,
			STREET,
			NUMBER,			
			CPF,
			PHONE,
			EMAIL
		FROM CUSTOMER
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
		INSERT INTO CUSTOMER(
			NAME,
			LASTNAME,
			CITY,
			STATE,
			NEIGHBORHOOD,
			STREET,
			NUMBER,			
			CPF,
			PHONE,
			EMAIL
		) VALUES(
			${data.name},
			${data.lastName},
			${data.city},
			${data.state},
			${data.neighborhood},
			${data.street},
			${data.number},
			${data.cpf},
			${data.phone},
			${data.email}
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
			NAME = ${data.name},
			LASTNAME = ${data.lastName},
			USERNAME = ${data.userName},
			PASSWORD = ${data.city},
			STATE = ${data.state},
			NEIGHBORHOOD = ${data.neighborhood}
			STREET = ${data.street},
			NUMBER = ${data.number},
			CPF = ${data.cpf},
			PHONE = ${data.phone},
			EMAIL = ${data.email}
		WHERE IDCUSTOMER =${idUser}>;
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
