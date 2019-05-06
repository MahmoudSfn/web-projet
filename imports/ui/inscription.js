import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { check } from 'meteor/check'; 

import './inscription.html';

Template.inscription.events({
	'submit #form_signup': function (event) {
		//On bloque l'action "standard" du submit
			event.preventDefault();
		// Initialisation des variables
			var target = event.target
			var firstname = target.firstname.value;
			var lastname = target.lastname.value;
			var sexe = target.sexe.value;
			var birthday = target.birthday.value;
			var username = target.username.value;
			var email = target.email.value;
			var password = target.password.value;
			var passwordConf = target.passwordConf.value;
			var allIsGood = true;
		// Check des variables
			check(firstname, String);
			check(lastname, String);
			check(sexe, String);
			//check(birthday, Date);
			check(username, String);
			check(email, String);
			check(password, String);
			check(passwordConf, String);
		// Testes sur les variables
			if(firstname.length<3){
				console.log('prenom trop cours');
				allIsGood=false;
			}
			if(['M','F','O'].indexOf(sexe)<0){
				console.log('problème de sexe');
				allIsGood=false;
			}
			if(!isEmailValid(email)){
				console.log('email invalide');
				allIsGood=false;
			}
			if(password == null || password ==''){
				console.log('problème mot de passe');
				allIsGood=false;
			}
			if(password != passwordConf){
				console.log('erreur sur la confirmation de mot de passe');
				allIsGood = false;
			}
		// Création de l'utilisateur
			if(allIsGood){
				Accounts.createUser({
					username: username,
					password: password,
					email: email,
					profile: {
						firstname: firstname,
						lastname: lastname,
						sexe: sexe,
						birthday: birthday
					}
				}, function (error) {
					if (error){
						console.log(error);
					}else{
						Router.go('home');
					}
				});
			}
	}
});

function isEmailValid(email) {
	check(email, String);
	var tmp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(email);
	return tmp;
};