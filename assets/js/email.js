function validateForm(name, email, subject, message)
{
    name.removeClass('feedback-border-error');
    email.removeClass('feedback-border-error');
    subject.removeClass('feedback-border-error');
    message.removeClass('feedback-border-error');

    $('#invalid-name').removeClass('feedback-span-error');
    $('#invalid-email').removeClass('feedback-span-error');
    $('#invalid-subject').removeClass('feedback-span-error');
    $('#invalid-message').removeClass('feedback-span-error');

    var email_test = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    var validation = 1;

    if (name.val() == '')
    {
        name.addClass('feedback-border-error');
        $('#invalid-name').addClass('feedback-span-error');
        validation = 0;
    }

    if (!email_test.test(email.val()))
    {
        email.addClass('feedback-border-error');
        $('#invalid-email').addClass('feedback-span-error');
        validation = 0;
    }

    if (subject.val() == '')
    {
        subject.addClass('feedback-border-error');
        $('#invalid-subject').addClass('feedback-span-error');
        validation = 0;
    }

    if (message.val() == '')
    {
        message.addClass('feedback-border-error');
        $('#invalid-message').addClass('feedback-span-error');
        validation = 0;
    }

    return validation;
}

function sendEmail(name, email, subject, message)
{
    $.ajax({
        url: 'https://app.maliured.com/api/sendContactEmail',
        type: 'get',
        dataType: 'json',
        data: {'name': name, 'email': email, 'subject': subject, 'message': message},
        success: function(data) {

            var responseStatus = data.status;

            switch (responseStatus)
            {
                case 1:
                    $('.submit-message').addClass('success');
                    $('.submit-message p').html('Vaš upit je uspješno poslan.');
                    break;
                case 0:
                    $('.submit-message').addClass('fail');
                    $('.submit-message p').html('Vaš upit nije poslan! Molimo pokušajte ponovno.');
                    break;
            }
        },
        error: function() {
            $('.submit-message').addClass('fail');
            $('.submit-message p').html('Vaš upit nije poslan! Molimo pokušajte ponovno.');
        }
    });
}

$(document).ready(function() {

    $('.submit-button').on('click', function() {

        $('.submit-message').removeClass('success').removeClass('fail');
        $('.submit-message p').html('');

        var name_input = $('#name');
        var email_input = $('#email');
        var subject_input = $('#subject');
        var message_input = $('#message');

        var validation = validateForm(name_input, email_input, subject_input, message_input);

        if (validation)
        {
            sendEmail(name_input.val(), email_input.val(), subject_input.val(), message_input.val());
        }
    });
});