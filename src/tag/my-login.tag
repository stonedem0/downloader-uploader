my-login.card.mt-4
	.card-header Miy account
	.card-body.row
		.mx-auto.col-12.col-sm-9.col-md-7.col-lg-5.col-lg-4
			form
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
						button.btn-outline-dark.btn-sm.btn-block(type="submit" class="btn btn-secondary") sign in