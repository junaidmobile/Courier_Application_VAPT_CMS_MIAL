
//var GHAserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx/';

//UAT
//var GHAImportFlightserviceURL = 'http://104.211.161.151/Courierhht/HHTService.asmx/';


//Live
///var GHAImportFlightserviceURL = 'https://mialcargo.adaniairports.com/courierhht_new/hhtservice.asmx/';

//CSC UAT
//var GHAImportFlightserviceURL = 'http://104.211.161.151/CourierHHT/HHTService.asmx/';

//Non VAPT
//var GHAImportFlightserviceURL = 'https://adaniuat.kalelogistics.com/CourierHHT/HHTService.asmx/';

//VAPT UAT
//var GHAImportFlightserviceURL = 'https://adaniuat.kalelogistics.com/CourierHHT/HHTServiceVAPT.asmx/';
//Live
var GHAImportFlightserviceURL = 'https://adani.kalelogistics.com/CourierHHT/HHTServiceVAPT.asmx/';


//var GHAExportFlightserviceURL = 'https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTExpServices.asmx/';
//var CMSserviceURL = 'https://mabbuat.kalelogistics.com/GalaxyINTQAHHTWS/cms_ws_pda.asmx/';

var finalMac;
var deviceUUID;
var encryptedUUID;
document.addEventListener("deviceready", SetRememberLogin, false);
document.addEventListener("backbutton", exitFromApp, false);

//https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTExpServices.asmx
//https://mabbuat.kalelogistics.com/MABBUAT/Services/HHTimpServices.asmx
//https://mabbuat.kalelogistics.com/GalaxyINTMABBWS/CMS_WS_pda.asmx



$(function () {

    var _deviceUUID = 'cdebd2ec7da49740';

    EncryptPasswordUUID(_deviceUUID);
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
    createCaptcha();
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

function EncryptPasswordUUID(_deviceUUID) {
    var rndnoKey = '';
    for (var i = 0; rndnoKey.length < 16; ++i) {
        rndnoKey += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAKey = btoa(rndnoKey);
    var rndnoIv = '';
    for (var i = 0; rndnoIv.length < 16; ++i) {
        rndnoIv += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAIv = btoa(rndnoIv);
    var duuid = _deviceUUID;
    var key = CryptoJS.enc.Utf8.parse(rndnoKey);
    var iv = CryptoJS.enc.Utf8.parse(rndnoIv);
    if (duuid != '') {
        var encryptedpassword = EncryptPwdWithKeyUUID(duuid, key, iv);
    } else { }
    // ProcessLogin(encryptedpassword, encodedStringBtoAKey, encodedStringBtoAIv)
    return false;
}

function EncryptPwdWithKeyUUID(duuid, key, iv) {

    if (duuid != '') {
        encryptedUUID = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(duuid), key, {
            keySize: 128 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });
        duuid = '';
        _UUID = encryptedUUID.toString();

        window.localStorage.setItem("deviceUUID", _UUID);
        deviceUUID = window.localStorage.getItem("deviceUUID");
        return encryptedUUID;
    }
}

var code;

function createCaptcha() {
    //clear the contents of captcha div first
    document.getElementById("captcha").innerHTML = "";
    var charsArray =
        "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 6;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
        //below code will not allow Repetition of Characters
        var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
        if (captcha.indexOf(charsArray[index]) == -1)
            captcha.push(charsArray[index]);
        else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 140;
    canv.height = 40;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Georgia";

    ctx.textAlign = "20";
    ctx.strokeText(captcha.join(""), 0, 30);

    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    code = captcha.join("");
    document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
}

function validateCaptcha() {
    var Uname = $("#txtUserName").val();
    var Pass = $("#txtPassword").val();
    var errmsg = "";
    if (Uname == null || Uname == "") {
        errmsg = "Please enter User ID.";
        $.alert(errmsg);
        return;
    }

    if (Pass == null || Pass == "") {
        errmsg = "Please enter Password.";
        $.alert(errmsg);
        return;
    }

    event.preventDefault();

    if (document.getElementById("cpatchaTextBox").value == "") {
        errmsg = "Please enter Captcha.";
        $.alert(errmsg);
        return;
    } else if (document.getElementById("cpatchaTextBox").value == code) {
        EncryptPassword();
        // RememberCheck();
        //ProcessLogin();
    } else {
        alert("Invalid Captcha. try Again");
        $("#cpatchaTextBox").val("");
        createCaptcha();
    }
}


function EncryptPassword() {
    var rndnoKey = "";
    for (var i = 0; rndnoKey.length < 16; ++i) {
        rndnoKey += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAKey = btoa(rndnoKey);
    var rndnoIv = "";
    for (var i = 0; rndnoIv.length < 16; ++i) {
        rndnoIv += Math.floor(Math.random() * (10 - 1) + 1).toString();
    }
    var encodedStringBtoAIv = btoa(rndnoIv);
    var pass = document.getElementById("txtPassword").value.trim();
    var key = CryptoJS.enc.Utf8.parse(rndnoKey);
    var iv = CryptoJS.enc.Utf8.parse(rndnoIv);
    if (pass != "") {
        var encryptedpassword = EncryptPwdWithKey(pass, key, iv);
    } else {
    }
    ProcessLogin(encryptedpassword, encodedStringBtoAKey, encodedStringBtoAIv);
    return false;
}

function EncryptPwdWithKey(pass, key, iv) {
    if (pass != "") {
        var encryptedpassword = CryptoJS.AES.encrypt(
            CryptoJS.enc.Utf8.parse(pass),
            key,
            {
                keySize: 128 / 8,
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7,
            }
        );
        pass = "";
        return encryptedpassword;
    }
}


function ProcessLogin(encryptedpassword, key, iv) {
    var Uname = $("#txtUserName").val();
    var Pass = $("#txtPassword").val();

    var connectionStatus = navigator.onLine ? "online" : "offline";
    var errmsg = "";
    if (Uname == null || Uname == "") {
        errmsg = "Please enter User ID.<br/>";
        $.alert(errmsg);
        return;
    }

    if (Pass == null || Pass == "") {
        errmsg = "Please enter Password.";
        $.alert(errmsg);
        return;
    }
    // console.log(GHAserviceURL + "HHTLogin");

    //console.log("Key = " + key);
    //console.log("Pwd = " + encryptedpassword.toString());
    //console.log("UserName = " + Uname);
    //console.log("IV = " + iv);
    //console.log("UUId = " + encryptedUUID.toString());

    if (
        Uname != null &&
        Uname != "" &&
        Pass != null &&
        Pass != "" &&
        connectionStatus == "online"
    ) {
        $.ajax({
            type: "POST",
            // url: GHAserviceURL + "HHTLoginVAPT",
            // url: GHAserviceURL + "HHTLoginVAPTSession",
            url: GHAImportFlightserviceURL + "GetLoginUserDetails",
            data: JSON.stringify({
                //strUserName: Uname,
                //strPassword: encryptedpassword.toString()

                Val1: key,
                Val2: encryptedpassword.toString(),
                Val3: Uname,
                Val4: iv,
                Val5: encryptedUUID.toString(),
            }),

            contentType: "application/json; charset=utf-8",
            //dataType: "json",
            beforeSend: function doStuff() {
                $("body").mLoading({
                    text: "Loading..",
                });
            },
            success: function (response) {
                $("body").mLoading("hide");
                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {
                    var xmlDoc = $.parseXML(str);
                    //console.log(response);
                    console.log(xmlDoc);
                    $(xmlDoc)
                        .find("Table")
                        .each(function (index) {
                            window.localStorage.setItem("UserID", $(this).find("Userid").text());
                            window.localStorage.setItem("UserName", $(this).find("User_Name").text());
                            window.localStorage.setItem("companyCode", $(this).find("CompanyCode").text());
                            window.localStorage.setItem("SHED_AIRPORT_CITY", $(this).find("SHED_AIRPORT_CITY").text());
                            window.localStorage.setItem("SHED_CODE", $(this).find("SHED_CODE").text());
                            window.localStorage.setItem("CompanyCode", $(this).find("CompanyCode").text());
                            window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
                            window.localStorage.setItem("GHAImportFlightserviceURL", GHAImportFlightserviceURL);



                            window.localStorage.setItem("deviceUUID", $(this).find("UUId").text()
                            );
                            // deviceUUID = window.localStorage.getItem("deviceUUID");
                            UserKey = $(this).find("UserKey").text();
                            if (UserKey == key) {
                                window.location = "GalaxyHome.html";
                            } else {
                                $.alert('Invalid username/password.');
                                return;
                            }

                            //  MU_Password_C = $(this).find("MU_Password_C").text();

                            //if (key == MU_Password_C) {
                            //    window.localStorage.setItem("GHAserviceURL", GHAserviceURL);
                            //    window.location = "GalaxyHome.html";
                            //    MU_Password_C = '';
                            //} else {
                            //    $.alert('Invalid username/password.');
                            //    return;
                            //}

                            //window.localStorage.setItem("MU_CITY_C", $(this).find("MU_CITY_C").text());
                            //window.localStorage.setItem("MU_CITY_C", $(this).find("MU_CITY_C").text());
                        });

                    $(xmlDoc)
                        .find("StatusMessage")
                        .each(function (index) {
                            Status = $(this).find("Status").text();
                            Message = $(this).find("Message").text();
                            if (Status == "E") {
                                errmsg = Message + "</br>";
                                $.alert(errmsg);
                                return;
                            }
                        });
                } else {
                    HideLoader();
                    errmsg = errmsg + "Invalid username and password.";
                    $.alert(errmsg);
                }
            },
            error: function (msg) {
                HideLoader();
                var r = jQuery.parseJSON(msg.responseText);
                alert("Message: " + r.Message);
            },
        });

        //window.location = "GalaxyHome.html";

        //if (Uname == "VENKATAS" && Pass == "123") {
        //    window.location = "GalaxyHome.html";
        //}
    } else if (connectionStatus == "offline") {
        HideLoader();
        $.alert("No Internet Connection!");
    }
    if (errmsg != "") {
        HideLoader();
        $.alert(errmsg);
    }
}

function ProcessLoginBackup() {
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


    SetLoginRolesRights(Uname);

    if (Uname != null && Uname != "" && Pass != null && Pass != "" && connectionStatus == "online") {
        $.ajax({
            type: 'POST',
            url: GHAImportFlightserviceURL + "ValidatePDAUserCredentials",
            data: JSON.stringify({
                'pi_strUserName': Uname, 'pi_strPassword': Pass,
                'pi_blnIsPIN': 'false', 'pi_strSession': encryptedUUID.toString()
            }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {

                HideLoader();
                var str = response.d;
                if (str != null && str != "" && str != "<NewDataSet />") {

                    var xmlDoc = $.parseXML(str);

                    $(xmlDoc).find('clsUser').each(function (index) {
                        window.localStorage.setItem("UserName", $(this).find('UserName').text());
                        localStorage.setItem('deviceUUID', encryptedUUID.toString());

                        window.localStorage.setItem("GHAImportFlightserviceURL", GHAImportFlightserviceURL);
                        //window.localStorage.setItem("CargoWorksServiceURL", CargoWorksServiceURL);

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
            url: GHAImportFlightserviceURL + "GetHHTUserRolesRightsForLoginId_PDA",
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

                        if ($(this).find('Module').text() == 'IMPORTS' && $(this).find('PermissionCode').text() == 'PKGP') {
                            if ($(this).find('IsPermit').text() == 'true') {
                                window.localStorage.setItem("RoleIMPRePrint", '1');
                            }
                            else
                                window.localStorage.setItem("RoleIMPRePrint", '0');
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


function myfunction() {

    printedData =
        '! 0 200 200 575 1\r\n' +
        'PW 575\r\n' +
        'TONE 0\r\n' +
        'SPEED 2\r\n' +
        'ON-FEED IGNORE\r\n' +
        'NO-PACE\r\n' +
        'BAR-SENSE\r\n' +
        'BT OFF\r\n' +
        'B 128 2 30 102 62 244 17122021111100001\r\n' +
        'T 5 0 32 441 xClientNamex\r\n' +
        'T 5 0 28 99 HAWB No.: xHAWBNox\r\n' +
        'T 5 0 29 144 MAWB No.: xMAWBNox\r\n' +
        'T 5 0 324 97 xDestx\r\n' +
        'T 5 0 430 97 xIGMNox\r\n' +
        'T 5 0 29 186 xFlitArrDatex\r\n' +
        'T 5 0 324 184 xFlitArrTimex\r\n' +
        'T 5 0 324 143 xPkgx\r\n' +
        'T 0 6 13 359 17122021111100001\r\n' +
        'PRINT';

    window.DatecsPrinter.listBluetoothDevices(
        function (devices) {
            window.DatecsPrinter.connect(devices[0].address,
                function () {
                    // printLogo();
                    // alert('connection success');
                    PrintCourierData();
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
        window.DatecsPrinter.printText(printedData, 'ISO-8859-1',
            function () {

                //  alert('print success');
                // printMyBarcode();
            }
        );
    }

}



function myfunctionBold() {

    printedData =
        '! 0 200 200 575 1\r\n' +
        'PW 575\r\n' +
        'TONE 0\r\n' +
        'SPEED 2\r\n' +
        'ON-FEED IGNORE\r\n' +
        'NO-PACE\r\n' +
        'BAR-SENSE\r\n' +
        'BT OFF\r\n' +
        'B 128 2 30 102 62 244 17122021111100001\r\n' +
        'T 5 0 32 441 xClientNamex\r\n' +
        'T 5 0 28 99 HAWB No.: xHAWBNox\r\n' +
        'T 5 0 29 144 MAWB No.: xMAWBNox\r\n' +
        'T 5 0 324 97 xDestx\r\n' +
        'T 5 0 430 97 xIGMNox\r\n' +
        'T 5 0 29 186 xFlitArrDatex\r\n' +
        'T 5 0 324 184 xFlitArrTimex\r\n' +
        'T 5 0 324 143 xPkgx\r\n' +
        'T 0 6 13 359 17122021111100001! U1 SETBOLD 0\r\n' +
        'PRINT';

    window.DatecsPrinter.listBluetoothDevices(
        function (devices) {
            window.DatecsPrinter.connect(devices[0].address,
                function () {
                    // printLogo();
                    // alert('connection success');
                    PrintCourierData();
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
        window.DatecsPrinter.printText(printedData, 'ISO-8859-1',
            function () {

                //  alert('print success');
                // printMyBarcode();
            }
        );
    }

}

//function myfunction() {
//    var printedData = '! 0 200 200 575 1\r\n' +
//    'PW 575\r\n' +
//    'TONE 0\r\n' +
//    'SPEED 2\r\n' +
//    'ON-FEED IGNORE\r\n' +
//    'NO-PACE\r\n' +
//    'BAR-SENSE\r\n' +
//    'PCX 28 20 \r\n' +
//    '&#x5;&#x1;&#x1;    . K K    ÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿÿ A  x                                                         ÿÿÂÿÿÿÂÿÿÿÂÿÁÿÁîÁïþÿÁÿÁÕþÿÁÿª»þÿÁÿUÁýþÿÁþªÁþþÿÁýwëÿÁõÓÿÁú«Áþ¿èÿª«ÓÿÁõWêÿÁßÔÿÁê¯Áÿ¯æÿÁþÃÿÁïÒÿÁ÷ÿÿÁÿÁú¿ÁÿÁû»åÿÂûÂÿ¿ÒÿÁõ_ÁÿÁýUüÿÁê¯ÁÿÁú«çÿÁîÁÿ¿ÒÿÁýwÁÿÁõwéÿÒÿÁú«Áÿª¯åÿ¯Â¿¾¿ÒÿÁÿUÁÿÁÕ_éÿÒÿÁþªÁÿª¿åÿÁîÁÿÁï¾ÓÿÁÿÁ×WüÿÁÿª¾ªæÿ¾ÁûÁú¾Áÿ»Æÿ»ÂÿÁûÂÿ¿ÁÿÁûÂÿÁÿÁýÂÝéÿÁýÂÿÁßÅÿÁýÃÿÁßÅÿÁÿÃþÁÿÁþäÿÁþÁïÃþÁúÁïÂþÁÿÃþÃÿÁîÁÿÁîÄÿÂÿuéÿÁýÂÿÂÿÂÿÄÿÁÿÃÿÁÿª¾ª¿Áúãÿ«»¯ÁúÁùÁþÁûÂ«¿Â®¯«®º»ª»¯Â«ÂÿÁÿÁÝÁÿÁÕÁýãÿÁÝÃÿÁõÂÿÁßÁÝÁÿÁýÁÿÁßÁýÁÿÁýÁßÁÝÂýÁÿÁßÂÿÁþªÁÿª¿Áëãÿ¾ÁÿÂïÁãÁþÁëÁêÁîºÂ®ÂïÂ®¿ÂëÁî®ÁëÂÿÁÿÁ÷ÁÿÁõ_Á÷ãÿÃÿÁ÷ÓÿÁú«ÁÿÁê¯ÁïâÿÁþÁû»Áú¿‹ÅÿÁïÅÿ¿ÄÿÁûÂÿÁýÁßÁÿÁõWÁßçÿ_ÓÿÁê¯ÁÿÁú«¿âÿÁþÃÿÁê¿ÓÿÄÿwãÿÁýÃÿUÔÿÂ¿Âÿ¿ãÿÁûÁÿºª«ÁûÁÿ¾¿¯»«¾¿Â»«¯ÇÿèÿÁýØÿèÿÁûÁþÂÿÁþ¯ÁÿÂîÃïÁîÁÿÁîÁÿÁîÁïÇÿèÿÁ÷ÂÿWÁõÓÿÁûÃÿÁûÁÿÁûÃÿÁûÃÿÁûÁÿÁû×ÿÂûªÂˆ¿ÂÿÁûÁÿÅûÁÿ»ÈÿèÿÁ÷ÂÿÁýÁßÔÿÁïÁÿÁûÁÿÁîÁÿÁþÁîÁþÁÿÁúÂþÁÿÁîÁûÁþ×ÿÁûÁþ×ÿèÿÁ÷Øÿ¿Áë»¿¾ÂûÁîÂ»ÁûÂþºÁïÂ»¿ÖÿÁúÂ¿»ÃÿÃ»¿ÎÿÁßÁÿÁßåÿÁýÁÿUÁßÃÿÁßÑÿÁÿÂïÂ¾Áÿ¿ÁïÁëÂÿÂþÁÿ¯ÁûÁþØÿÁê"¯ÂÿÁþÁÿÁïÁþÏÿéÿÁ×Á÷ÖÿÁïº»ÂºÁû»ÁîÁû»ÁûÂþÁûÁïÂû¿×ÿ»ÅÿÂû»¿ÎÿÅÿÁýÉÿÁýñÿ\r\n' +
//    'BT 7 0 3\r\n' +
//    'B 128 2 30 102 78 243 PI2112070001\r\n' +
//    'T 5 0 33 423 Cargo Service Center India Private Limited\r\n' +
//    'T 5 0 28 97 HAWB No.: H)3112021\r\n' +
//    'T 5 0 29 143 MAWB No.: 17690000061\r\n' +
//    'T 5 0 324 97 BOM\r\n' +
//    'T 5 0 430 97 3112021\r\n' +
//    'T 5 0 29 184 01 Nov 2021\r\n' +
//    'T 5 0 324 184 09:30:00\r\n' +
//    'T 5 0 324 143 1/1\r\n' +
//    'PRINT';


//    //  printedData = "This is sample print!";

//    window.DatecsPrinter.listBluetoothDevices(
//       function (devices) {
//           window.DatecsPrinter.connect(devices[0].address,
//               function () {
//                   // printLogo();
//                   alert('connection success');
//                   window.DatecsPrinter.printText(printedData, 'ISO-8859-1',
//            function () {
//                alert('print success');
//                // printMyBarcode();
//            });
//               },
//               function () {
//                   // alert(JSON.stringify(error));
//               }
//           );
//       },
//       function (error) {
//           // alert(JSON.stringify(error));
//       });



//}


//window.cordova.plugins.zbtprinter.print("A4:DA:32:86:F0:EB",
//       "! 0 200 200 210 1" +
//       "ML 47" +
//       "TEXT 4 0 10 20" +
//       "1st line of text" +
//       "2nd line of text" +
//       "Nth line of text" +
//       "ENDML" +
//       "FORM" +
//       "PRINT",
//       function (success) {
//           alert("Zbtprinter print success: " + success);
//       }, function (fail) {
//           alert("Zbtprinter print fail:" + fail);
//           deferred.reject(fail);
//       });