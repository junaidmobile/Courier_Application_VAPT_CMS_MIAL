﻿
//Celebi UAT service URL below
// var GHAserviceURL = 'http://113.193.225.59:8080/CELEBIHHT/services/hhtimpservices.asmx/';
//var GHAserviceURL = 'http://www.cargocel.in/GHAHHT/Services/HHTImpServices.asmx/';
//var GHAserviceURL = 'http://52.172.181.171/CELEBIGHAHHT/Services/HHTImpServices.asmx/';
//var GHAserviceURL = 'http://113.193.225.59:8080/MABBUAT/Services/HHTImpServices.asmx/';
//var GHAserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';
//var GHAserviceURL = 'http://10.22.2.72:8080/CELEBIBUD/Services/HHTImpServices.asmx/';


//var GHAImportFlightserviceURL = 'http://10.22.2.72:8080/CELEBIBUD/Services/HHTImpServices.asmx/';

// var GHAImportFlightserviceURL = 'http://113.193.225.59:8080/CELEBIHHT/services/hhtimpservices.asmx/';
//var GHAImportFlightserviceURL = 'http://www.cargocel.in/GHAHHT/Services/HHTImpServices.asmx/';
//var GHAImportFlightserviceURL = 'http://104.211.164.207/GALAXY_CMSWebservice/Services/HHTImpServices.asmx/';
//var GHAImportFlightserviceURL = 'http://113.193.225.59:8080/MABBUAT/Services/HHTImpServices.asmx/';
//var GHAImportFlightserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';
// var GHAImportFlightserviceURL = 'http://10.22.2.71:8080/CELEBIHHT/Services/HHTImpServices.asmx/';

// var GHAExportFlightserviceURL = 'http://113.193.225.59:8080/CELEBIHHT/services/hhtexpservices.asmx/';
//var GHAExportFlightserviceURL = 'http://www.cargocel.in/GHAHHT/Services/HHTExpServices.asmx/';
//var GHAExportFlightserviceURL = 'http://52.172.181.171/CELEBIGHAHHT/Services/HHTExpServices.asmx/';
//var GHAExportFlightserviceURL = 'http://113.193.225.59:8080/MABBUAT/Services/HHTExpServices.asmx/';
//var GHAExportFlightserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';
// var GHAExportFlightserviceURL = 'http://10.22.2.71:8080/CELEBIHHT/Services/HHTExpServices.asmx/';



//var CMSserviceURL = 'http://10.22.3.232/GmaxCMSWebservice/CMS_WS_PDA.asmx/';
//var CMSserviceURL = 'http://113.193.225.59:8080/CELEBIHHTCMS_New/CMS_WS_PDA.asmx/';
//var CMSserviceURL = 'http://52.172.181.171/CELEBICMSHHT/CMS_WS_PDA.asmx/';
//var CMSserviceURL = 'http://10.22.3.165/ProductCMSWebservice/CMS_WS_PDA.asmx/';

//var CMSserviceURL = 'https://galaxytest.kalelogistics.com/GalaxyINTMABBHHTWS/CMS_WS_pda.asmx/';
//var CMSserviceURL = 'https://mabbuat.kalelogistics.com/GalaxyINTMABBWS/CMS_WS_pda.asmx/';


 //var GHAserviceURL = 'http://113.193.225.59:8080/MABBUAT/Services/HHTImpServices.asmx/';
 //var GHAImportFlightserviceURL = 'http://113.193.225.59:8080/MABBUAT/Services/HHTImpServices.asmx/';
 //var GHAExportFlightserviceURL = 'http://113.193.225.59:8080/MABBUAT/Services/HHTExpServices.asmx/';
 //var CMSserviceURL = 'https://galaxytest.kalelogistics.com/GalaxyINTMABBHHTWS/CMS_WS_pda.asmx/';



//var GHAserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';
//var GHAImportFlightserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';
//var GHAExportFlightserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTExpServices.asmx/';
//var CMSserviceURL = 'https://mabbuat.kalelogistics.com/GalaxyINTQAHHTWS/cms_ws_pda.asmx/';
//var CMSserviceURL = 'https://mabbuat.kalelogistics.com/GalaxyINTMABBWS/CMS_WS_pda.asmx/';

var GHAserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';
var GHAImportFlightserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';
var GHAExportFlightserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTExpServices.asmx/';
var CMSserviceURL = 'https://mabbuat.kalelogistics.com/GalaxyINTQAHHTWS/cms_ws_pda.asmx/';

//var CMSserviceURL = 'http://52.172.189.217/CELEBIHHTCMS/CMS_WS_PDA.asmx/';
//var CMSserviceURL = 'http://10.0.1.7/CELEBIHHTCMS/CMS_WS_PDA.asmx/';
//var CMSserviceURL = 'http://10.22.2.71:8080/CELEBIHHT/CMS_WS_PDA.asmx/';


var deviceUUID;
var encryptedUUID;
document.addEventListener("deviceready", SetRememberLogin, false);
document.addEventListener("backbutton", exitFromApp, false);

//https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTExpServices.asmx
//https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx
//https://mabbuat.kalelogistics.com/GalaxyINTMABBWS/CMS_WS_pda.asmx



$(function () {
    //$(":text").addClear();
    //$(":password").addClear();
    //$('input[type=text]').addClear();
    //$('input[type=password]').addClear();
    if (typeof (MSApp) !== "undefined") {
        MSApp.execUnsafeLocalFunction(function () {
            //$('input[type=text]').addClear();
            //$('input[type=password]').addClear();
        });
    } else {
        $('input[type=text]').addClear();
        $('input[type=password]').addClear();
    }

    clearStorageExcept(['UserName', 'Password', 'IsRememberChecked']);

    SetRememberLogin();
});


function ProcessLogin1() {

    //window.localStorage.setItem("UserID", '1');
    //window.localStorage.setItem("UserName", 'kale');
    //window.localStorage.setItem("companyCode", 'BUD');
    //window.localStorage.setItem("SHED_AIRPORT_CITY", 'BUD');
    //window.localStorage.setItem("SHED_CODE", 'BUD');

    //window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
    //window.localStorage.setItem("GHAImportFlightserviceURL", GHAImportFlightserviceURL);
    //window.localStorage.setItem("GHAExportFlightserviceURL", GHAExportFlightserviceURL);
    ////window.localStorage.setItem("CargoWorksServiceURL", CargoWorksServiceURL);
    //window.localStorage.setItem("CMSserviceURL", CMSserviceURL);
    //window.localStorage.setItem("CMSserviceURL", CMSserviceURL);

    //window.location = "GalaxyHome.html";

}

function ProcessLogin() {
    //window.location = "GalaxyHome.html";
    //return;

    var errmsg = "";
    var Uname = $('#txtUserName').val();
    var Pass = $('#txtPassword').val();

    window.localStorage.setItem("Uname", Uname);

    var connectionStatus = navigator.onLine ? 'online' : 'offline'

    if (Uname == null || Uname == "") {
        errmsg = errmsg + 'Please enter user id.<br/>';
        $.alert(errmsg);
        HideLoader();
        return;
    }

    if (Pass == null || Pass == "") {
        errmsg = errmsg + 'Please enter password.';
        $.alert(errmsg);
        HideLoader();
        return;
    }


    //  SetLoginRolesRights(Uname);

    if (Uname != null && Uname != "" && Pass != null && Pass != "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "GetLoginUserDetails",
            data: JSON.stringify({ 'LoginName': Uname, 'Password': Pass }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                console.log('Details got via login: ', response);
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {

                    var xmlDoc = $.parseXML(str);
                    console.log('Details got via login: ', xmlDoc);
                    $(xmlDoc).find('Table').each(function (index) {
                        window.localStorage.setItem("UserID", $(this).find('Userid').text());
                        window.localStorage.setItem("UserName", $(this).find('User_Name').text());
                        window.localStorage.setItem("companyCode", $(this).find('CompanyCode').text());
                        window.localStorage.setItem("SHED_AIRPORT_CITY", $(this).find('SHED_AIRPORT_CITY').text());
                        window.localStorage.setItem("SHED_CODE", $(this).find('SHED_CODE').text());

                        window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
                        window.localStorage.setItem("GHAImportFlightserviceURL", GHAImportFlightserviceURL);
                        window.localStorage.setItem("GHAExportFlightserviceURL", GHAExportFlightserviceURL);
                        //window.localStorage.setItem("CargoWorksServiceURL", CargoWorksServiceURL);
                        window.localStorage.setItem("CMSserviceURL", CMSserviceURL);
                        window.localStorage.setItem("CMSserviceURL", CMSserviceURL);

                        window.location = "GalaxyHome.html";
                    });

                }
                else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and/or password.';
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                HideLoader();
                //var r = jQuery.parseJSON(msg.responseText);
                //alert("Message: " + r.Message);
                $.alert("Login failed due to some error");
            }
        });


        //window.location = "GalaxyHome.html";

        //if (Uname == "VENKATAS" && Pass == "123") {
        //    window.location = "GalaxyHome.html";
        //}
    }
    else if (connectionStatus == "offline") {
        HideLoader();
        $.alert('No Internet Connection!');
    }
    if (errmsg != "") {
        HideLoader();
        $.alert(errmsg);
    }
}

function clearALL() {
    $('#txtUserName').val('');
    $('#txtPassword').val('');
}

function RememberCheck() {
    if ($('#chkRemember').is(':checked')) {
        var UserName = $('#txtUserName').val();
        var PassWord = $('#txtPassword').val();
        window.localStorage.setItem("UserName", UserName);
        window.localStorage.setItem("Password", PassWord);
        window.localStorage.setItem("IsRememberChecked", "true");
    }
    else {
        window.localStorage.setItem("UserName", "");
        window.localStorage.setItem("Password", "");
        window.localStorage.setItem("IsRememberChecked", "false");
    }
}

function SetRememberLogin() {
    var U = window.localStorage.getItem("UserName");
    var P = window.localStorage.getItem("Password");
    var R = window.localStorage.getItem("IsRememberChecked");
    if (R != null && R == "true") {
        $('#chkRemember').prop("checked", true);
    }
    else {
        $('#chkRemember').prop("checked", false);
    }
    if (U != null && U != "") {
        $('#txtUserName').val(U);
    }
    if (P != null && P != "") {
        $('#txtPassword').val(P);
    }

    var connectionStatus = navigator.onLine ? 'online' : 'offline'
    if (connectionStatus == 'offline') {
        $.alert('No Internet Connection!');
        setInterval(function () {
            connectionStatus = navigator.onLine ? 'online' : 'offline';
            if (connectionStatus == 'online') {
            }
            else {
                $.tips('You are offline. Please contact Admin.');
            }
        }, 3000);
    }
}

function SetLoginRolesRights() {

    var Username = $('#txtUserName').val();

    if (Username != null && Username != "") {
        $.ajax({
            type: 'POST',
            timeout: 6000,
            async: false,
            url: CMSserviceURL + "GetHHTUserRolesRightsForLoginId_PDA",
            data: JSON.stringify({ 'pi_strLoginId': Username }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",

            //type: 'POST',
            //timeout: 4000,
            //url: CMSserviceURL + "GetHHTUserRolesRightsForLoginId_PDA",
            //dataType: "text",
            //async: false,
            //crossDomain: true,
            //data: "pi_strLoginId=" + Username,
            success: function (response) {
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('Table').each(function (index) {

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HVTX') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpDashboard", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpDashboard", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HVTM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpVehicleTracking", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpVehicleTracking", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HTDM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpTDG", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpTDG", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HEBI') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpBinning", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpBinning", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HEIM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpIntlMvmt", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpIntlMvmt", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HUNI') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpUnitization", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpUnitization", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HARM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpAirsideRelease", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpAirsideRelease", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HEQM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpExportsQuery", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpExportsQuery", '0');
                        }

                        if ($(this).find('Module').text() == 'EXPORTS' && $(this).find('PermissionCode').text() == 'HVCT') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleExpVCTCheck", '1');
                            }
                            else
                                window.localStorage.setItem("RoleExpVCTCheck", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HFLTX') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleImpDashboard", '1');
                            }
                            else
                                window.localStorage.setItem("RoleImpDashboard", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HFLTC') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPFlightCheck", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPFlightCheck", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HSEG') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPSegregation", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPSegregation", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HIBIN') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPBinning", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPBinning", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HIIM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPIntlMvmt", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPIntlMvmt", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'HFBM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPFwdBkd", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPFwdBkd", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'FDM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPFinalDelivery", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPFinalDelivery", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'IQM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPImportQuery", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPImportQuery", '0');
                        }

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'IDUM') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPDocUpload", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPDocUpload", '0');
                        }

                    });

                }
                else {
                    HideLoader();
                    errmsg = errmsg + 'Invalid username and/or password.';
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                HideLoader();
                //var r = jQuery.parseJSON(msg.responseText);
                //alert("Message: " + r.Message);                
            }
        });


        //window.location = "GalaxyHome.html";

        //if (Uname == "VENKATAS" && Pass == "123") {
        //    window.location = "GalaxyHome.html";
        //}
    }

}

function exitFromApp() {
    //console.log("in button");
    clearStorageExcept(['UserName', 'Password', 'IsRememberChecked']);
    navigator.app.exitApp();
}

function onCreateAWB() {
    window.location = "ExpCreateAWB.html";
}
function onSearchAWB() {
    window.location = "ExpSearchAWB.html";
}
function onFlightCheck() {
    window.location = "IMP_FlightCheck.html";
}
function onIMPShipmentLoc() {
    window.location = "IMP_ShipmentLocation.html";
}

clearStorageExcept = function (exceptions) {
    var storage = localStorage;
    var keys = [];
    var exceptions = [].concat(exceptions); //prevent undefined

    //get storage keys
    $.each(localStorage, function (key, val) {
        keys.push(key);
    });

    //loop through keys
    for (i = 0; i < keys.length; i++) {
        var key = keys[i];
        var deleteItem = true;

        //check if key excluded
        for (j = 0; j < exceptions.length; j++) {
            var exception = exceptions[j];
            if (key == exception) {
                deleteItem = false;
            }
        }

        //delete key
        if (deleteItem) {
            localStorage.removeItem(key);
        }
    }
}
