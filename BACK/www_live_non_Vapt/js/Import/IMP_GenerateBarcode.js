

var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");
var CMSserviceURL = window.localStorage.getItem("CMSserviceURL");
var AirportCity = window.localStorage.getItem("SHED_AIRPORT_CITY");
var UserId = window.localStorage.getItem("UserID");
var UserName = window.localStorage.getItem("UserName");
var html;
var LocationRowID;
var AWBRowID;
var HAWBId;
var inputRowsforLocation = "";
var _ULDFltSeqNo;
var formatedDataofPRN;
var _calCharWt;
var Barcode_PRN_Values;
var _HAWBNo;
var isMPS = '0';

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

    if (window.localStorage.getItem("RoleIMPRePrint") == '0') {
        window.location.href = 'IMP_Dashboard.html';
    }


    //var formattedDate = new Date();
    //var d = formattedDate.getDate();
    //if (d.toString().length < Number(2))
    //    d = '0' + d;
    //var m = formattedDate.getMonth();
    //m += 1;  // JavaScript months are 0-11
    //if (m.toString().length < Number(2))
    //    m = '0' + m;
    //var y = formattedDate.getFullYear();
    //var t = formattedDate.getTime();
    //var date = m.toString() + '/' + d.toString() + '/' + y.toString();

    //newDate = y.toString() + '-' + m.toString() + '-' + d.toString();
    //$('#txtFlightDate').val(newDate);

    //var h = date.getHours();
    //var m = date.getMinutes();
    //var s = date.getSeconds();


    //$('#chkHWABNo').click(function () {
    //    var checked = $(this).attr('checked', true);
    //    if (checked) {
    //        $('#lblHAWBNO').show();
    //        $('#lblmpsno').hide();
    //        $('#txtHAWBNo').focus();
    //        $('#txtHAWBNo').val('');
    //        clearBeforePopulate();
    //        isMPS == false;
    //    }

    //});


    //$('#chkMPSNo').click(function () {
    //    var checked = $(this).attr('checked', true);
    //    if (checked) {
    //        $('#lblHAWBNO').hide();
    //        $('#lblmpsno').show();
    //        $('#txtHAWBNo').focus();
    //        $('#txtHAWBNo').val('');
    //        clearBeforePopulate();
    //        isMPS == true;
    //    }

    //});

    GetBarcodeSettings_HHT();

});

function onchangeRDB() {
    if ($('#chkHWABNo').prop('checked')) {
        isMPS = '0';
        $('#lblIHAWBNo').show();
        $('#lblIMPSNo').hide();
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();
        clearBeforePopulate();
    }

    if ($('#chkMPSNo').prop('checked')) {
        isMPS = '1';
        $('#txtHAWBNo').val('');
        $('#txtHAWBNo').focus();
        $('#lblIHAWBNo').hide();
        $('#lblIMPSNo').show();
        clearBeforePopulate();
    }
}

function checkLocation() {
    var location = $('#txtLocation').val();
    if (location == "") {
        //errmsg = "Please scan/enter location.";
        //$.alert(errmsg);
        $("#spnMsg").text('Please scan/enter location.').css({ 'color': 'red' });

        return;
    } else {
        $('#txtSacnULD').focus();
        $("#spnMsg").text('');
    }
}

function searchMPSHAWBNumbers() {
    // alert('in scan function')
    if ($('#txtHAWBNo').val() == "") {
        return;
    }

    if (isMPS == '1') {
        GetPackageIdBarcodeLabelList_HHTMPSWise();
        return;

    }

    if (isMPS == '0') {
        GetPackageIdBarcodeLabelList_HHT();
        return;

    }
}

function GetPackageIdBarcodeLabelList_HHT() {

    if ($('#txtHAWBNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        // $('#spnValMsg').text("Please enter HAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }
    $('#ddlMAWBNo').empty();

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var txtGatePassScanNo = $('#txtGatePassScanNo').val().toUpperCase();


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetPackageIdBarcodeLabelList_HHT",
            data: JSON.stringify({
                'strMPSNo': '',
                'intHAWBId': '0',
                'strMAWBNO': '',
                'strHAWBNO': $('#txtHAWBNo').val(),
                'intIGMNo': '0',
                'intIGMYear': '0',
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                $('#divVCTDetail').html('');
                $('#divVCTDetail').empty();

                var StrMessage;
                if (response != null && response != "") {
                    $(xmlDoc).find('Table').each(function (index) {

                        _HAWBNo = $(this).find('HAWBNo').text();
                        MAWBNo = $(this).find('MAWBNo').text();
                        MAWBId = $(this).find('MAWBId').text();


                        if (index == 0 && $("#ddlMAWBNo").val() != "0") {
                            var newOption = $('<option></option>');
                            newOption.val(0).text('Select');
                            newOption.appendTo('#ddlMAWBNo');
                        }

                        var newOption = $('<option></option>');
                        newOption.val(MAWBNo).text(MAWBNo);
                        newOption.appendTo('#ddlMAWBNo');

                    });
                } else {
                    //errmsg = 'Data not found.';
                    //$.alert(errmsg);
                    $('#spnValMsg').text("Data not found.").css('color', 'red');
                }

            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }

}


function GetPackageIdBarcodeLabelList_HHTOnChangeHAWBNo(AWBNO) {

    if ($('#txtHAWBNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        // $('#spnValMsg').text("Please enter HAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var txtGatePassScanNo = $('#txtGatePassScanNo').val().toUpperCase();


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetPackageIdBarcodeLabelList_HHT",
            data: JSON.stringify({
                'strMPSNo': '',
                'intHAWBId': '0',
                'strMAWBNO': AWBNO,
                'strHAWBNO': $('#txtHAWBNo').val(),
                'intIGMNo': '0',
                'intIGMYear': '0',
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                $('#divVCTDetail').html('');
                $('#divVCTDetail').empty();

                var StrMessage;
                $(xmlDoc).find('Table').each(function () {

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



                });

                if (response != null && response != "") {

                    html = '';

                    html += '<table id="tblPAckageIDs" class="table table-bordered table-striped">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Package ID</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Package Count</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Action</th>';
                    //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Remarks</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
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

                        fnPackageIDList(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId);


                    });
                    html += "</tbody></table>";

                    $('#divVCTDetail').append(html);



                } else {
                    //errmsg = 'Data not found.';
                    //$.alert(errmsg);
                    $('#spnValMsg').text("Data not found.").css('color', 'red');
                }
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }

}



function GetPackageIdBarcodeLabelList_HHTOnClick() {

    if ($('#txtHAWBNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter HAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }

    if ($('#chkMPSNo').prop('checked')) {
        GetPackageIdBarcodeLabelList_HHTMPSWise();
        return;
    }

    if ($('#ddlMAWBNo').val() == "0") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please select AWB No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var txtGatePassScanNo = $('#txtGatePassScanNo').val().toUpperCase();


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetPackageIdBarcodeLabelList_HHT",
            data: JSON.stringify({
                'strMPSNo': '',
                'intHAWBId': '0',
                'strMAWBNO': $('#ddlMAWBNo').val(),
                'strHAWBNO': _HAWBNo,
                'intIGMNo': '0',
                'intIGMYear': '0',
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                $('#divVCTDetail').html('');
                $('#divVCTDetail').empty();

                var StrMessage;
                $(xmlDoc).find('Table').each(function () {

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



                });

                if (response != null && response != "") {

                    html = '';

                    html += '<table id="tblPAckageIDs" class="table table-bordered table-striped">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Package ID</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Package Count</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Action</th>';
                    //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Remarks</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
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

                        fnPackageIDList(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId);


                    });
                    html += "</tbody></table>";

                    $('#divVCTDetail').append(html);



                } else {
                    //errmsg = 'Data not found.';
                    //$.alert(errmsg);
                    $('#spnValMsg').text("Data not found.").css('color', 'red');
                }
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }

}


function GetPackageIdBarcodeLabelList_HHTMPSWise() {

    if ($('#txtHAWBNo').val() == "") {
        //errmsg = "Please enter IGM No first";
        //$.alert(errmsg);
        $('#spnValMsg').text("Please enter HAWB No.").css('color', 'red');

        return;
    } else {
        $('#spnValMsg').text("");
    }




    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    var errmsg = "";

    // var txtGatePassScanNo = $('#txtGatePassScanNo').val().toUpperCase();


    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetPackageIdBarcodeLabelList_HHT",
            data: JSON.stringify({
                'strMPSNo': $('#txtHAWBNo').val(),
                'intHAWBId': '0',
                'strMAWBNO': '',
                'strHAWBNO': '',
                'intIGMNo': '0',
                'intIGMYear': '0',
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
                //var str = response.d;
                var xmlDoc = $.parseXML(response);

                $('#divVCTDetail').html('');
                $('#divVCTDetail').empty();

                var StrMessage;
                $(xmlDoc).find('Table').each(function () {

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



                });

                if (response != null && response != "") {

                    html = '';

                    html += '<table id="tblPAckageIDs" class="table table-bordered table-striped">';
                    html += '<thead>';
                    html += '<tr>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Package ID</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Package Count</th>';
                    html += '<th height="30" style="background-color:rgb(208, 225, 244);" >Action</th>';
                    //html += '<th height="30" style="background-color:rgb(208, 225, 244);padding: 3px 3px 3px 0px;font-size:14px" align="center" font-weight:bold">Remarks</th>';
                    html += '</tr>';
                    html += '</thead>';
                    html += '<tbody>';

                    var xmlDoc = $.parseXML(response);
                    var flag = '0';
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

                        fnPackageIDList(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId);


                    });
                    html += "</tbody></table>";

                    $('#divVCTDetail').append(html);



                } else {
                    //errmsg = 'Data not found.';
                    //$.alert(errmsg);
                    $('#spnValMsg').text("Data not found.").css('color', 'red');
                }
            },
            error: function (msg) {
                //debugger;
                $("body").mLoading('hide');
                var r = jQuery.parseJSON(msg.responseText);
                $.alert(r.Message);
            }
        });
    } else if (connectionStatus == "offline") {
        $("body").mLoading('hide');
        $.alert('No Internet Connection!');
    } else if (errmsg != "") {
        $("body").mLoading('hide');
        $.alert(errmsg);
    } else {
        $("body").mLoading('hide');
    }

}

function fnPackageIDList(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId) {
    if (PackageId != '') {
        html += '<tr>';
        html += '<td style="background: rgb(224, 243, 215);">' + PackageId + '</td>';
        html += '<td style="background: rgb(224, 243, 215);">' + PkgOfPkgCount + '</td>';
        html += '<td style="background: rgb(224, 243, 215);">  <a style="text-align: center;argin-left: 5px;background-color: #065da1;color: #fff;" type="button" onclick="getFormatedPRNText(\'' + HAWBNo + '\',\'' + Destination + '\',\'' + IGMNo + '\',\'' + MAWBNo + '\',\'' + PkgOfPkgCount + '\',\'' + FlightArrivalDate + '\',\'' + FlightArrivalTime + '\',\'' + CleintName + '\',\'' + MPSNo + '\',\'' + PackageId + '\');"class=" form-control glyphicon glyphicon-print"></a></td>';
        //html += '<td style="background: rgb(224, 243, 215);padding-left: 4px;font-size:14px;text-align:right;padding-right: 4px;">' + Remarks + '</td>';
        html += '</tr>';
    }
}




function clearBeforePopulate() {
    $('#ddlMAWBNo').empty();
    $('#txtHAWBNo').val('');
    $('#divVCTDetail').empty();
    $('#spnValMsg').text('');
    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlMAWBNo');
    // $('#btnGoodsDelever').attr('disabled', 'disabled');
}




function ClearError(ID) {
    $("#" + ID).css("background-color", "#e7ffb5");
}


function getFormatedPRNText(HAWBNo, Destination, IGMNo, MAWBNo, Pieces, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId) {



    formatedDataofPRN = Barcode_PRN_Values;

    formatedDataofPRN = formatedDataofPRN.replace('xPkgIDBarx', PackageId);
    formatedDataofPRN = formatedDataofPRN.replace('xPkgIDlblx', PackageId);
    formatedDataofPRN = formatedDataofPRN.replace('xClientNamex', CleintName);
    formatedDataofPRN = formatedDataofPRN.replace('xHAWBNox', HAWBNo);
    formatedDataofPRN = formatedDataofPRN.replace('xMAWBNox', MAWBNo);
    formatedDataofPRN = formatedDataofPRN.replace('xDestx', Destination);
    formatedDataofPRN = formatedDataofPRN.replace('xIGMNox', IGMNo);
    formatedDataofPRN = formatedDataofPRN.replace('xFlitArrDatex', FlightArrivalDate);
    formatedDataofPRN = formatedDataofPRN.replace('xFlitArrTimex', FlightArrivalTime);
    formatedDataofPRN = formatedDataofPRN.replace('xPkgx', Pieces);
    formatedDataofPRN = formatedDataofPRN.replace('xMPSNox', MPSNo);


    //// formatedDataofPRN += formatedDataofPRN;
    //var printCopyVal = $('#txtPrintCopy').val();
    //// console.log(printCopyVal)
    //for (var i = 0; i < parseInt(printCopyVal); i++) {
    //    console.log(i)
    //}

    if ($('#txtPrintCopy').val() == '') {
        $.alert('Please enter No of copy');
        return;
    }

    if ($('#txtPrintCopy').val().match(/^0/)) {
        $('#txtPrintCopy').val('');
        $.alert('Please enter correct value');
        return;
    }

    finalPRintingSlip();

    //for (let i = 0; i < value; i++) {
    //    console.log(i)
    //    finalPRintingSlip();
    //}
    // 

    // return formatedDataofPRN;




    //  formatedDataofPRN = formatedDataofPRN + '\r\n' + getFormatedPRNText(HAWBNo, Destination, IGMNo, MAWBNo, PkgOfPkgCount, FlightArrivalDate, FlightArrivalTime, CleintName, MPSNo, PackageId);
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
       
        // alert('final  ' + printedData)
        // print on condition 04102023 window.DatecsPrinter.printText(formatedDataofPRN + '\r\n' + formatedDataofPRN, 'ISO-8859-1',
        window.DatecsPrinter.printText(formatedDataofPRN, 'ISO-8859-1',
            function () {

                //  alert('print success');
                // printMyBarcode();
            }
        );
    }
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