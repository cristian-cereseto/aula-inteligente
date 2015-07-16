/**
 * Created by cristian on 19/06/15.
 */
/* Archivo con la logica para controlar los sensores del salon */

$(document).ready(function () {
    var URL_ROOT = 'http://localhost:1337/serial/digital/';
    var PIN_LUZ_1 = '3/';
    var PIN_LUZ_2 = '5/';
    var PIN_CAL = '6/';
    var PIN_AA = '9/';
    var WRITE = 'write';
    var READ = 'read';

    var control_luz_1 = $('#switchLuz1');
    var control_luz_2 = $('#switchLuz2');
    var control_cal = $('#switchCal');
    var control_aa = $('#switchAA');

    var toggleControl = function (urlRoot, pin, control, action) {
        var isChecked = control.is(':checked');
        var estado = (isChecked) ? '1' : '0';
        var url = (action === WRITE) ? urlRoot + pin + estado: urlRoot + pin;

        $.ajax({
            url: url,
            method: 'GET'
        }).done(function (control, response) {
            console.log(response);
            if (action === WRITE) {
                $(control).attr('checked', !isChecked);
            } else {
                console.log(response);
                $(control).attr('checked', response.return_value === 1);
            }
        }).error(function (response) {
            console.log(response);
        });
    };

    toggleControl(URL_ROOT, PIN_LUZ_1, control_luz_1, READ);
    toggleControl(URL_ROOT, PIN_LUZ_2, control_luz_2, READ);
    toggleControl(URL_ROOT, PIN_CAL, control_cal, READ);
    toggleControl(URL_ROOT, PIN_AA, control_aa, READ);

    control_luz_1.click(toggleControl.bind(this, URL_ROOT, PIN_LUZ_1, control_luz_1, WRITE));
    control_luz_2.click(toggleControl.bind(this, URL_ROOT, PIN_LUZ_2, control_luz_2, WRITE));
    control_cal.click(toggleControl.bind(this, URL_ROOT, PIN_CAL, control_cal, WRITE));
    control_aa.click(toggleControl.bind(this, URL_ROOT, PIN_AA, control_aa, WRITE));
});
