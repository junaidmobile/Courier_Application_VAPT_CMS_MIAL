
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var UserName = window.localStorage.getItem("UserName");
//var CargoWorksServiceURL = "http://10.22.3.154/Galaxy/services/hhtexpservices.asmx/";

//var AirportCity = "FRA";
//var UserId = "252";
//var CompanyCode = "3";
//var SHEDCODE = "KS1";


var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var CompanyCode = window.localStorage.getItem("companyCode");
var SHEDCODE = window.localStorage.getItem("SHED_CODE");
var UserName = window.localStorage.getItem("UserName");
var currentYear;
var HId;
var MId;
var PkgType;
var MNo;

document.addEventListener("pause", onPause, false);
document.addEventListener("resume", onResume, false);
document.addEventListener("menubutton", onMenuKeyDown, false);

function onPause() {

    HHTLogout();
}

function onResume() {
    HHTLogout();
}

function onMenuKeyDown() {
    HHTLogout();
}

$(function () {



    if (window.localStorage.getItem("RoleIMPBinning") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }
    //if ($('#chkVctNo').prop('checked')) {
    //    $('#frmHAWBNo').show();
    //    $('#frmMPSNo').hide();

    //}
    $('#txtHAWBNo').focus();
    $('#chkHWABNo').click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $('#lblHAWBNO').show();
            $('#lblmpsno').hide();
            $('#txtHAWBNo').focus();
            $('#txtHAWBNo').val('');
            clearBeforePopulate();
        }

    });


    $('#chkMPSNo').click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $('#lblHAWBNO').hide();
            $('#lblmpsno').show();
            $('#txtHAWBNo').focus();
            $('#txtHAWBNo').val('');
            clearBeforePopulate();
        }

    });


    var formattedDate = new Date();
    var d = formattedDate.getDate();
    if (d.toString().length < Number(2))
        d = '0' + d;
    var m = formattedDate.getMonth();
    m += 1;  // JavaScript months are 0-11
    if (m.toString().length < Number(2))
        m = '0' + m;
    var y = formattedDate.getFullYear();
    var date = y.toString() + '-' + m.toString() + '-' + d.toString();

    currentYear = y;



});


//function GetImpShipmentsForLocation_HHT() {
//    if ($('#chkHWABNo').prop('checked')) {

//        getDataByMAWBNo();
//    }

//    if ($('#chkMPSNo').prop('checked')) {

//        getDataByMPSNo();

//    }
//}



function getDetailsByHWABNo() {

    $('#ddlMAWBNo').empty();

    if ($('#txtHAWBNo').val() == '') {
        $('#spnErrorMsg').text('Please enter HAWB No./MPS No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#chkHWABNo').prop('checked')) {

        strType = "C";
        strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {

        strType = "I";
        strMode = "M";

    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImpShipmentsForLocation_HHT",
            data: JSON.stringify({

                "pi_strShipmentType": strType,
                "pi_strParamMode": strMode,
                "pi_strHAWBNo": $('#txtHAWBNo').val(),
                "pi_intHAWBId": '0',
                "pi_intMAWBId": '0',
                'pi_strUserName': UserName,
                'pi_strSession': deviceUUID

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d

                clearBeforePopulate();
                var xmlDoc = $.parseXML(str);
             
                $(xmlDoc).find('Table').each(function (index) {


                    HId = $(this).find('HId').text();
                    MId = $(this).find('MId').text();
                    PkgType = $(this).find('PkgType').text();
                    MNo = $(this).find('MNo').text();

                    if (index == 0 && $("#ddlMAWBNo").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlMAWBNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(HId + ',' + MId).text(MNo);
                    newOption.appendTo('#ddlMAWBNo');
                    $('#btnSave').removeAttr('disabled');

                    $('#spnErrorMsg').text('');
                });


                $(xmlDoc).find('Root').each(function (index) {


                    Output = $(this).find('Output').text();

                    if (Output != '') {
                        $('#spnErrorMsg').text(Output).css('color', 'red');
                        $('#btnSave').attr('disabled', 'disabled');
                        return;
                    } else {
                        $('#btnSave').removeAttr('disabled');
                        $('#spnErrorMsg').text('');
                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}


function clearBeforePopulate() {


    $('#ddlIGMNo').empty();
    $('#ddlMAWBNo').empty();

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlIGMNo');



    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlMAWBNo');

    $('#PkgsType').val('');
    $('#txtPkgs').val('');
    $('#txtxLocation').val('');

    // $('#txtBinningPkgs').val('');
    $('#spnErrorMsg').text('');


}


function clearBeforePopulateOnClearButton() {


    $('#ddlIGMNo').empty();
    $('#ddlMAWBNo').empty();

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlIGMNo');



    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlMAWBNo');

    $('#PkgsType').val('');
    $('#txtPkgs').val('');
    $('#txtxLocation').val('');
    $('#txtHAWBNo').val('');
    $('#txtBinningPkgs').val('');
    $('#txtHAWBNo').focus();
    // $('#txtBinningPkgs').val('');
    $('#spnErrorMsg').text('');


}

function getDataOnChangeOfMAWBNo(HAWBID) {
    hid = HAWBID.split(',')[0];
    mid = HAWBID.split(',')[1];
    $('#ddlIGMNo').empty();
    if (HAWBID == '0') {
        clearBeforePopulate()
        return
    }
    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";



    if ($('#chkHWABNo').prop('checked')) {

        strType = "C";
        strMode = "M";
    }

    if ($('#chkMPSNo').prop('checked')) {

        strType = "I";
        strMode = "M";

    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImpShipmentsForLocation_HHT",
            data: JSON.stringify({
                "pi_strShipmentType": strType,
                "pi_strParamMode": strMode,
                "pi_strHAWBNo": $('#txtHAWBNo').val(),
                "pi_intHAWBId": hid,
                "pi_intMAWBId": mid,
                'pi_strUserName': UserName,
                'pi_strSession': deviceUUID
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d


                var xmlDoc = $.parseXML(str);
           
                $(xmlDoc).find('Table').each(function (index) {
                    if (index == 0) {

                        IGMId = $(this).find('IGMId').text();
                        HAWBPieces = $(this).find('HAWBPieces').text();
                        IGMNo = $(this).find('IGMNo').text();
                        PkgType = $(this).find('PkgType').text();
                        $('#PkgsType').val(PkgType);
                        $('#txtPkgs').val(HAWBPieces);
                        $('#txtxLocation').focus();
                        $('#spnErrorMsg').text('');


                        if ($('#chkHWABNo').prop('checked')) {

                            $('#txtBinningPkgs').val(HAWBPieces);
                            $('#txtBinningPkgs').removeAttr('disabled');
                        }

                        if ($('#chkMPSNo').prop('checked')) {

                            $('#txtBinningPkgs').val('1');
                            $('#txtBinningPkgs').attr('disabled', 'disabled');
                        }


                        //if (index == 0 && $("#ddlIGMNo").val() != "0") {
                        //    var newOption = $('<option></option>');
                        //    newOption.val(0).text('Select');
                        //    newOption.appendTo('#ddlIGMNo');
                        //}

                        var newOption = $('<option></option>');
                        newOption.val(IGMNo).text(IGMNo);
                        newOption.appendTo('#ddlIGMNo');

                    }
                    $('#spnErrorMsg').text('');
                });



                $(xmlDoc).find('Root').each(function (index) {


                    Output = $(this).find('Output').text();

                    if (Output != '') {
                        $('#spnErrorMsg').text(Output).css('color', 'red');
                        return;
                    } else {
                        $('#spnErrorMsg').text('');
                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function getDataOnChangeofIGMNo(IGMNo) {


    $('#PkgsType').val('');
    $('#txtPkgs').val('');
    $('#txtxLocation').val('');
    // $('#txtBinningPkgs').val('');
    $('#spnErrorMsg').val('');

    if (IGMNo == '0') {

        return
    }
    if ($('#chkHWABNo').prop('checked')) {
        strType = "I";
        MPSNoORHAWBNo = '';
    }

    if ($('#chkMPSNo').prop('checked')) {
        strType = "M";
        MPSNoORHAWBNo = $('#txtHAWBNo').val();
    }

    //if ($('#txtHAWBNo').val() == '') {
    //    MPSNoORHAWBNo = '';
    //} else {
    //    MPSNoORHAWBNo = $('#txtHAWBNo').val();
    //}


    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImpShipmentLocationDetails_HHT",
            data: JSON.stringify({
                'pi_strParamCode': strType,
                'pi_intHAWBId': HId,
                'pi_intIGMNo': IGMNo,
                'pi_strMPSNo': MPSNoORHAWBNo,
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d
                var xmlDoc = $.parseXML(str);
              
                $(xmlDoc).find('Table').each(function (index) {

                    LocId = $(this).find('LocId').text();
                    LocCode = $(this).find('LocCode').text();
                    Pieces = $(this).find('Pieces').text();
                    ShipmentPieces = $(this).find('ShipmentPieces').text();
                    LocPieces = $(this).find('LocPieces').text();
                    LocStatis = $(this).find('LocStatis').text();
                    MPSNo = $(this).find('MPSNo').text();
                    MPSId = $(this).find('MPSId').text();
                    PkgType = $(this).find('PkgType').text();

                    //$('#PkgsType').val(PkgType);
                    //$('#txtPkgs').val(LocPieces);
                    //$('#txtxLocation').focus();
                    //$('#spnErrorMsg').text('');
                });

                $(xmlDoc).find('Root').each(function (index) {


                    Output = $(this).find('Output').text();

                    if (Output != '') {
                        $('#spnErrorMsg').text(Output).css('color', 'red');
                        return;
                    } else {
                        $('#spnErrorMsg').text('');
                    }

                });

                // "<Root><Output>Shipment location still pending</Output></Root>"

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}

function ScanLocation() {
    var location = $('#txtxLocation').val();
    $('#txtxLocation').val(location);
}

function saveLocationDetails() {


    if ($('#txtHAWBNo').val() == '') {
        $('#spnErrorMsg').text('Please enter HAWB No./MPS No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#ddlMAWBNo').val() == '0') {
        $('#spnErrorMsg').text('Please select MAWB No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#ddlIGMNo').val() == '0') {
        $('#spnErrorMsg').text('Please select IGM No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }


    if ($('#txtxLocation').val() == '') {
        $('#spnErrorMsg').text('Please enter location.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#txtBinningPkgs').val() == '') {
        $('#spnErrorMsg').text('Please enter binning pkgs.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }




    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if ($('#chkHWABNo').prop('checked')) {
        MPSNoORHAWBNo = '';
    }

    if ($('#chkMPSNo').prop('checked')) {
        MPSNoORHAWBNo = $('#txtHAWBNo').val();
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",


            url: GHAImportFlightserviceURL + "ImpSaveShipmentLocation_HHT",
            data: JSON.stringify({
                'pi_intHAWBId': HId,
                'pi_strLocCode': $('#txtxLocation').val(),
                'pi_intPieces': $('#txtBinningPkgs').val(),
                'pi_strUsername': UserName,
                'pi_intIGMNo': $('#ddlIGMNo').val(),
                'pi_intULDId': '0',
                'pi_strMPSNO': MPSNoORHAWBNo,
                'pi_strUserName': UserName,
                'pi_strSession': deviceUUID 


            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                //$('.dialog-background').css('display', 'block');
                $('body').mLoading({
                    text: "Please Wait..",
                });
            },
            success: function (response) {
                $("body").mLoading('hide');
                var str = response.d

                clearBeforePopulate();
                var xmlDoc = $.parseXML(str);
             
                $(xmlDoc).find('Root').each(function (index) {


                    Output = $(this).find('Output').text();

                    if (Output != '') {
                        $('#spnErrorMsg').text(Output).css('color', 'green');
                        $('#txtHAWBNo').val('');
                        $('#txtHAWBNo').focus();
                        $('#txtBinningPkgs').val('');
                        return;
                    } else {
                        $('#spnErrorMsg').text('');

                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Data could not be loaded');
            }
        });
        return false;
    }
    else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    }
    else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    }
    else {
        $("body").mLoading('hide');
    }
}
