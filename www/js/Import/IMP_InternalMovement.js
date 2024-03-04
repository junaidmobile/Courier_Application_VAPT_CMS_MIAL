
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
var LocId;
var MPSId = '0';
var ifMPSId;
var hid;

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

    if (window.localStorage.getItem("RoleIMPIntlMvmt") == '0') {
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

        strType = "IB";
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
                    // if (index == 0) {

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

                    //  }
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


function clearBeforePopulate() {

    // $('#txtHAWBNo').val('');
    $('#divAddTestLocation').empty()
    $('#ddlIGMNo').empty();
    $('#ddlMAWBNo').empty();

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlIGMNo');



    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlMAWBNo');

    $('#txtFromLoc').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
    $('#txtPkgType').val('');

    $('#spnErrorMsg').text('');


}



function onChangeMasterDDL(HAWBID) {

    if ($('#chkHWABNo').prop('checked')) {
        fnHouseRadioButtonSelected(HAWBID);
        return;

    }

    if ($('#chkMPSNo').prop('checked')) {

        fnMPSPkgsButtonSelected(HAWBID)
        return;

    }

}

function fnHouseRadioButtonSelected(HAWBID) {
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

        strType = "IB";
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


                if (response != null && response != "") {
                    $('#divAddTestLocation').hide();
                    $('#tblNewsForGatePass').empty();
                    html = '';
                    html += '<table id="tblNewsForGatePass" class="table table-striped table-bordered">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Location</th>';
                    html += '<th style="background-color:rgb(208, 225, 244);">Pieces</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    //var xmlDoc = $.parseXML(response);
                    // var flag = '0';
                    $(xmlDoc).find('Table1').each(function (index) {
                        //  flag = '1';
                        MAWBNO = $(this).find('MAWBNO').text();
                        HAWBNO = $(this).find('HAWBNO').text();
                        Shed = $(this).find('Shed').text();
                        Area = $(this).find('Area').text();
                        Location = $(this).find('Location').text();
                        LocationPieces = $(this).find('LocationPieces').text();
                        IGMId = $(this).find('IGMId').text();
                        HAWBPieces = $(this).find('HAWBPieces').text();

                        LocationDeatals(Location, LocationPieces);
                    });
                    html += "</tbody></table>";
                    // if (flag != '0') {
                    $('#divAddTestLocation').show();
                    $('#divAddTestLocation').append(html);
                    //  }


                } else {
                    errmsg = 'VCT No. does not exists.';
                    $.alert(errmsg);
                }

                //$(xmlDoc).find('Table1').each(function (index) {

                //    MAWBNO = $(this).find('MAWBNO').text();
                //    HAWBNO = $(this).find('HAWBNO').text();
                //    Shed = $(this).find('Shed').text();
                //    Area = $(this).find('Area').text();
                //    Location = $(this).find('Location').text();
                //    LocationPieces = $(this).find('LocationPieces').text();
                //    IGMId = $(this).find('IGMId').text();
                //    HAWBPieces = $(this).find('HAWBPieces').text();


                //});


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


function fnMPSPkgsButtonSelected(HAWBID) {
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

        strType = "IB";
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

                        if (index == 0 && $("#ddlIGMNo").val() != "0") {
                            var newOption = $('<option></option>');
                            newOption.val(0).text('Select');
                            newOption.appendTo('#ddlIGMNo');
                        }

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


function LocationDeatals(Location, LocationPieces) {

    html += '<tr onclick="showValInTextBox(\'' + Location + '\',\'' + LocationPieces + '\');">';
    html += '<td style="background: rgb(224, 243, 215);">' + Location + '</td>';
    html += '<td style="background: rgb(224, 243, 215);">' + LocationPieces + '</td>';
    html += '</tr>';
}

function showValInTextBox(Location, LocationPieces) {
    $('#txtFromLoc').val(Location);
    $('#txtTotPkgs').val(LocationPieces);

    $('#txtMovePkgs').removeAttr('disabled', 'disabled');
    $('#txtMovePkgs').focus();

}

function getDataOnChangeofIGMNo(IGMNo) {


    $('#PkgsType').val('');
    $('#txtPkgs').val('');
    $('#txtxLocation').val('');
    $('#txtBinningPkgs').val('');
    $('#spnErrorMsg').val('');

    if (IGMNo == '0') {

        return
    }
    if ($('#chkHWABNo').prop('checked')) {
        strType = "I";
        // MPSNoORHAWBNo = '';
        MPSNoORHAWBNo = $('#txtHAWBNo').val();
        //$('#txtMovePkgs').val('1');
        //$('#txtNewLoc').focus();
    }

    if ($('#chkMPSNo').prop('checked')) {
        strType = "M";
        MPSNoORHAWBNo = $('#txtHAWBNo').val();
        //$('#txtMovePkgs').val('1');
        //$('#txtNewLoc').focus();

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
                'pi_intHAWBId': hid,
                'pi_intIGMNo': IGMNo,
                'pi_strMPSNo': MPSNoORHAWBNo,
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

                    LocId = $(this).find('LocId').text();
                    LocCode = $(this).find('LocCode').text();
                    Pieces = $(this).find('Pieces').text();
                    ShipmentPieces = $(this).find('ShipmentPieces').text();
                    LocPieces = $(this).find('LocPieces').text();
                    LocStatis = $(this).find('LocStatis').text();
                    MPSNo = $(this).find('MPSNo').text();
                    MPSId = $(this).find('MPSId').text();
                    PkgType = $(this).find('PkgType').text();
                    ifMPSId = MPSId;
                    $('#txtFromLoc').val(LocCode);
                    $('#txtTotPkgs').val(LocPieces);
                    $('#txtPkgType').val(PkgType);
                    $('#spnErrorMsg').text('');



                    if ($('#chkHWABNo').prop('checked')) {

                        // $('#txtMovePkgs').val('1');
                        $('#txtMovePkgs').removeAttr('disabled');
                        $('#txtMovePkgs').focus();
                    }

                    if ($('#chkMPSNo').prop('checked')) {

                        $('#txtMovePkgs').val('1');
                        $('#txtMovePkgs').attr('disabled', 'disabled');
                        $('#txtNewLoc').focus();

                    }


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


    if ($('#txtFromLoc').val() == '') {
        $('#spnErrorMsg').text('Please enter from location.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#txtTotPkgs').val() == '') {
        $('#spnErrorMsg').text('Please enter total pkgs.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#txtMovePkgs').val() == '') {
        $('#spnErrorMsg').text('Please enter move pkgs.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#txtNewLoc').val() == '') {
        $('#spnErrorMsg').text('Please enter new location.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }




    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if ($('#chkHWABNo').prop('checked')) {
        MPSNoORHAWBNo = '';
        MPSIdForSave = '0';
    }

    if ($('#chkMPSNo').prop('checked')) {
        MPSNoORHAWBNo = $('#txtHAWBNo').val();
        MPSIdForSave = ifMPSId;
    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",


            url: GHAImportFlightserviceURL + "ImpSaveInternalMovement_HHT",
            data: JSON.stringify({
                'pi_intHAWBId': HId,
                'pi_intIGMno': $('#ddlIGMNo').val(),
                'pi_intOldLocId': LocId,
                'pi_strOldLocation': $('#txtFromLoc').val(),
                'pi_intOldLocPieces': $('#txtTotPkgs').val(),
                'pi_strNewLoc': $('#txtNewLoc').val(),
                'pi_intNewPieces': $('#txtMovePkgs').val(),
                'pi_struserId': UserName,
                'pi_strMPSNo': MPSNoORHAWBNo,
                'pi_intMPSId': MPSIdForSave,
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

                    if (Output == 'Internal movement is not allowed in same Location') {
                        $('#spnErrorMsg').text(Output).css('color', 'red');
                        $('#txtHAWBNo').val('');
                        $('#txtHAWBNo').focus();
                        return;
                    } else if (Output == 'From location pieces cannot be more than 1 piece') {

                        $('#spnErrorMsg').text(Output).css('color', 'red');
                        $('#txtHAWBNo').val('');
                        $('#txtHAWBNo').focus();
                        return;

                    } else {
                        $('#spnErrorMsg').text(Output).css('color', 'green');
                        $('#txtHAWBNo').val('');
                        $('#txtHAWBNo').focus();
                        return;
                        // $('#spnErrorMsg').text('');
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

