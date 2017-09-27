my-login-form.card.mt-4
	.card-header( if="{!parent.parent.state.login_err}") Miy account
	.card-header.bg-danger.text-center.text-light( if="{parent.parent.state.login_err}") Oops, incorrect data
	.card-body.row
		.mx-auto.col-12.col-sm-9.col-md-7.col-lg-5.col-lg-4
			form
				.form-group.form-row
					label.col-sm-4.col-12.col-form-label(for="email" class=) Email
					.col-8
						input.form-control(ref="email" type="email" id="email" placeholder="Email")
				.form-group.form-row
					label.col-sm-4.col-12.col-form-label(for="password") Password
					.col-8
						input.form-control(ref="password" type="password" id="password" placeholder="Password")
				.form-group.form-row
					.col-6.col-sm-3
						button.btn-outline-dark.btn-sm.btn-block(type="button" class="btn btn-secondary" onclick="{ submit }") Login
					.col-6.col-sm-8.text-center.text-danger
						.error(if="{parent.parent.state.login_err}") Login error. Try again.
	style.
		.error{
			font-size: .8em;
		}

	script.

		import {auth} from '../service/auth.js'

		console.log( parent );

		console.log( 'auth from login', auth );
		
		submit(){
			auth.login( this.refs.email.value, this.refs.password.value );
		}

		auth.on( 'successful', riot.update )

		auth.on( 'login_err', riot.update );
