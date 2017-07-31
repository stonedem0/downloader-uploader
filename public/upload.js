$("#btn_download").on('click',  () => {
    window.open('/download')
});
$('#btn_upload').on('click', () => {
    $('#upload-input').click();
    console.log('ok')
});
$('#upload-input').on('change', ( e ) => {

    let files = e.target.files;

    if (files.length > 0){
        let formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            formData.append('uploads[]', file, file.name);
        }

        $.ajax({
            url: '/upload',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: (data) => {
                console.log('upload successful!\n' + data);
            }
        });

    }
});
