import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';
import AuthConstants from '../constants/AuthConstants';

import async from 'async';
import cookie from 'react-cookie';
import jwt_decode from 'jwt-decode';

import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

export default {

	// LOGIN USER
	
	loginUser: (email, password, callback) => {

		async.waterfall([

			function(cb){

				AuthService.login(email, password, function (error, response) {
						if (error) return cb(error);
						cb(null, response.data);
				});

			},

			function(data, cb){
          
				var token = data.access_token;

				cookie.save("Auth-Token", token, {
					path : '/'
				});

				// Get user data 

				UserService.me(function(err, user){
					if(err) return cb(err);
					cb(null, user);
				});

			}

		], function(error, user){

			if(error){
				cookie.remove("Auth-Token");
				return AppDispatcher.dispatch({
					actionType: AuthConstants.LOGIN_ERROR,
					error : error
				});
			}

			AppDispatcher.dispatch({
				actionType: AuthConstants.LOGIN_USER,
				user : user
			});

		});
		
	},

  // LOGOUT USER

	logoutUser: () => {
		AppDispatcher.dispatch({
			actionType: AuthConstants.LOGOUT_USER
		});
	},

	// LOAD USER FROM TOKEN 

	loadUserFromToken: (token, callback) => {

		async.waterfall([

			function(cb){

				try{
					jwt_decode(token);
					cb();
				}catch(e){
					return cb(e);
				}

			},

			function(cb){
          
				cookie.save("Auth-Token", token, {
					path : '/'
				});

				// Get user data 

				UserService.me(function(err, user){
					if(err) return cb(err);
					cb(null, user);
				});

			}

		], function(error, user){

			if(error){
				if(callback) callback(error);
				return AppDispatcher.dispatch({
					actionType: AuthConstants.LOGIN_ERROR,
					error : error
				});
			}

			AppDispatcher.dispatch({
				actionType: AuthConstants.LOGIN_USER,
				user : user
			});
			
			if(callback) callback();

		});
		
	}

}