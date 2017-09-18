my-upload.card.mt-4
	.card-body
		h5.card-title Upload file
		//- Drop Zone
		div.p-3.text-center(style="border: 2px dashed #BDBDBD;")
			.text-center
				input(id="file" type="file" name="file" multiple).input-file.form-control-file
				label( for="file") Choose file
			p(style="color: #BDBDBD;") or drop file here
		h5.card-title.pt-3 Progress
		.progress
			.progress-bar.bg-warning(role="progressbar" style="width: 35%" aria-valuenow="35" aria-valuemin="0" aria-valuemax="100")

	style(type="text/css").
		.input-file{
			display: none;
			width: 0.1px;
			height: 0.1px;
		}
		.input-file + label{
			font-size: 1.25em;
			font-weight: 700;
			color: white;
			padding:5px;
			background-color: black;
			display: inline-block;
			cursor: pointer;
		}
		.input-file:focus + label,
		.input-file + label:hover {
			background-color: #F50057;
		}