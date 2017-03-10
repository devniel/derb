import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

import AuthService from '../services/AuthService';
import AuthActions from '../actions/AuthActions';

import cookie from 'react-cookie';

export default {

    start : () => {

        setTimeout(function(){

            AppDispatcher.dispatch({
                actionType: AppConstants.READY
            });

        }, 5000);


        /*

        var token = cookie.load('Auth-Token');
        
        if(!token) {
            
            return AppDispatcher.dispatch({
				actionType: AppConstants.READY
			});

        }else{

            AuthActions.loadUserFromToken(token, function(err){
                
                if(err){
                    return AppDispatcher.dispatch({
                        actionType: AppConstants.ERROR
                    });
                }

                AppDispatcher.dispatch({
                    actionType: AppConstants.READY
                });

            });

        }

        */

    }

}