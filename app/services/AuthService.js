// AuthService.js
import request from 'superagent';
import AppConstants from '../constants/AppConstants';

class AuthService {

	login(email, password, callback) {

		return request.
		post(AppConstants.API_URL + '/auth/login').
		send({
			email : email,
			password : password
		}).
		set('Accept', 'application/json').
		end(function(error, response){

			if(error) {
				if(error.status == undefined || error.status >= 500)
					return callback(new Error('Unexpected error, please report it...'));
				if(response) return callback(response.body || response.error);
				return callback(new Error(error));
			}

			return callback(null, response.body);
		});
	}

	signup(user, callback){

		return request.
		post(AppConstants.API_URL + '/auth/register/').
		send({
			user : user
		}).
		set('Accept', 'application/json').
		end(function(error, res){

			if(error) {
				if(error.status >= 500)
					return callback(new Error('Unexpected error, please report it...'));
				if(res) return callback(res.body || res.error);
				return callback(new Error(error));
			}

			return callback(null, res.body);
		});
	}

}

module.exports = new AuthService();
