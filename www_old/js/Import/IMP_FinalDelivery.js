
var GHAImportFlightserviceURL = window.localStorage.getItem("GHAImportFlightserviceURL");

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
var HAWBId;
var MId;
var PkgType;
var MNo;
var LocId;
var MPSId = '0';
var ifMPSId;
var _gatePassNo;
var _HawbIDcome;
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

    if (window.localStorage.getItem("RoleIMPFinalDelivery") == '0') {
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
            $('#lblCTM').hide();
            $('#txtHAWBNo').focus();
            $('#txtHAWBNo').val('');


        }

    });


    $('#chkMPSNo').click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $('#lblHAWBNO').hide();
            $('#lblmpsno').show();
            $('#lblCTM').hide();
            $('#txtHAWBNo').focus();
            $('#txtHAWBNo').val('');
            $('#txtPieces').val('');
            $('#txtTotPkgs').val('');
            $('#txtMovePkgs').val('');
        }

    });

    $('#chkCTMNo').click(function () {
        var checked = $(this).attr('checked', true);
        if (checked) {
            $('#lblHAWBNO').hide();
            $('#lblmpsno').hide();
            $('#lblCTM').show();
            
            $('#txtHAWBNo').focus();
            $('#txtHAWBNo').val('');
            $('#txtPieces').val('');
            $('#txtTotPkgs').val('');
            $('#txtMovePkgs').val('');
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

    $('#ddlGatePassNo').empty();
    $('#txtPieces').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');

    if ($('#txtHAWBNo').val() == '') {
        $('#spnErrorMsg').text('Please enter HAWB No./MPS No./CTM').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#chkHWABNo').prop('checked')) {

        strType = "C";
        // strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {

        strType = "I";
        // strMode = "H";

    }

    if ($('#chkCTMNo').prop('checked')) {

        strType = "T";
        //strMode = "H";

    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",
            url: GHAImportFlightserviceURL + "GetImpGPNoForDelivery_HHT",
            data: JSON.stringify({

                "pi_strType": 'N',
                "pi_strMode": strType,
                "pi_strHAWBNo": $('#txtHAWBNo').val(),
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

                // clearBeforePopulate();
                var xmlDoc = $.parseXML(str);
            
                $(xmlDoc).find('Table').each(function (index) {
                    // if (index == 0) {

                    GPId = $(this).find('GPId').text();
                    HAWBId = $(this).find('HAWBId').text();
                    GPNo = $(this).find('GPNo').text();
                    MAWBNo = $(this).find('MAWBNo').text();
                    HAWBNo = $(this).find('HAWBNo').text();
                    HAWBId = $(this).find('HAWBId').text();

                    //                 <GPId>729871</GPId>
                    //<HAWBId>923846</HAWBId>
                    //<GPNo>G2201180228</GPNo>
                    //<MAWBNo>12560412424</MAWBNo>
                    //<HAWBNo>6977920095</HAWBNo>
                    //<IsDelivered>true</IsDelivered>

                    if (index == 0 && $("#ddlGatePassNo").val() != "0") {
                        var newOption = $('<option></option>');
                        newOption.val(0).text('Select');
                        newOption.appendTo('#ddlGatePassNo');
                    }

                    var newOption = $('<option></option>');
                    newOption.val(GPNo + ',' + HAWBId).text(GPNo + ' ( ' + MAWBNo + ' )');
                    newOption.appendTo('#ddlGatePassNo');

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

    $('#ddlGatePassNo').empty();

    var newOption = $('<option></option>');
    newOption.val(0).text('Select');
    newOption.appendTo('#ddlGatePassNo');


    $('#txtHAWBNo').val('');
    $('#txtPieces').val('');
    $('#txtTotPkgs').val('');
    $('#txtMovePkgs').val('');
    $('#txtNewLoc').val('');
    $('#txtPkgType').val('');

    $('#spnErrorMsg').text('');


}

function getDataOnChangeOfMAWBNo(GPNoHAWBno) {

    _gatePassNo = GPNoHAWBno.split(",")[0];
    _HawbIDcome = GPNoHAWBno.split(",")[1];

    if (GPNo == '0') {
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
            url: GHAImportFlightserviceURL + "GetImpGPDetailsforDelivery_HHT_New",
            data: JSON.stringify({
                "pi_intHAWBId": _HawbIDcome,
                "pi_strGPNo": _gatePassNo,
                "pi_Mode": strType,
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

                        GPId = $(this).find('GPId').text();
                        GPNo = $(this).find('GPNo').text();
                        GPPieces = $(this).find('GPPieces').text();
                        TotGPPieces = $(this).find('TotGPPieces').text();
                        TotDlvdPieces = $(this).find('TotDlvdPieces').text();
                        GPStatus = $(this).find('GPStatus').text();
                        Column1 = $(this).find('PkgType').text();


                        // $('#txtPieces').val(GPPieces);

                        if ($('#chkHWABNo').prop('checked')) {
                            calculatedHAWBPcs = parseInt(TotGPPieces) - parseInt(TotDlvdPieces);
                            $('#txtPieces').val(calculatedHAWBPcs);

                        } else {
                            $('#txtPieces').val(GPPieces);
                        }

                        $('#txtTotPkgs').val(TotGPPieces);
                        $('#txtMovePkgs').val(TotDlvdPieces);


                        GPStatus = $(this).find('GPStatus').text();

                        if (GPStatus != '') {
                            $('#spnErrorMsg').text('Status: ' + GPStatus).css('color', 'green');
                            return;
                        } else {
                            $('#spnErrorMsg').text('');
                        }
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
    $('#txtBinningPkgs').val('');
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

function saveGatePassDetails() {


    if ($('#txtHAWBNo').val() == '') {
        $('#spnErrorMsg').text('Please enter HAWB No./MPS No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }

    if ($('#ddlGatePassNo').val() == '0') {
        $('#spnErrorMsg').text('Please select gate pass No.').css('color', 'red');
        return;
    } else {
        $('#spnErrorMsg').text('');
    }



    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    var errmsg = "";

    if ($('#chkHWABNo').prop('checked')) {

        strType = "C";
        // strMode = "H";
    }

    if ($('#chkMPSNo').prop('checked')) {

        strType = "I";
        // strMode = "H";

    }

    if ($('#chkCTMNo').prop('checked')) {

        strType = "T";
        //strMode = "H";

    }

    if (errmsg == "" && connectionStatus == "online") {
        $.ajax({
            type: "POST",


            url: GHAImportFlightserviceURL + "GetImpRecordGoodsDelivery_HHT",
            data: JSON.stringify({
                'pi_intHAWBId': _HawbIDcome,
                'pi_strGPNo':_gatePassNo ,
                'pi_strUserId': UserName,
                'pi_Mode': strType,
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
                        if (Output == "Gate pass is already delivered.") {
                            $('#spnErrorMsg').text(Output).css('color', 'red');
                            $('#txtHAWBNo').val('');
                            $('#txtHAWBNo').focus();
                            return;
                        } else {
                            $('#spnErrorMsg').text(Output).css('color', 'green');
                            return;
                        }



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

