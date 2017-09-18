my-login-form.card.mt-4
	.card-header Miy account
	.card-body.row
		.mx-auto.col-12.col-sm-9.col-md-7.col-lg-5.col-lg-4
			form( onsubmit='{parent.parent.enterToAccount}' )
				.form-group.form-row
					label.col-sm-4.col-12.col-form-label(for="email" class=) Email
					.col-8
						input.form-control(ref="email" type="email" id="email" placeholder="Email")
				.form-group.form-row
					label.col-sm-4.col-12.col-form-label(for="ipassword") Password
					.col-8
						input.form-control(ref="password" type="password" id="password" placeholder="Password")
				.form-group.form-row
					.offset-3.col-8.col-sm-3
						button.btn-outline-dark.btn-sm.btn-block(type="button" class="btn btn-secondary" onclick="{ submit }") Sign in


	script.

		import {auth} from '../service/auth.js'

		console.log( 'auth from login', auth );
		
		submit(){
			auth.login( this.refs.email, this.refs.password );
		}

		auth.on( 'successful', riot.update )

		auth.on( 'error', ( err ) => {
			console.log( 'login error', err );
		} );
