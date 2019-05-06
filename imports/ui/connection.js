import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check'; 

import './connection.html';

Template.connection.events({
    "submit form": function(event, template) {
    	//On bloque l'action "standard" du submit
			event.preventDefault();
		// Initialisation des variables
			var target = event.target
			var identifiant =target.identifiant.value;
			var password = target.password.value;
		// Check des variables
			check(identifiant, String);
			check(password, String);			
		// Création de l'utilisateur
			Meteor.loginWithPassword(
				identifiant,
				password,
				function(error) {
					if (error) {
						console.log(error.reason)
					}
					else{
						Router.go('home')
					}
				}
			);
	}
});