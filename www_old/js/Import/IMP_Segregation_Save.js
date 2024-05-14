//document.addEventListener("deviceready", GetCommodityList, false);

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var FlightSeqNo;
var SegId;
var UserName = window.localStorage.getItem("UserName");
var deviceUUID = window.localStorage.getItem("deviceUUID");
var _IGMNo;
var _HawbId;
var _HawbMpsNo;
var _ManiPkgs;
var _ManiGrossWt;
var _RecdPkgs;
var _RecdGrossWt;
var _RecdChargableWt;
var _TotalChgWt;
var _IsShipmentFinalized;
var _FlightArriDate;
var _DocDate;
var _ULDDate;
var _FlightStartDate;
var _FlightEndDate;
var _IgmYear;
var _Status;
var _PackagingType;
var _Location;
var _DamageRemarks;
var IGMNo = localStorage.getItem('IGMNo');
var printedData;
var formatedDataofPRN;
var _calCharWt;
var Barcode_PRN_Values;
$(function () {

    if (window.localStorage.getItem("RoleIMPSegregation") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }

    $('#txtIGMNo').val(IGMNo);

    GetBarcodeSettings_HHT();

});


function onchangeRDB() {
    if ($('#chkHWABNo').prop('checked')) {

        $('#lblIHAWBNo').show();
        $('#lblIMPSNo').hide();
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();

    }

    if ($('#chkMPSNo').prop('checked')) {
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();
        $('#lblIHAWBNo').hide();
        $('#lblIMPSNo').show();

    }


}

function GetSegerationReportDetails_HHT() {
    // $('#spnValMsg').text('');
    // $('#ddlHAWB').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var MAWBNo = $('#txtAWBNo').val();

    if ($('#txtIGMNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter IGM No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#txtHAWBNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        // $('#spnValMsg').text("Please enter HAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }


    if ($('#chkHWABNo').prop('checked')) {

        var text = $('#txtHAWBNo').val();
        ////  let a = text.slice(0, 4);
        //var middle9DigitHAWBNo = text.slice(4, 13);
        //$('#txtHAWBNo').val(middle9DigitHAWBNo);
        strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {

        var id = $('#txtHAWBNo').val();
        //var last12Digit = id.substr(id.length - 12); // => "Tabs1"
        //$('#txtHAWBNo').val(last12Digit);
        strMode = "M";

    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetSegerationReportDetails_HHT",
            data: JSON.stringify({
                'pi_strMode': strMode,
                'pi_strIGMNo': $('#txtIGMNo').val(),
                'pi_strHAWBMpsNo': $('#txtHAWBNo').val(),
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
                if (response == "") {
                    //$.alert('Please enter valid IGM No.');
                    $('#spnValMsg').text('Please enter valid HAWB No. / MPS No.').css('color', 'red');
                    $('#txtHAWBNo').val('');
                    $('#txtHAWBNo').focus();
                    return;
                } else {
                    // $('#spnValMsg').text('');


                }
                var xmlDoc = $.parseXML(response);

                var countHAWB = $(xmlDoc).find("Table").length;

                if (countHAWB > Number(0)) {
                    OutStatus = '';
                    $(xmlDoc).find('Table').each(function () {
                        OutStatus = $(this).find('OutStatus').text();
                        OutMsg = $(this).find('OutMsg').text();
                        if (OutStatus == 'E') {
                            $('#spnValMsg').text(OutMsg).css('color', 'red');
                            $('#txtHAWBNo').val('');
                            $('#txtHAWBNo').focus();
                            return;
                        } else {
                            $('#spnValMsg').text('');
                        }
                        //  _IGMNo = $(this).find('IGMNo').text();
                        _IGMNo = $(this).find('IGMNo').text();
                        _HawbId = $(this).find('HawbId').text();
                        _HawbMpsNo = $(this).find('HawbMpsNo').text();
                        _ManiPkgs = $(this).find('ManiPkgs').text();
                        _ManiGrossWt = $(this).find('ManiGrossWt').text();
                        _RecdPkgs = $(this).find('RecdPkgs').text();
                        _RecdGrossWt = $(this).find('RecdGrossWt').text();
                        _RecdChargableWt = $(this).find('TotalChgWt').text();
                        _TotalChgWt = $(this).find('TotalChgWt').text();
                        _IsShipmentFinalized = $(this).find('IsShipmentFinalized').text();
                        _FlightArriDate = $(this).find('FlightArriDate').text();
                        _DocDate = $(this).find('DocDate').text();
                        _ULDDate = $(this).find('ULDDate').text();
                        _FlightStartDate = $(this).find('FlightStartDate').text();
                        _FlightEndDate = $(this).find('FlightEndDate').text();
                        _IgmYear = $(this).find('IgmYear').text();
                        _Status = $(this).find('Status').text();
                        _PackagingType = $(this).find('PackagingType').text();
                        _Location = $(this).find('Location').text();
                        _DamageRemarks = $(this).find('DamageRemarks').text();
                        _ScannedChrgWt = $(this).find('ScannedChrgWt').text()


                        // $('#txtManifestedPieces').val($(this).find('ManiPkgs').text()).attr('disabled', 'disabled');
                        // $('#txtManifestedGrWt').val($(this).find('ManiGrossWt').text()).attr('disabled', 'disabled');
                        // $('#txtReceivedPieces').val($(this).find('RecdPkgs').text());
                        // $('#txtReceivedGrWt').val($(this).find('RecdGrossWt').text());
                        //  $('#txtTotalChgWt').val($(this).find('TotalChgWt').text());
                        //   $('#txtCommodity').text($(this).find('ULDRecdDate').text());
                        $('#txtPackagingType').val($(this).find('PackagingType').text());
                        $('#txtStatus').val($(this).find('Status').text());
                        $('#txtLocation').val($(this).find('Location').text());
                        $('#txtDmgRemarks').val($(this).find('DamageRemarks').text());

                        _calCharWt = parseFloat(_ManiGrossWt) / parseInt(_ManiPkgs);
                        $('#txtReceivedGrWt').val(parseFloat(_calCharWt).toFixed(3));

                        $('#txtManifestedPieces').val($(this).find('ScannedPkgs').text() + '/' + $(this).find('ManiPkgs').text());
                        $('#txtManifestedGrWt').val(_ScannedChrgWt + '/' + _ManiGrossWt);


                        //if (_IsShipmentFinalized == "false") {
                        //    $("#btnRevoke").attr('disabled', 'disabled');
                        //} else if (_IsShipmentFinalized == "true") {
                        //    $("#btnRevoke").removeAttr('disabled');
                        //}

                        //if (_IsShipmentFinalized == "false") {
                        //    $("#btnSeggrigation").removeAttr('disabled');
                        //} else if (_IsShipmentFinalized == "true") {
                        //    $("#btnSeggrigation").attr('disabled', 'disabled');

                        //}

                        //if (_IsShipmentFinalized == "false") {
                        //    $("#btnFinalize").removeAttr('disabled');
                        //} else if (_IsShipmentFinalized == "true") {
                        //    $("#btnFinalize").attr('disabled', 'disabled');

                        //}


                    });
                    //  GetPackageIdBarcodeLabelList_HHT();
                    if (OutStatus == '') {
                        ExpGetCommodity_forHHT();
                    }

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





function ExpGetCommodity_forHHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var IGMNo = $('#txtIGMNo').val();
    $('#ddlCommodity').empty();
    //if ($('#txtIGMNo').val() == "") {
    //    errmsg = "Please enter IGM No first";
    //    $.alert(errmsg);
    //    $('#txtAWBNo').val('');
    //    return;
    //}


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "ExpGetCommodity_forHHT",
            data: JSON.stringify({
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
                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function (index) {


                    MC_COMMODITYDESC_C = $(this).find('MC_COMMODITYDESC_C').text();
                    MC_RowId_I = $(this).find('MC_RowId_I').text();
                    MC_CommodityCode_C = $(this).find('MC_CommodityCode_C').text();


                    //if (index == 0 && $("#ddlCommodity").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlCommodity');
                    //}

                    var newOption = $('<option></option>');
                    newOption.val(MC_COMMODITYDESC_C).text(MC_COMMODITYDESC_C);
                    newOption.appendTo('#ddlCommodity');


                });
                GetConfigurationDetails_HHT();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}



function GetConfigurationDetails_HHT() {
    $('#ddlPackagingType').empty();
    $('#ddlStatus').empty();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var IGMNo = $('#txtIGMNo').val();

    //if ($('#txtIGMNo').val() == "") {
    //    errmsg = "Please enter IGM No first";
    //    $.alert(errmsg);
    //    $('#txtAWBNo').val('');
    //    return;
    //}


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetConfigurationDetails_HHT",
            data: JSON.stringify({
                'strType': 'CON',
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
                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function (index) {


                    ConfigCode = $(this).find('ConfigCode').text();
                    ConfigValueConfigValue = $(this).find('ConfigValue').text();



                    //if (index == 0 && $("#ddlPackagingType").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlPackagingType');
                    //}

                    if (ConfigCode == 'SEGSTATUS') {
                        var newOption = $('<option></option>');
                        newOption.val(ConfigValueConfigValue).text(ConfigValueConfigValue);
                        newOption.appendTo('#ddlStatus');

                        $('#ddlStatus').val(_Status);
                    }


                    //if (index == 0 && $("#ddlStatus").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlStatus');
                    //}

                    if (ConfigCode == 'SEGPACKAGINGDETAILS') {
                        var newOption = $('<option></option>');
                        newOption.val(ConfigValueConfigValue).text(ConfigValueConfigValue);
                        newOption.appendTo('#ddlPackagingType');

                        if (_PackagingType != '') {
                            $('#ddlPackagingType').val(_PackagingType);
                        }
                    }

                });
                ImpSaveSegerationReport_HHT();
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

function clearALL() {

    //$('#spnValMsg').text('');
    // $('#txtIGMNo').val('');
    //$('#txtHAWBNo').val('');
    $('#txtManifestedPieces').val('');
    $('#txtManifestedGrWt').val('');
    //$('#txtReceivedPieces').val('');
    //$('#txtReceivedGrWt').val('');
    $('#txtTotalChgWt').val('');
    $('#ddlCommodity').val('');
    $('#ddlPackagingType').val('');
    $('#ddlStatus').val('');
    $('#txtLocation').val('');
    $('#txtDmgRemarks').val('');
    $('#ddlCommodity').empty();
    $('#ddlPackagingType').empty();
    $('#ddlStatus').empty();

    //ExpGetCommodity_forHHT();
    //GetConfigurationDetails_HHT();



}

function clearALLonButtonClick() {

    $('#spnValMsg').text('');
    // $('#txtIGMNo').val('');
    $('#txtHAWBNo').val('');
    $('#txtManifestedPieces').val('');
    $('#txtManifestedGrWt').val('');
    //$('#txtReceivedPieces').val('');
    //$('#txtReceivedGrWt').val('');
    $('#txtTotalChgWt').val('');
    $('#ddlCommodity').val('');
    $('#ddlPackagingType').val('');
    $('#ddlStatus').val('');
    $('#txtLocation').val('');
    $('#txtDmgRemarks').val('');
    $('#ddlCommodity').empty();
    $('#ddlPackagingType').empty();
    $('#ddlStatus').empty();

    //ExpGetCommodity_forHHT();
    //GetConfigurationDetails_HHT();



}

function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}
function alertDismissed() {
}


function GetBarcodeSettings_HHT() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var IGMNo = $('#txtIGMNo').val();

    //if ($('#txtIGMNo').val() == "") {
    //    errmsg = "Please enter IGM No first";
    //    $.alert(errmsg);
    //    $('#txtAWBNo').val('');
    //    return;
    //}


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetBarcodeSettings_HHT",
            data: JSON.stringify({
                'strDeviceId': '',
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
                var xmlDoc = $.parseXML(response);
                //var PRNCode = $(xmlDoc).find('Table')[1];
                //var table = xmlDoc.getElementsByTagName('Table')[0];
                //_PRNCode = table.childNodes[3];
                $(xmlDoc).find('Table').each(function (index) {


                    Barcode_PRN_Text = $(this).find('Setting').text();
                    // Barcode_PRN_Values = $(this).find('Value').text();

                    //xHAWBNox = Barcode_PRN_Values.indexOf("xHAWBNox");

                    if (Barcode_PRN_Text == 'Barcode_PRN_Text') {
                        Barcode_PRN_Values = $(this).find('Value').text();
                    }


                    //! 0 200 200 406 1
                    //PW 575
                    //TONE 0
                    //SPEED 2
                    //ON-FEED IGNORE
                    //NO-PACE
                    //BAR-SENSE
                    //PCX 34 20 
                    //&#x5;&#x1;&#x1;    &#x5;&#x2;. K K    ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ &#x1;A &#x12; x                                                         ÿÿÂÿÿÿÂÿÿÿÂÿÁÿÁÝÁßþÿÁÿªÿÿÁÿUwþÿÁþ«ÁûþÿÁýUÁýþÿÁúÁïëÿÁëÓÿÁõWÁýèÿUWÓÿÁê¯êÿ¿ÔÿÁÕ_Áÿ_æÿÁýÃÿÁßÒÿÁïÿÿÁÿÁõÁÿÁ÷wåÿÂ÷ÂÿÒÿÁê¿ÁÿÁú«üÿÁÕ_ÁÿÁõWçÿÁÝÁÿÒÿÁúÁïÁÿÁêÁïèÿÁþÓÿÁõWÁÿU_åÿ_Â}ÒÿÁþ«Áÿª¿èÿÁþÓÿÁýUÁÿUåÿÁÝÁÿÁß}ÓÿÁÿ®Áþ®ýÿÁÿU}Uæÿ}Á÷Áõ}ÁÿwÆÿwÂÿÁ÷ÂÿÁÿÁ÷ÂÿÁÿÁûÂ»éÿÁûÂÿ¿ÅÿÁûÃÿ¾ÆÿÁÿÃýÁÿÁýäÿÁýÁßÃýÁõÁßÂýÁÿÃýÃÿÁÝÁÿÁÝÄÿÁÿÂþÁëéÿÁûÁÿÁþÂÿÁþÂÿÁþÄÿÁþÁÿÁþÄÿÁÿU}UÁõãÿWw_ÁõÁóÁýÁ÷ÂWÂ]_W]uwUw_ÂWÂÿÁÿ»ÁÿªÁÿÁûãÿ»ÃÿÁëÂÿ¿»ÁÿÁûÁÿ¿ÁûÁÿÁû¿»ÂûÁÿ¿ÂÿÁýUÁÿUÁ×ãÿ}ÁÿÂßÁÇÁýÁ×ÁÕÁÝuÂ]ÂßÂ]Â×ÁÝ]Á×ÂÿÁÿÁïÁÿÁê¿ÁïâÿÁþÄÿÁïÓÿÁõWÁÿÁÕ_ÁßâÿÁýÁ÷wÁõ&#x17;ÅÿÁßÅÿÄÿÁ÷ÂÿÁû¿ÁÿÁê¯¿æÿÁþ¿ÓÿÁÕ_ÁÿÁõWâÿÁýÃÿÁÕÓÿÃÿÁþÁïãÿÁûÂÿÁþ«ÔÿÂÂÿãÿÁ÷ÁÿuUWÁ÷Áÿ}_wW}ÂwW_ÇÿèÿÁûØÿèÿÁ÷ÁýÂÿÁý_ÁÿÂÝÃßÁÝÁÿÁÝÁÿÁÝÁßÇÿèÿÁïÁÿÁþ¯ÁêÔÿÁ÷ÃÿÁ÷ÁÿÁ÷ÃÿÁ÷ÃÿÁ÷ÁÿÁ÷×ÿÂ÷UÂ&#x11;ÂÿÁ÷ÁÿÅ÷ÁÿwÈÿèÿÁïÂÿÁû¿ÔÿÁßÁÿÁ÷ÁÿÁÝÁÿÁýÁÝÁýÁÿÁõÂýÁÿÁÝÁ÷Áý×ÿÁ÷Áý×ÿèÿÁïØÿÁ×w}Â÷ÁÝÂwÁ÷ÂýuÁßÂwÖÿÁõÂwÃÿÃwÎÿ¿Áÿ¿åÿÁûÁþ«¿Ãÿ¿ÑÿÁÿÂßÂ}ÁÿÁßÁ×ÂÿÂýÁÿ_Á÷ÁýØÿÁÔE_ÂÿÁýÁÿÁßÁýÏÿéÿ¯ÁïÖÿÁßuwÂuÁ÷wÁÝÁ÷wÁ÷ÂýÁ÷ÁßÂ÷×ÿwÅÿÂ÷wÎÿÅÿÁûÉÿÁûñÿ
                    //BT 7 0 9
                    //B 128 4 30 102 43 200 123456789012
                    //T 5 0 43 360 xClientNamex
                    //T 5 0 33 97 HAWB No.: xHAWBNox
                    //T 5 0 33 129 MAWB No.: xMAWBNox
                    //T 5 0 329 97 xDestx
                    //T 5 0 435 97 xIGMNox
                    //T 5 0 33 158 xFlitArrDatex
                    //T 5 0 329 158 xFlitArrTimex
                    //T 5 0 329 129 xPkgx
                    //PRINT



                    //if (index == 0 && $("#ddlPackagingType").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlPackagingType');
                    //}

                    //if (ConfigCode == 'SEGSTATUS') {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(ConfigValueConfigValue).text(ConfigValueConfigValue);
                    //    newOption.appendTo('#ddlStatus');
                    //}


                    //if (index == 0 && $("#ddlStatus").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlStatus');
                    //}

                    //if (ConfigCode == 'SEGPACKAGINGDETAILS') {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(ConfigValueConfigValue).text(ConfigValueConfigValue);
                    //    newOption.appendTo('#ddlPackagingType');
                    //}

                });
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}


function ImpSaveSegerationReport_HHT() {

    if ($('#txtIGMNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter IGM No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#txtHAWBNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter HAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#txtPrintCopy').val() == '') {
        $.alert('Please enter No of copy');
        return;
    }

    if ($('#txtPrintCopy').val().match(/^0/)) {
        $('#txtPrintCopy').val('');
        $.alert('Please enter correct value');
        return;
    }

    //if ($('#txtReceivedPieces').val() == "") {
    //    //errmsg = "Please enter IGM No first";
    //    //$.alert(errmsg);
    //    $('#spnValMsg').text("Please enter received pieces").css('color', 'red');

    //    return;
    //} else {
    //    $('#spnValMsg').text("");
    //}

    //if ($('#txtReceivedGrWt').val() == "") {
    //    //errmsg = "Please enter IGM No first";
    //    //$.alert(errmsg);
    //    $('#spnValMsg').text("Please enter received gr. wt.").css('color', 'red');

    //    return;
    //} else {
    //    $('#spnValMsg').text("");
    //}


    //if ($('#txtHAWBNo').val() == "") {
    //    //errmsg = "Please enter IGM No first";
    //    //$.alert(errmsg);
    //    $('#spnValMsg').text("Please enter HAWB No.").css('color', 'red');

    //    return;
    //} else {
    //    $('#spnValMsg').text("");
    //}

    var wtCalaculate;
    var rcvPgs;
    if ($('#chkHWABNo').prop('checked')) {

        wtCalaculate = $('#txtReceivedGrWt').val();
        rcvPgs = '1';
        wtCalaculate = _RecdGrossWt;
        wtCalaculateForchargble = _RecdChargableWt;
        strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {
        rcvPgs = _RecdPkgs;
        wtCalaculate = _RecdGrossWt;
        wtCalaculateForchargble = _RecdChargableWt;
        strMode = "M";

    }


    inputFltXML = "<IGMNo>" + _IGMNo + "</IGMNo><IGMYr>" + _IgmYear + "</IGMYr><FltNo>" + "" + "</FltNo><FltDt>" + _FlightArriDate + "</FltDt><Origin>" + " " + "</Origin><Dest>" + " " + "</Dest><FltArr>" + _FlightArriDate + "</FltArr><DOCTime>" + _DocDate + "</DOCTime><ULDTime>" + _ULDDate + "</ULDTime><FltSrtTime>" + _FlightStartDate + "</FltSrtTime><ComTime>" + "" + "</ComTime><IGMRemarks>" + " " + "</IGMRemarks><Supervisor>" + " " + "</Supervisor><SDM>" + " " + "</SDM><FlightCheckedBy>" + UserName + "</FlightCheckedBy><IssueDO>" + 0 + "</IssueDO>";
    inputLocXML = "<MAWB>" + 0 + "</MAWB><HAWB>" + _HawbMpsNo + "</HAWB><MNPCS>" + _ManiPkgs + "</MNPCS><MNGWT>" + _ManiGrossWt + "</MNGWT><RcdPCS>" + rcvPgs + "</RcdPCS><RcdGWT>" + wtCalaculate + "</RcdGWT><ChrgbleWt>" + wtCalaculateForchargble + "</ChrgbleWt><Remarks>" + " " + "</Remarks><DpyCode>" + " " + "</DpyCode><DiscRecord>" + "N" +
        "</DiscRecord><ProbRecord>" + "Y" + "</ProbRecord><DamgRecord>" + $("#txtDmgRemarks").val() + "</DamgRecord><Origin>" + " " + "</Origin><Dest>" + " " + "</Dest><CommCode>" + " " + "</CommCode><IrregCode>" + " " + "</IrregCode><DamCode>" + _DamageRemarks +
        "</DamCode><ConsigName>" + " " + "</ConsigName><ConsigAdd>" + " " + "</ConsigAdd><ConsolAgent>" + " " + "</ConsolAgent><ExpPkgs>" + 0 + "</ExpPkgs><ExpGwt>" + 0 +
        "</ExpGwt><ExpChrgblwt>" + 0 + "</ExpChrgblwt><CommodityGroup>" + $('#ddlCommodity option:selected').text() + "</CommodityGroup><IsDelivered>" + "N" + "</IsDelivered><HawbDescription>" + " " + "</HawbDescription><Status>" + $('#ddlStatus option:selected').text() + "</Status><PackagingType>" + $('#ddlPackagingType option:selected').text() + "</PackagingType><Location>" + $("#txtLocation").val() + "</Location>";
    inputComXML = "<Com><Hawbid>" + _HawbId + "</Hawbid><MAWB>" + " " + "</MAWB><HAWB>" + _HawbMpsNo + "</HAWB><ComPCS>" + rcvPgs + "</ComPCS><ComGWT>" + wtCalaculate + "</ComGWT><ComChWt>" + wtCalaculateForchargble + "</ComChWt><CommCode>" + " " + "</CommCode><ComId>" + 0 + "</ComId></Com>";


    inputXML = "<Segregation>" + "<FltDts>" + inputFltXML + "<Loc>" + inputLocXML + inputComXML + "</Loc>" + "</FltDts>" + "</Segregation>";

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "ImpSaveSegerationReport_HHT",
            data: JSON.stringify({

                'pi_strIGMNo': _IGMNo,
                'pi_intHawbId': _HawbId,
                'pi_strHawbNo': $('#txtHAWBNo').val(),
                'pi_strSegregationXML': inputXML,
                'pi_intIgmYear': _IgmYear,
                'pi_strCreatedBy': UserName,
                'pi_strCommodity': $('#ddlCommodity option:selected').text(),
                'pi_strMode': strMode,
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

                    //var outMsg = $(this).find('Output').text();
                    //$.alert(outMsg);
                    if ($(this).find('Output').text() == 'Record Saved Successfully') {
                        tempHAWBNo = localStorage.setItem('tempHawbNo', $('#txtHAWBNo').val())
                        GetPackageIdBarcodeLabelList_HHT();
                        GetSegerationReportDetails_HHTList();
                        $('#spnValMsg').text($(this).find('Output').text()).css('color', 'green');
                        // clearALL();

                        return;
                    } else {
                        $('#spnValMsg').text($(this).find('Output').text()).css('color', 'red');
                        clearALL();
                        $('#txtHAWBNo').val('');
                    }


                    //if (outMsg == 'E') {
                    //    $.alert(Output);
                    //    return;
                    //}
                });



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


function GetPackageIdBarcodeLabelList_HHT() {

    // $('#ddlHAWB').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetPackageIdBarcodeLabelList_HHT_V2",
            data: JSON.stringify({
                'strMPSNo': '',
                'intHAWBId': _HawbId,
                'strMAWBNO': '',
                'strHAWBNO': '',
                'intIGMNo': _IGMNo,
                'intIGMYear': _IgmYear,
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

                var xmlDoc = $.parseXML(response);

                var countHAWB = $(xmlDoc).find("Table").length;
                formatedDataofPRN = '';
                if (countHAWB > Number(0)) {

                    $(xmlDoc).find('Table').each(function (index) {
                        HAWBId = $(this).find('HAWBId').text();
                        HAWBNo = $(this).find('HAWBNo').text();
                        MPSNo = $(this).find('MPSNo').text();
                        MAWBNo = $(this).find('MAWBNo').text();
                        Destination = $(this).find('Destination').text();
                        IGMNo = $(this).find('IGMNo').text();
                        IGMHAWBPkgs = $(this).find('IGMHAWBPkgs').text();
                        Pieces = $(this).find('Pieces').text();
                        PkgOfPkgCount = $(this).find('PkgOfPkgCount').text();
                        PrintDate = $(this).find('PrintDate').text();
                        PrintTime = $(this).find('PrintTime').text();
                        FlightArrivalDate = $(this).find('FlightArrivalDate').text();
                        FlightArrivalTime = $(this).find('FlightArrivalTime').text();
                        CleintName = $(this).find('CleintName').text();
                        PackageId = $(this).find('PackageId').text();

                        //JsBarcode("#barcode3", MPSNo, {
                        //    format: "CODE128",
                        //    displayValue: false,
                        //    fontSize: 20
                        //});


                        //var CHAR_ESC = '\t'; var LINE_FEED = '\n'; var CARRIAGE_RETURN = '\r'; var hr = '________________________________________________';
                        //var newLine = '\x0A';
                        //printedData = '{center}{b}' + CleintName + '{/b}{center}' + LINE_FEED + hr + LINE_FEED + LINE_FEED +
                        //               '{left}HAWB No.' + CHAR_ESC + ':' + HAWBNo + CHAR_ESC + Destination + CHAR_ESC + IGMNo + CHAR_ESC + CARRIAGE_RETURN + LINE_FEED +
                        //               'MAWB No.' + CHAR_ESC + ':' + MAWBNo + CHAR_ESC + Pieces + CHAR_ESC + CARRIAGE_RETURN + LINE_FEED +
                        //               FlightArrivalDate + CHAR_ESC + FlightArrivalTime + CARRIAGE_RETURN + LINE_FEED;

                        //var CHAR_ESC = '\t'; var LINE_FEED = '\n'; var CARRIAGE_RETURN = '\r'; var hr = '________________________________________________';
                        //var newLine = '\x0A';
                        //printedData = '{center}{b}' + CleintName + '{/b}{center}' + LINE_FEED + hr + LINE_FEED + LINE_FEED +
                        //               '{left}HAWB No.' + CHAR_ESC + ':' + HAWBNo + CHAR_ESC + Destination + CHAR_ESC + IGMNo + CHAR_ESC + CARRIAGE_RETURN + LINE_FEED +
                        //               'MAWB No.' + CHAR_ESC + ':' + MAWBNo + CHAR_ESC + Pieces + CHAR_ESC + CARRIAGE_RETURN + LINE_FEED +
                        //               FlightArrivalDate + CHAR_ESC + FlightArrivalTime + CARRIAGE_RETURN + LINE_FEED;

                        //PrintToZebraPrinter(HAWBNo, Destination, IGMNo, MAWBNo, Pieces, FlightArrivalDate, FlightArrivalTime, CleintName);

                        //  printedData = CleintName + '\n\n' +
                        //'HAWB No.\t:' + '\t' + HAWBNo + '\t' + Destination + '\t' + IGMNo + '\t' + '\r' + '\n\n' +
                        // 'MAWB No.\t:' + '\t' + MAWBNo + '\t' + Pieces + '\t' + '\r' + '\n\n' + FlightArrivalDate + '\t\t' + FlightArrivalTime + '\r' + '\n\n';

                        //PrintToZebraPrinter(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo);
                        if (index == 0) {
                            formatedDataofPRN = formatedDataofPRN + '\r\n' + getFormatedPRNText(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId);

                            // formatedDataofPRN = formatedDataofPRN + '\r\n' + getFormatedPRNText(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId);

                        }



                    });
                    // GetSegerationReportDetails_HHT();

                    var copyNo = parseInt($('#txtPrintCopy').val());
                    for (var i = 0; i < copyNo; i++) {
                        finalPRintingSlip();
                    }

                    // finalPRintingSlip();

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



function getFormatedPRNText(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId) {
    //    printedData = '! 0 200 200 575 1\r\n' +
    //'PW 575\r\n' +
    //'TONE 0\r\n' +
    //'SPEED 2\r\n' +
    //'ON-FEED IGNORE\r\n' +
    //'NO-PACE\r\n' +
    //'BAR-SENSE\r\n' +
    //'PCX 28 20 \r\n' +
    //'&#x5;&#x1;&#x1;    . K K    ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ A  x                                                         ÿÿÂÿÿÿÂÿÿÿÂÿÁÿÁîÁïþÿÁÿÁÕþÿÁÿª»þÿÁÿUÁýþÿÁþªÁþþÿÁýwëÿÁõÓÿÁú«Áþ¿èÿª«ÓÿÁõWêÿÁßÔÿÁê¯Áÿ¯æÿÁþÃÿÁïÒÿÁ÷ÿÿÁÿÁú¿ÁÿÁû»åÿÂûÂÿ¿ÒÿÁõ_ÁÿÁýUüÿÁê¯ÁÿÁú«çÿÁîÁÿ¿ÒÿÁýwÁÿÁõwéÿÒÿÁú«Áÿª¯åÿ¯Â¿¾¿ÒÿÁÿUÁÿÁÕ_éÿÒÿÁþªÁÿª¿åÿÁîÁÿÁï¾ÓÿÁÿÁ×WüÿÁÿª¾ªæÿ¾ÁûÁú¾Áÿ»Æÿ»ÂÿÁûÂÿ¿ÁÿÁûÂÿÁÿÁýÂÝéÿÁýÂÿÁßÅÿÁýÃÿÁßÅÿÁÿÃþÁÿÁþäÿÁþÁïÃþÁúÁïÂþÁÿÃþÃÿÁîÁÿÁîÄÿÂÿuéÿÁýÂÿÂÿÂÿÄÿÁÿÃÿÁÿª¾ª¿Áúãÿ«»¯ÁúÁùÁþÁûÂ«¿Â®¯«®º»ª»¯Â«ÂÿÁÿÁÝÁÿÁÕÁýãÿÁÝÃÿÁõÂÿÁßÁÝÁÿÁýÁÿÁßÁýÁÿÁýÁßÁÝÂýÁÿÁßÂÿÁþªÁÿª¿Áëãÿ¾ÁÿÂïÁãÁþÁëÁêÁîºÂ®ÂïÂ®¿ÂëÁî®ÁëÂÿÁÿÁ÷ÁÿÁõ_Á÷ãÿÃÿÁ÷ÓÿÁú«ÁÿÁê¯ÁïâÿÁþÁû»Áú¿‹ÅÿÁïÅÿ¿ÄÿÁûÂÿÁýÁßÁÿÁõWÁßçÿ_ÓÿÁê¯ÁÿÁú«¿âÿÁþÃÿÁê¿ÓÿÄÿwãÿÁýÃÿUÔÿÂ¿Âÿ¿ãÿÁûÁÿºª«ÁûÁÿ¾¿¯»«¾¿Â»«¯ÇÿèÿÁýØÿèÿÁûÁþÂÿÁþ¯ÁÿÂîÃïÁîÁÿÁîÁÿÁîÁïÇÿèÿÁ÷ÂÿWÁõÓÿÁûÃÿÁûÁÿÁûÃÿÁûÃÿÁûÁÿÁû×ÿÂûªÂˆ¿ÂÿÁûÁÿÅûÁÿ»ÈÿèÿÁ÷ÂÿÁýÁßÔÿÁïÁÿÁûÁÿÁîÁÿÁþÁîÁþÁÿÁúÂþÁÿÁîÁûÁþ×ÿÁûÁþ×ÿèÿÁ÷Øÿ¿Áë»¿¾ÂûÁîÂ»ÁûÂþºÁïÂ»¿ÖÿÁúÂ¿»ÃÿÃ»¿ÎÿÁßÁÿÁßåÿÁýÁÿUÁßÃÿÁßÑÿÁÿÂïÂ¾Áÿ¿ÁïÁëÂÿÂþÁÿ¯ÁûÁþØÿÁê"¯ÂÿÁþÁÿÁïÁþÏÿéÿÁ×Á÷ÖÿÁïº»ÂºÁû»ÁîÁû»ÁûÂþÁûÁïÂû¿×ÿ»ÅÿÂû»¿ÎÿÅÿÁýÉÿÁýñÿ\r\n' +
    //'BT 7 0 3\r\n' +
    //'B 128 2 30 102 78 243 xBacodeNox\r\n' +
    //'T 5 0 33 423 xClientNamex\r\n' +
    //'T 5 0 28 97 HAWB No.: xHAWBNox\r\n' +
    //'T 5 0 29 143 MAWB No.: xMAWBNox\r\n' +
    //'T 5 0 324 97 xDestx\r\n' +
    //'T 5 0 430 97 xIGMNox\r\n' +
    //'T 5 0 29 184 xFlitArrDatex\r\n' +
    //'T 5 0 324 184 xFlitArrTimex\r\n' +
    //'T 5 0 324 143 xPkgx\r\n' +
    //'PRINT';

    var returnValues = Barcode_PRN_Values;

    returnValues = returnValues.replace('xPkgIDBarx', PackageId);
    returnValues = returnValues.replace('xPkgIDlblx', PackageId);
    returnValues = returnValues.replace('xClientNamex', CleintName);
    returnValues = returnValues.replace('xHAWBNox', HAWBNo);
    returnValues = returnValues.replace('xMAWBNox', MAWBNo);
    returnValues = returnValues.replace('xDestx', Destination);
    returnValues = returnValues.replace('xIGMNox', IGMNo);
    returnValues = returnValues.replace('xFlitArrDatex', FlightArrivalDate);
    returnValues = returnValues.replace('xFlitArrTimex', FlightArrivalTime);
    returnValues = returnValues.replace('xPkgx', PkgOfPkgCount);
    returnValues = returnValues.replace('xMPSNox', MPSNo);
    return returnValues;
}


function finalPRintingSlip() {
    window.DatecsPrinter.listBluetoothDevices(
        function (devices) {
            window.DatecsPrinter.connect(devices[0].address,
                function () {
                    // printLogo();
                    // alert('connection success');
                    var copyNo = parseInt($('#txtPrintCopy').val());
                    for (var i = 0; i < copyNo; i++) {
                        PrintCourierData();
                    }
                },
                function () {
                    // alert(JSON.stringify(error));
                }
            );
        },
        function (error) {
            // alert(JSON.stringify(error));
        }
    );

    function PrintCourierData() {

        window.DatecsPrinter.printText(formatedDataofPRN, 'ISO-8859-1',
            function () {

                //  alert('print success');
                // printMyBarcode();
            }
        );
    }
}

//function PrintToZebraPrinter(HAWBNo, Destination, IGMNo, MAWBNo, Pieces, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo) {
//    //alert(CleintName + '\n\n\n' +
//    //               'HAWB No.\t:\t' + HAWBNo + '\t' + Destination + '\t' + IGMNo + '\t' + '\r' + '\n\n' +
//    //               'MAWB No.\t:\t' + MAWBNo + '\t' + Pieces + '\t' + '\r' + '\n\n' +
//    //               FlightArrivalDate + '\t\t' + FlightArrivalTime + '\r' + '\n\n')

//    var CHAR_ESC = '\t'; var LINE_FEED = '\n'; var CARRIAGE_RETURN = '\r'; var hr = '________________________________________________';
//    var newLine = '\x0A';
//    var Space = '\x20A'
//    //printedData = CleintName + '\n\n' + '\n' +
//    //               'HAWB No.\t:\t' + HAWBNo + '\t' + Destination + '\t' + IGMNo + '\t' + '\r' + '\n\n' +
//    //               'MAWB No.\t:\t' + MAWBNo + '\t' + Pieces + '\t' + '\r' + '\n\n' +
//    //               FlightArrivalDate + '\t\t' + FlightArrivalTime + '\r' + '\n\n';


//    // printedData = '! 0.3937 200 200 1 1\r\n' +
//    //'IN-CENTIMETERS\r\n' +
//    //'CENTER\r\n' +
//    //'T 4 0 0 0 ' + CleintName + '\r\n' +
//    //'IN-DOTS\r\n' +
//    //'T 4 0 0 48 HAWB No.:' + HAWBNo + '\r\n' +
//    // 'IN-DOTS\r\n' +
//    //'T 4 0 0 48 Dest.:' + Destination + '\r\n' +
//    // 'IN-DOTS\r\n' +
//    //'T 4 0 0 48 IGM No.:' + IGMNo + '\r\n' +
//    // 'IN-DOTS\r\n' +
//    //'T 4 0 0 48 MAWB No.:' + MAWBNo + '\r\n' +
//    // 'IN-DOTS\r\n' +
//    //'T 4 0 0 48 Pieces:' + HAWBNo + '\r\n' +
//    // 'IN-DOTS\r\n' +
//    //'T 4 0 0 48 ' + FlightArrivalTime + '\r\n' +
//    // 'IN-DOTS\r\n' +
//    //'T 4 0 0 48 ' + FlightArrivalDate + '\r\n' +
//    // 'IN-DOTS\r\n' +
//    //'B 128 1 1 48 16 112 ' + MPSNo + '\r\n' +
//    //'T 4 0 48 160 ' + MPSNo + '\r\n' +
//    //'FORM\r\n' +
//    //'PRINT\r\n';




//    var printedData2 = '! 0 200 200 575 1\r\n' +
//    'PW 575\r\n' +
//    'TONE 0\r\n' +
//    'SPEED 2\r\n' +
//    'ON-FEED IGNORE\r\n' +
//    'NO-PACE\r\n' +
//    'BAR-SENSE\r\n' +
//    'PCX 28 20 \r\n' +
//    '&#x5;&#x1;&#x1;    . K K    ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ A  x                                                         ÿÿÂÿÿÿÂÿÿÿÂÿÁÿÁîÁïþÿÁÿÁÕþÿÁÿª»þÿÁÿUÁýþÿÁþªÁþþÿÁýwëÿÁõÓÿÁú«Áþ¿èÿª«ÓÿÁõWêÿÁßÔÿÁê¯Áÿ¯æÿÁþÃÿÁïÒÿÁ÷ÿÿÁÿÁú¿ÁÿÁû»åÿÂûÂÿ¿ÒÿÁõ_ÁÿÁýUüÿÁê¯ÁÿÁú«çÿÁîÁÿ¿ÒÿÁýwÁÿÁõwéÿÒÿÁú«Áÿª¯åÿ¯Â¿¾¿ÒÿÁÿUÁÿÁÕ_éÿÒÿÁþªÁÿª¿åÿÁîÁÿÁï¾ÓÿÁÿÁ×WüÿÁÿª¾ªæÿ¾ÁûÁú¾Áÿ»Æÿ»ÂÿÁûÂÿ¿ÁÿÁûÂÿÁÿÁýÂÝéÿÁýÂÿÁßÅÿÁýÃÿÁßÅÿÁÿÃþÁÿÁþäÿÁþÁïÃþÁúÁïÂþÁÿÃþÃÿÁîÁÿÁîÄÿÂÿuéÿÁýÂÿÂÿÂÿÄÿÁÿÃÿÁÿª¾ª¿Áúãÿ«»¯ÁúÁùÁþÁûÂ«¿Â®¯«®º»ª»¯Â«ÂÿÁÿÁÝÁÿÁÕÁýãÿÁÝÃÿÁõÂÿÁßÁÝÁÿÁýÁÿÁßÁýÁÿÁýÁßÁÝÂýÁÿÁßÂÿÁþªÁÿª¿Áëãÿ¾ÁÿÂïÁãÁþÁëÁêÁîºÂ®ÂïÂ®¿ÂëÁî®ÁëÂÿÁÿÁ÷ÁÿÁõ_Á÷ãÿÃÿÁ÷ÓÿÁú«ÁÿÁê¯ÁïâÿÁþÁû»Áú¿‹ÅÿÁïÅÿ¿ÄÿÁûÂÿÁýÁßÁÿÁõWÁßçÿ_ÓÿÁê¯ÁÿÁú«¿âÿÁþÃÿÁê¿ÓÿÄÿwãÿÁýÃÿUÔÿÂ¿Âÿ¿ãÿÁûÁÿºª«ÁûÁÿ¾¿¯»«¾¿Â»«¯ÇÿèÿÁýØÿèÿÁûÁþÂÿÁþ¯ÁÿÂîÃïÁîÁÿÁîÁÿÁîÁïÇÿèÿÁ÷ÂÿWÁõÓÿÁûÃÿÁûÁÿÁûÃÿÁûÃÿÁûÁÿÁû×ÿÂûªÂˆ¿ÂÿÁûÁÿÅûÁÿ»ÈÿèÿÁ÷ÂÿÁýÁßÔÿÁïÁÿÁûÁÿÁîÁÿÁþÁîÁþÁÿÁúÂþÁÿÁîÁûÁþ×ÿÁûÁþ×ÿèÿÁ÷Øÿ¿Áë»¿¾ÂûÁîÂ»ÁûÂþºÁïÂ»¿ÖÿÁúÂ¿»ÃÿÃ»¿ÎÿÁßÁÿÁßåÿÁýÁÿUÁßÃÿÁßÑÿÁÿÂïÂ¾Áÿ¿ÁïÁëÂÿÂþÁÿ¯ÁûÁþØÿÁê"¯ÂÿÁþÁÿÁïÁþÏÿéÿÁ×Á÷ÖÿÁïº»ÂºÁû»ÁîÁû»ÁûÂþÁûÁïÂû¿×ÿ»ÅÿÂû»¿ÎÿÅÿÁýÉÿÁýñÿ\r\n' +
//    'BT 7 0 3\r\n' +
//    'B 128 2 30 102 78 243 xBacodeNox\r\n' +
//    'T 5 0 33 423 xClientNamex\r\n' +
//    'T 5 0 28 97 HAWB No.: xHAWBNox\r\n' +
//    'T 5 0 29 143 MAWB No.: xMAWBNox\r\n' +
//    'T 5 0 324 97 xDestx\r\n' +
//    'T 5 0 430 97 xIGMNox\r\n' +
//    'T 5 0 29 184 xFlitArrDatex\r\n' +
//    'T 5 0 324 184 xFlitArrTimex\r\n' +
//    'T 5 0 324 143 xPkgx\r\n' +
//    'PRINT';



//    printedData2 = printedData2.replace('xBacodeNox', MPSNo);
//    printedData2 = printedData2.replace('xClientNamex', CleintName);
//    printedData2 = printedData2.replace('xHAWBNox', HAWBNo);
//    printedData2 = printedData2.replace('xMAWBNox', MAWBNo);
//    printedData2 = printedData2.replace('xDestx', Destination);
//    printedData2 = printedData2.replace('xIGMNox', IGMNo);
//    printedData2 = printedData2.replace('xFlitArrDatex', FlightArrivalDate);
//    printedData2 = printedData2.replace('xFlitArrTimex', FlightArrivalTime);
//    printedData2 = printedData2.replace('xPkgx', Pieces);

//    //printedData = '! 0 200 200 406 1\r\n' +
//    //'PW 575\r\n' +
//    //'TONE 0\r\n' +
//    //'SPEED 2\r\n' +
//    //'ON-FEED IGNORE\r\n' +
//    //'NO-PACE\r\n' +
//    //'BAR-SENSE\r\n' +
//    //'PCX 28 20 \r\n' +
//    //'&#x5;&#x1;&#x1;    &#x5;&#x2;. K K    ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ &#x1;A &#x12; x                                                         ÿÿÂÿÿÿÂÿÿÿÂÿÁÿÁÝÁßþÿÁÿªÿÿÁÿUwþÿÁþ«ÁûþÿÁýUÁýþÿÁúÁïëÿÁëÓÿÁõWÁýèÿUWÓÿÁê¯êÿ¿ÔÿÁÕ_Áÿ_æÿÁýÃÿÁßÒÿÁïÿÿÁÿÁõÁÿÁ÷wåÿÂ÷ÂÿÒÿÁê¿ÁÿÁú«üÿÁÕ_ÁÿÁõWçÿÁÝÁÿÒÿÁúÁïÁÿÁêÁïèÿÁþÓÿÁõWÁÿU_åÿ_Â}ÒÿÁþ«Áÿª¿èÿÁþÓÿÁýUÁÿUåÿÁÝÁÿÁß}ÓÿÁÿ®Áþ®ýÿÁÿU}Uæÿ}Á÷Áõ}ÁÿwÆÿwÂÿÁ÷ÂÿÁÿÁ÷ÂÿÁÿÁûÂ»éÿÁûÂÿ¿ÅÿÁûÃÿ¾ÆÿÁÿÃýÁÿÁýäÿÁýÁßÃýÁõÁßÂýÁÿÃýÃÿÁÝÁÿÁÝÄÿÁÿÂþÁëéÿÁûÁÿÁþÂÿÁþÂÿÁþÄÿÁþÁÿÁþÄÿÁÿU}UÁõãÿWw_ÁõÁóÁýÁ÷ÂWÂ]_W]uwUw_ÂWÂÿÁÿ»ÁÿªÁÿÁûãÿ»ÃÿÁëÂÿ¿»ÁÿÁûÁÿ¿ÁûÁÿÁû¿»ÂûÁÿ¿ÂÿÁýUÁÿUÁ×ãÿ}ÁÿÂßÁÇÁýÁ×ÁÕÁÝuÂ]ÂßÂ]Â×ÁÝ]Á×ÂÿÁÿÁïÁÿÁê¿ÁïâÿÁþÄÿÁïÓÿÁõWÁÿÁÕ_ÁßâÿÁýÁ÷wÁõ&#x17;ÅÿÁßÅÿÄÿÁ÷ÂÿÁû¿ÁÿÁê¯¿æÿÁþ¿ÓÿÁÕ_ÁÿÁõWâÿÁýÃÿÁÕÓÿÃÿÁþÁïãÿÁûÂÿÁþ«ÔÿÂÂÿãÿÁ÷ÁÿuUWÁ÷Áÿ}_wW}ÂwW_ÇÿèÿÁûØÿèÿÁ÷ÁýÂÿÁý_ÁÿÂÝÃßÁÝÁÿÁÝÁÿÁÝÁßÇÿèÿÁïÁÿÁþ¯ÁêÔÿÁ÷ÃÿÁ÷ÁÿÁ÷ÃÿÁ÷ÃÿÁ÷ÁÿÁ÷×ÿÂ÷UÂ&#x11;ÂÿÁ÷ÁÿÅ÷ÁÿwÈÿèÿÁïÂÿÁû¿ÔÿÁßÁÿÁ÷ÁÿÁÝÁÿÁýÁÝÁýÁÿÁõÂýÁÿÁÝÁ÷Áý×ÿÁ÷Áý×ÿèÿÁïØÿÁ×w}Â÷ÁÝÂwÁ÷ÂýuÁßÂwÖÿÁõÂwÃÿÃwÎÿ¿Áÿ¿åÿÁûÁþ«¿Ãÿ¿ÑÿÁÿÂßÂ}ÁÿÁßÁ×ÂÿÂýÁÿ_Á÷ÁýØÿÁÔE_ÂÿÁýÁÿÁßÁýÏÿéÿ¯ÁïÖÿÁßuwÂuÁ÷wÁÝÁ÷wÁ÷ÂýÁ÷ÁßÂ÷×ÿwÅÿÂ÷wÎÿÅÿÁûÉÿÁûñÿ\r\n' +
//    //'BT 7 0 9\r\n' +
//    //'B 128 4 30 102 29 200 ' + MPSNo + '\r\n' +
//    //'T 5 0 38 360 ' + CleintName + '\r\n' +
//    //'T 5 0 28 97 HAWB No.: ' + HAWBNo + '\r\n' +
//    //'T 5 0 28 129 MAWB No.: ' + MAWBNo + '\r\n' +
//    //'T 5 0 324 97 ' + Destination + '\r\n' +
//    //'T 5 0 430 97 ' + IGMNo + '\r\n' +
//    //'T 5 0 28 158 ' + FlightArrivalDate + '\r\n' +
//    //'T 5 0 324 158 ' + FlightArrivalTime + '\r\n' +
//    //'T 5 0 324 129 ' + Pieces + '\r\n' +
//    //'PRINT';

//    //printedData = CleintName + '\t' + '\r' + '\n\n' +
//    //                  'HAWB No.\t:' + '\t' + HAWBNo + '\t\x20' +
//    //                'Dest.:' + Destination + '\t\x20' +
//    //                'IGM No.:' + IGMNo + '\t' + '\r' + '\n\n' +
//    //                   'MAWB No.\t:' + '\t' + MAWBNo + '\t\x20' +
//    //                'Pieces:' + Pieces + '\t' + '\r' + '\n\n' +
//    //                  FlightArrivalDate + '\t\t\x20' + FlightArrivalTime + '\r' + '\n\n\n\n';



//    //printedData = HAWBNo + ',' + Destination + ',' + IGMNo + ',' + MAWBNo + ',' + Pieces + ',' +
//    //    FlightArrivalDate + ',' + FlightArrivalTime + ',' + CleintName

//    //code start connect with printer
//    window.DatecsPrinter.listBluetoothDevices(
//    function (devices) {
//        window.DatecsPrinter.connect(devices[0].address,
//            function () {
//                // printLogo();
//                // alert('connection success');
//                PrintCourierData();
//            },
//            function () {
//                // alert(JSON.stringify(error));
//            }
//        );
//    },
//    function (error) {
//        // alert(JSON.stringify(error));
//    }
//    );
//    //code end connect with printer
//    function printLogo() {
//        var image = new Image();
//        image.onload = function () {
//            var canvas = document.createElement('canvas');
//            canvas.height = 100;
//            canvas.width = 100;
//            var context = canvas.getContext('2d');
//            context.drawImage(image, 0, 0, 100, 100);
//            var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ""); //remove mimetype
//            window.DatecsPrinter.printImage(
//                imageData, //base64
//                canvas.width,
//                canvas.height,
//                1,
//                function () {
//                    PrintCourierData();
//                },
//                function (error) {
//                    alert(JSON.stringify(error));
//                }
//            )
//        };
//        image.src = 'images/PER_LOGO.png';
//        image.src = 'images/MIAL.png';
//    }
//    //code for to print text
//    function PrintCourierData() {
//        // alert('final  ' + printedData)
//        window.DatecsPrinter.printText(printedData2, 'ISO-8859-1',
//            function () {
//                //  alert('print success');
//                // printMyBarcode();
//            }
//        );
//    }
//    //end text print

//    //code for printing a barcode
//    function printMyBarcode() {
//        var c = document.getElementById("myCanvas");
//        var ctx = c.getContext("2d");
//        var img = document.getElementById("barcode3");
//        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, c.width, c.height);     // source rectangle
//        var imageData = c.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, "");

//        window.DatecsPrinter.printImage(
//            imageData, //base64
//            c.width,
//            c.height,
//            1,
//            function () {
//                printMyImageFooterNumber();
//            },
//            function (error) {
//                // alert(JSON.stringify(error));
//            }
//        )

//    }

//    //var LINE_FEED = '\n';
//    //function printfeedPaper() {
//    //    window.DatecsPrinter.printText(LINE_FEED, 'ISO-8859-1',
//    //        function () {
//    //            printMyImageFooterNumber();
//    //        }
//    //    );
//    //}

//    function printMyImageFooterNumber() {
//        var image = new Image();
//        image.onload = function () {
//            var canvas = document.createElement('canvas');
//            canvas.height = 100;
//            canvas.width = 400;
//            var context = canvas.getContext('2d');
//            context.drawImage(image, 0, 0, 400, 100);
//            var imageData = canvas.toDataURL('image/jpeg').replace(/^data:image\/(png|jpg|jpeg);base64,/, ""); //remove mimetype
//            window.DatecsPrinter.printImage(
//                imageData, //base64
//                canvas.width,
//                canvas.height,
//                1,
//                function () {
//                    printfeedPaperforFooter();
//                },
//                function (error) {
//                    alert(JSON.stringify(error));
//                }
//            )
//        };
//        image.src = 'images/KALE.png';
//    }

//    var LINE_FEED1 = '\n\n\n\n\n';
//    function printfeedPaperforFooter() {
//        window.DatecsPrinter.printText(LINE_FEED1, 'ISO-8859-1',
//            function () {

//            }
//        );
//    }

//    document.getElementById("myCanvas").style.display = 'none';


//}



function GetSegerationReportDetails_HHTList() {
    // $('#spnValMsg').text('');
    // $('#ddlHAWB').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";



    if ($('#chkHWABNo').prop('checked')) {

        var text = $('#txtHAWBNo').val();
        ////  let a = text.slice(0, 4);
        //var middle9DigitHAWBNo = text.slice(4, 13);
        //$('#txtHAWBNo').val(middle9DigitHAWBNo);
        strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {

        var id = $('#txtHAWBNo').val();
        var last12Digit = id.substr(id.length - 12); // => "Tabs1"
        $('#txtHAWBNo').val(last12Digit);
        strMode = "M";

    }


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetSegerationReportDetails_HHT",
            data: JSON.stringify({
                'pi_strMode': strMode,
                'pi_strIGMNo': $('#txtIGMNo').val(),
                'pi_strHAWBMpsNo': localStorage.getItem('tempHawbNo'),
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
                //if (response == "") {
                //    //$.alert('Please enter valid IGM No.');
                //    $('#spnValMsg').text('Please enter valid IGM No./ HAWB No.').css('color', 'red');
                //    return;
                //} else {
                //    // $('#spnValMsg').text('');


                //}
                var xmlDoc = $.parseXML(response);

                var countHAWB = $(xmlDoc).find("Table").length;

                if (countHAWB > Number(0)) {

                    $(xmlDoc).find('Table').each(function () {


                        //  _IGMNo = $(this).find('IGMNo').text();
                        _IGMNo = $(this).find('IGMNo').text();
                        _HawbId = $(this).find('HawbId').text();
                        _HawbMpsNo = $(this).find('HawbMpsNo').text();
                        _ManiPkgs = $(this).find('ManiPkgs').text();
                        _ManiGrossWt = $(this).find('ManiGrossWt').text();
                        _RecdPkgs = $(this).find('RecdPkgs').text();
                        _RecdGrossWt = $(this).find('RecdGrossWt').text();
                        _RecdChargableWt = $(this).find('TotalChgWt').text();
                        _TotalChgWt = $(this).find('TotalChgWt').text();
                        _IsShipmentFinalized = $(this).find('IsShipmentFinalized').text();
                        _FlightArriDate = $(this).find('FlightArriDate').text();
                        _DocDate = $(this).find('DocDate').text();
                        _ULDDate = $(this).find('ULDDate').text();
                        _FlightStartDate = $(this).find('FlightStartDate').text();
                        _FlightEndDate = $(this).find('FlightEndDate').text();
                        _IgmYear = $(this).find('IgmYear').text();
                        _Status = $(this).find('Status').text();
                        _PackagingType = $(this).find('PackagingType').text();
                        _Location = $(this).find('Location').text();
                        _DamageRemarks = $(this).find('DamageRemarks').text();
                        _ScannedChrgWt = $(this).find('ScannedChrgWt').text()


                        // $('#txtManifestedPieces').val($(this).find('ManiPkgs').text()).attr('disabled', 'disabled');
                        // $('#txtManifestedGrWt').val($(this).find('ManiGrossWt').text()).attr('disabled', 'disabled');
                        // $('#txtReceivedPieces').val($(this).find('RecdPkgs').text());
                        // $('#txtReceivedGrWt').val($(this).find('RecdGrossWt').text());
                        //  $('#txtTotalChgWt').val($(this).find('TotalChgWt').text());
                        //   $('#txtCommodity').text($(this).find('ULDRecdDate').text());
                        $('#txtPackagingType').val($(this).find('PackagingType').text());
                        $('#txtStatus').val($(this).find('Status').text());
                        $('#txtLocation').val($(this).find('Location').text());
                        $('#txtDmgRemarks').val($(this).find('DamageRemarks').text());

                        _calCharWt = parseFloat(_ManiGrossWt) / parseInt(_ManiPkgs);
                        $('#txtReceivedGrWt').val(parseFloat(_calCharWt).toFixed(3));

                        $('#txtManifestedPieces').val($(this).find('ScannedPkgs').text() + '/' + $(this).find('ManiPkgs').text());
                        $('#txtManifestedGrWt').val(_ScannedChrgWt + '/' + _ManiGrossWt);


                        //if (_IsShipmentFinalized == "false") {
                        //    $("#btnRevoke").attr('disabled', 'disabled');
                        //} else if (_IsShipmentFinalized == "true") {
                        //    $("#btnRevoke").removeAttr('disabled');
                        //}

                        //if (_IsShipmentFinalized == "false") {
                        //    $("#btnSeggrigation").removeAttr('disabled');
                        //} else if (_IsShipmentFinalized == "true") {
                        //    $("#btnSeggrigation").attr('disabled', 'disabled');

                        //}

                        //if (_IsShipmentFinalized == "false") {
                        //    $("#btnFinalize").removeAttr('disabled');
                        //} else if (_IsShipmentFinalized == "true") {
                        //    $("#btnFinalize").attr('disabled', 'disabled');

                        //}
                        $('#txtHAWBNo').val('');
                        $('#txtHAWBNo').focus();

                    });
                    // GetPackageIdBarcodeLabelList_HHT();
                    ExpGetCommodity_forHHT_List();
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



function ExpGetCommodity_forHHT_List() {

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var IGMNo = $('#txtIGMNo').val();
    $('#ddlCommodity').empty();
    //if ($('#txtIGMNo').val() == "") {
    //    errmsg = "Please enter IGM No first";
    //    $.alert(errmsg);
    //    $('#txtAWBNo').val('');
    //    return;
    //}


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "ExpGetCommodity_forHHT",
            data: JSON.stringify({
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
                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function (index) {


                    MC_COMMODITYDESC_C = $(this).find('MC_COMMODITYDESC_C').text();
                    MC_RowId_I = $(this).find('MC_RowId_I').text();
                    MC_CommodityCode_C = $(this).find('MC_CommodityCode_C').text();


                    //if (index == 0 && $("#ddlCommodity").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlCommodity');
                    //}

                    var newOption = $('<option></option>');
                    newOption.val(MC_COMMODITYDESC_C).text(MC_COMMODITYDESC_C);
                    newOption.appendTo('#ddlCommodity');


                });
                GetConfigurationDetails_HHT_List();
            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}



function GetConfigurationDetails_HHT_List() {
    $('#ddlPackagingType').empty();
    $('#ddlStatus').empty();
    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    var IGMNo = $('#txtIGMNo').val();

    //if ($('#txtIGMNo').val() == "") {
    //    errmsg = "Please enter IGM No first";
    //    $.alert(errmsg);
    //    $('#txtAWBNo').val('');
    //    return;
    //}


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetConfigurationDetails_HHT",
            data: JSON.stringify({
                'strType': 'CON',
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
                var xmlDoc = $.parseXML(response);
                $(xmlDoc).find('Table').each(function (index) {


                    ConfigCode = $(this).find('ConfigCode').text();
                    ConfigValueConfigValue = $(this).find('ConfigValue').text();



                    //if (index == 0 && $("#ddlPackagingType").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlPackagingType');
                    //}

                    if (ConfigCode == 'SEGSTATUS') {
                        var newOption = $('<option></option>');
                        newOption.val(ConfigValueConfigValue).text(ConfigValueConfigValue);
                        newOption.appendTo('#ddlStatus');

                        $('#ddlStatus').val(_Status);
                    }


                    //if (index == 0 && $("#ddlStatus").val() != "0") {
                    //    var newOption = $('<option></option>');
                    //    newOption.val(0).text('Select');
                    //    newOption.appendTo('#ddlStatus');
                    //}

                    if (ConfigCode == 'SEGPACKAGINGDETAILS') {
                        var newOption = $('<option></option>');
                        newOption.val(ConfigValueConfigValue).text(ConfigValueConfigValue);
                        newOption.appendTo('#ddlPackagingType');

                        if (_PackagingType != '') {
                            $('#ddlPackagingType').val(_PackagingType);
                        }
                    }

                });

            },
            error: function (msg) {
                $("body").mLoading('hide');
                $.alert('Some error occurred while saving data');
            }
        });
        return false;
    }

}