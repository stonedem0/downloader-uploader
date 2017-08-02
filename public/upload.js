$("#btn_download").on('click', () => {
    window.open('/download')
});
$(document).ready( () => {
    $('#uploadForm').submit( (e) => {
        console.log(e.target);
//
        $(e.target).ajaxSubmit({

            error: (xhr) => {
                status('Error: ' + xhr.status);
            },
            success: (response) => {
                console.log(response);
//
            }
        });
        return false;
    });
});