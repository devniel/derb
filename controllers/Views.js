/**
 * Controlador para presentación
 * de vistas.
 *
 * @author devnieL
 */

var env = require("./../config/env")[process.env.NODE_ENV || 'development'];

exports.handleError = function(res, err){

	console.error("Error".red, err);
	if(err.response) console.error("Error".red, err.response.text)

	return res.status(500).render("pages/errors/500.html", {
        error: err.stack
    });

};

exports.render = function(req, res){
    res.render("index");
};

exports.index = function(req, res){

	res.render("pages/index", {
		user : req.session.user
	});
};
