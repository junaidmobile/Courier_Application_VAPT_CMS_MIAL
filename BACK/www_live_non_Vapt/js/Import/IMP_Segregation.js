//document.addEventListener("deviceready", GetCommodityList, false);

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var FlightSeqNo;
var SegId;
var UserName = window.localStorage.getItem("UserName");
var _IGMNo;
var _IgmYear;
var _FlightDt;
var _FlightArrDate;
var _DocRecdDate;
var _ULDRecdDate;
var _BrkDownStartDate;
var _BrkDownEndDate;
var _IsShipmentFinalized;
var _ManiFestedPkgs;
var _ManiFestedGrWt;
var _RecdPkgs;
var _RecdGrossWt;
var _ExcessPkgs;
var _ExcessGrWt;
var _ShortHandPkgs;
var _ShortHandGrWt;
var MovetoNextcountHAWB;
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

    if (window.localStorage.getItem("RoleIMPSegregation") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    $('#txtIGMYear').val((new Date()).getFullYear());

});

function GetSegerationReportDetailsCount_HHT() {

    // $('#ddlHAWB').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var MAWBNo = $('#txtAWBNo').val();

    if ($('#txtIGMNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        //$('#txtAWBNo').val('');
        return;
    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetSegerationReportDetailsCount_HHT",
            data: JSON.stringify({
                'pi_strMode': '',
                'pi_strIGMNo': $('#txtIGMNo').val(),
                'pi_strHAWBMpsNo': '',
                'pi_strUserName': UserName,
                'pi_strSession': deviceUUID

            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                //debugger;
                $("body").mLoading('hide');
                response = response.d;
                clearBeforePopulate();
                if (response == "") {
                    //$.alert('Please enter valid IGM No.');
                    $('#spnValMsg').text('Please enter valid IGM No.').css('color', 'red');
                    $("#btnRevoke").attr('disabled', 'disabled');
                    $("#btnSeggrigation").attr('disabled', 'disabled');
                    $("#btnFinalize").attr('disabled', 'disabled');
                    return;
                } else {
                    //$("#btnRevoke").attr('disabled', 'disabled');
                    //$("#btnSeggrigation").attr('disabled', 'disabled');
                    //$("#btnFinalize").attr('disabled', 'disabled');
                    $('#spnValMsg').text('');
                }
                var xmlDoc = $.parseXML(response);

                var countHAWB = $(xmlDoc).find("Table").length;
                MovetoNextcountHAWB = $(xmlDoc).find("Table").length;

                if (countHAWB > Number(0)) {

                    $(xmlDoc).find('Table').each(function () {


                        _IGMNo = $(this).find('IGMNo').text();
                        _IgmYear = $(this).find('IgmYear').text();
                        _FlightDt = $(this).find('FlightDt').text();
                        _FlightArrDate = $(this).find('FlightArrDate').text();
                        _DocRecdDate = $(this).find('DocRecdDate').text();
                        _ULDRecdDate = $(this).find('ULDRecdDate').text();
                        _BrkDownStartDate = $(this).find('BrkDownStartDate').text();
                        _BrkDownEndDate = $(this).find('BrkDownEndDate').text();
                        _IsShipmentFinalized = $(this).find('IsShipmentFinalized').text();
                        _ManiFestedPkgs = $(this).find('ManiFestedPkgs').text();
                        _ManiFestedGrWt = $(this).find('ManiFestedGrWt').text();
                        _RecdPkgs = $(this).find('RecdPkgs').text();
                        _RecdGrossWt = $(this).find('RecdGrossWt').text();
                        _ExcessPkgs = $(this).find('ExcessPkgs').text();
                        _ExcessGrWt = $(this).find('ExcessGrWt').text();
                        _ShortHandPkgs = $(this).find('ShortHandPkgs').text();
                        _ShortHandGrWt = $(this).find('ShortHandGrWt').text();


                        $('#IGMNo').text($(this).find('IGMNo').text());
                        $('#IgmYear').text($(this).find('IgmYear').text());
                        $('#FlightDt').val($(this).find('FlightDt').text());


                        a_MM = _FlightArrDate.split("-")[0];
                        a_DD = _FlightArrDate.split("-")[1];
                        a_YY = _FlightArrDate.split("-")[2];
                        a_Y1 = a_YY.split(" ")[0];
                        a_Y2 = a_YY.split(" ")[1];
                        var FlightArrDate_ = a_Y1 + '-' + a_DD + '-' + a_MM + 'T' + a_Y2;


                        $('#FlightArrDate').val(FlightArrDate_);


                        b_MM = _ULDRecdDate.split("-")[0];
                        b_DD = _ULDRecdDate.split("-")[1];
                        b_YY = _ULDRecdDate.split("-")[2];
                        b_Y1 = b_YY.split(" ")[0];
                        b_Y2 = b_YY.split(" ")[1];
                        var ULDRecdDate_ = b_Y1 + '-' + b_DD + '-' + b_MM + 'T' + b_Y2;
                        $('#ULDRecdDate').val(ULDRecdDate_);


                        c_MM = _BrkDownStartDate.split("-")[0];
                        c_DD = _BrkDownStartDate.split("-")[1];
                        c_YY = _BrkDownStartDate.split("-")[2];
                        c_Y1 = c_YY.split(" ")[0];
                        c_Y2 = c_YY.split(" ")[1];
                        var BrkDownStartDate_ = c_Y1 + '-' + c_DD + '-' + c_MM + 'T' + c_Y2;

                        $('#BrkDownStartDate').val(BrkDownStartDate_);

                        d_MM = _BrkDownEndDate.split("-")[0];
                        d_DD = _BrkDownEndDate.split("-")[1];
                        d_YY = _BrkDownEndDate.split("-")[2];
                        d_Y1 = d_YY.split(" ")[0];
                        d_Y2 = d_YY.split(" ")[1];
                        var BrkDownEndDate_ = d_Y1 + '-' + d_DD + '-' + d_MM + 'T' + d_Y2;

                        $('#BrkDownEndDate').val(BrkDownEndDate_);

                        e_MM = _DocRecdDate.split("-")[0];
                        e_DD = _DocRecdDate.split("-")[1];
                        e_YY = _DocRecdDate.split("-")[2];
                        e_Y1 = e_YY.split(" ")[0];
                        e_Y2 = e_YY.split(" ")[1];
                        var DocRecdDate_ = e_Y1 + '-' + e_DD + '-' + e_MM + 'T' + e_Y2;

                        $('#DocRecdDate').val(DocRecdDate_);


                        $('#IsShipmentFinalized').text($(this).find('IsShipmentFinalized').text());
                        $('#ManiFestedPkgs').text($(this).find('ManiFestedPkgs').text());
                        $('#ManiFestedGrWt').text($(this).find('ManiFestedGrWt').text());
                        $('#RecdPkgs').text($(this).find('RecdPkgs').text());
                        $('#RecdGrossWt').text($(this).find('RecdGrossWt').text());
                        $('#ExcessPkgs').text($(this).find('ExcessPkgs').text());
                        $('#ExcessGrWt').text($(this).find('ExcessGrWt').text());
                        $('#ShortHandPkgs').text($(this).find('ShortHandPkgs').text());
                        $('#ShortHandGrWt').text($(this).find('ShortHandGrWt').text());



                        if (_IsShipmentFinalized == "false") {
                            $("#btnRevoke").attr('disabled', 'disabled');
                        } else if (_IsShipmentFinalized == "true") {
                            $("#btnRevoke").removeAttr('disabled');
                        }

                        if (_IsShipmentFinalized == "false") {
                            $("#btnSeggrigation").removeAttr('disabled');
                        } else if (_IsShipmentFinalized == "true") {
                            $("#btnSeggrigation").attr('disabled', 'disabled');

                        }

                        if (_IsShipmentFinalized == "false") {
                            $("#btnFinalize").removeAttr('disabled');
                        } else if (_IsShipmentFinalized == "true") {
                            $("#btnFinalize").attr('disabled', 'disabled');

                        }


                    });
                }


            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
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


function gotoSegrigationSave() {
    if ($('#txtIGMNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter IGM No.").css('color', 'red');
        $('#txtAWBNo').val('');
        return;
    } else {
        $('#spnValMsg').text("");
    }
    localStorage.setItem('IGMNo', $('#txtIGMNo').val());
    window.location.href = 'IMP_Segregation_Save.html';
}

function FinalizeSagregationReport_HHT() {

    if ($('#txtIGMNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        //$('#txtAWBNo').val('');
        $('#spnValMsg').text("Please enter IGM No.").css('color', 'red');
        return;
    } else {
        $('#spnValMsg').text("");
    }

    a_MM = _FlightArrDate.split("-")[0];
    a_DD = _FlightArrDate.split("-")[1];
    a_YY = _FlightArrDate.split("-")[2];
    a_Y1 = a_YY.split(" ")[0];
    a_Y2 = a_YY.split(" ")[1];
    var FlightArrDate_ = $('#FlightArrDate').val();// a_Y1 + '-' + a_DD + '-' + a_MM;



    b_MM = _ULDRecdDate.split("-")[0];
    b_DD = _ULDRecdDate.split("-")[1];
    b_YY = _ULDRecdDate.split("-")[2];
    b_Y1 = b_YY.split(" ")[0];
    b_Y2 = b_YY.split(" ")[1];
    var ULDRecdDate_ = $('#ULDRecdDate').val();// b_Y1 + '-' + b_DD + '-' + b_MM;


    c_MM = _BrkDownStartDate.split("-")[0];
    c_DD = _BrkDownStartDate.split("-")[1];
    c_YY = _BrkDownStartDate.split("-")[2];
    c_Y1 = c_YY.split(" ")[0];
    c_Y2 = c_YY.split(" ")[1];
    var BrkDownStartDate_ = $('#DocRecdDate').val();// c_Y1 + '-' + c_DD + '-' + c_MM;


    d_MM = _BrkDownEndDate.split("-")[0];
    d_DD = _BrkDownEndDate.split("-")[1];
    d_YY = _BrkDownEndDate.split("-")[2];
    d_Y1 = d_YY.split(" ")[0];
    d_Y2 = d_YY.split(" ")[1];
    var BrkDownEndDate_ = $('#BrkDownEndDate').val();// d_Y1 + '-' + d_DD + '-' + d_MM;



    e_MM = _DocRecdDate.split("-")[0];
    e_DD = _DocRecdDate.split("-")[1];
    e_YY = _DocRecdDate.split("-")[2];
    e_Y1 = e_YY.split(" ")[0];
    e_Y2 = e_YY.split(" ")[1];
    var DocRecdDate_ = $('#BrkDownStartDate').val();// e_Y1 + '-' + e_DD + '-' + e_MM;

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "FinalizeSagregationReport_HHT",
            data: JSON.stringify({

                'pi_strIGMNo': _IGMNo,
                'pi_intIGMYear': _IgmYear,
                'pi_strUserId': UserName,
                'po_strEMessage': '',
                'dtFlightArriDate': FlightArrDate_,
                'dtDocumentDate': DocRecdDate_,
                'dtULDDate': ULDRecdDate_,
                'dtFlightStartDate': BrkDownStartDate_,
                'dtFlightEndDate': BrkDownEndDate_,
                'pi_strUserName': UserName,
                'pi_strSession': deviceUUID


            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            beforeSend: function doStuff() {
                $('body').mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
              
         
                $("body").mLoading('hide');
                response = response.d;

                var xmlDoc = $.parseXML(response);
                //  <Root><Output>Success</Output></Root>
                $(xmlDoc).find('Root').each(function (index) {

                    var outMsg = $(this).find('Output').text();
                    //$.alert(outMsg);
                    if (outMsg == 'Success') {
                        $.alert('Flight finalized successfully.');
                        // $('#spnValMsg').text('Flight finalized successfully.').css('color', 'green');
                        GetSegerationReportDetailsCount_HHT();
                        return;
                    } else {
                        $('#spnValMsg').text($(this).find('Output').text()).css('color', 'red');
                        return;
                    }



                    //if (outMsg == 'E') {
                    //    $.alert(Output);
                    //    return;
                    //}
                });
                // GetSegerationReportDetailsCount_HHT();


            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    }
}

function RevokeSagregation_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var IGMNo = $('#txtIGMNo').val();

    if ($('#txtIGMNo').val() == "") {
        errmsg = "Please enter IGM No.";
        $.alert(errmsg);
        $('#txtAWBNo').val('');
        return;
    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "RevokeSagregation_HHT",
            data: JSON.stringify({
                'pi_intIGMNo': _IGMNo,
                'pi_intIGMYear': _IgmYear,
                'pi_strUserId': UserName,
                'pi_strRemarks': '',
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
                response = response.d;
                // var xmlDoc = $.parseXML(response);
                if (response == true) {
                    //  $.alert('Success');
                    $.alert('Flight revoke successfully.');
                    //  $('#spnValMsg').text('Flight revoke successfully.').css('color', 'green');
                } else {
                    // $.alert('Fail');
                    $('#spnValMsg').text('Flight revoke Fail.').css('color', 'red');
                }

                GetSegerationReportDetailsCount_HHT();
                //$(xmlDoc).find('Root').each(function (index) {

                //    var outMsg = $(this).find('Output').text();
                //    if (outMsg == "true") {
                //        $.alert('Success');
                //    } else {
                //        $.alert('Fail');
                //    }

                //    //return;
                //    //if (outMsg == 'E') {
                //    //    $.alert(Output);
                //    //    return;
                //    //}
                //});
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}

function clearBeforePopulate() {

    //$('#txtAWBNo').val('');
    $('#FlightArrDate').val('');
    $('#ULDRecdDate').val('');
    $('#DocRecdDate').val('');
    $('#BrkDownStartDate').val('');
    $('#BrkDownEndDate').val('');

    $('#ManiFestedPkgs').text('');
    $('#ManiFestedGrWt').text('');
    $('#RecdPkgs').text('');
    $('#RecdGrossWt').text('');
    $('#ShortHandPkgs').text('');
    $('#ShortHandGrWt').text('');
    $('#ExcessPkgs').text('');
    $('#ExcessGrWt').text('');

}

function clearALL() {

    $('#txtIGMNo').val('');
    $('#txtAWBNo').val('');
    $('#ddlHAWB').empty();
    $('#txtFlightNo').val('');
    $('#txtFlightDt').val('');
    $('#txttotConsignmt').val('');
    $('#txttotManifstpkg').val('');
    $('#txttotArrivedPkg').val('');
    $('#txttotShortpkg').val('');
    $('#txttotExcessPkg').val('');
    $('#txttotTPConsignmt').val('');
    $('#txttotDamagedPkg').val('');
    $('#txtSegregationSts').val('');
}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function alertDismissed() {
}


