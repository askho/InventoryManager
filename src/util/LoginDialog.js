sap.ui.define([
   "sap/m/MessageToast",
   "./Service",
   "sap/m/Dialog",
   "sap/m/Input",
   "sap/m/Button",
   "sap/m/CheckBox"
], function (MessageToast, Service, Dialog, Input, Button, Checkbox) {
    "use strict";
    
    function LoginDialog(core) {
        var validate;
        var saved = localStorage.getItem("userName");
        var savedPassword = localStorage.getItem("password");
        var userNameInput = new Input({
            placeholder: "Username",
            value: saved
        }).addStyleClass("appInput");

        var passwordInput = new Input({
            placeholder: "Password",
            type: "Password",
            value: savedPassword
        }).addStyleClass("appInput");
        var loginButton = new Button({
            text: "Login",
            width: "100%",
            press: function() {
                console.log("Pressed");
                validate();
            }
        }).addStyleClass("appBtnPrimary");
        var rememberMe = new Checkbox({
            name: "Remember Me",
            text: "Remember Me",
            selected: saved ? true : false
        }).addStyleClass("appCheckbox");

        var loginDialog = new Dialog({
            title: "Login",
            content: [userNameInput, passwordInput, rememberMe, loginButton]
        }).addStyleClass("appLoginDialog");
        
        function setErrorState() {
            userNameInput.setValueState("Error");
            passwordInput.setValueState("Error");
        }
        function clearErrorState() {
            userNameInput.setValueState("None");
            userNameInput.setValueState("None");
        }

        loginDialog.attachBrowserEvent("keypress", function (event) {
            if (event.keyCode === 13) {
                validate.call(this);
            }
        }.bind(this));

        var fireLoggedIn = function(token, username) {
            if(rememberMe.getSelected()) {
                if(token){
                    localStorage.setItem("authToken", token); 
                    localStorage.setItem("userName", username);   
                }
                if(localStorage.getItem("debug")){
                    localStorage.setItem("password", passwordInput.getValue());
                }
            } else {
                if(token){
                    localStorage.setItem("authToken", token);    
                } else {
                    localStorage.setItem("userName", "");
                }
            }
            setTimeout(function() {
                APP_CONFIG.state = APP_CONFIG.state ? APP_CONFIG.state : {};
                APP_CONFIG.state.auth.loggedIn = true;
                APP_CONFIG.state.auth.headers = "Token " + btoa(APP_CONFIG.state.auth.username + ":" + localStorage.getItem("authToken"));
                core.getEventBus().publish("app", "loggedin");
            });
        };

        validate = function() {
            clearErrorState();
            var username = userNameInput.getValue();
            var password = passwordInput.getValue();
            APP_CONFIG.state.auth.username = username;
            Service.init(APP_CONFIG.oDataService, {
                username: username,
                password: password
            });
            loginDialog.setBusyIndicatorDelay(0);
            loginDialog.setBusy(true);
            Service.ajax({
                type: "Post",
                path: "api/Registration/Login"
            }).always(function(xhr){
                loginDialog.setBusy(false);
                if(xhr.status === 200) {
                    loginDialog.close();
                    fireLoggedIn(xhr.responseText, username);
                } else {
                    setErrorState();
                }
            });
        };

        this.attemptAuth = function() {
            if(localStorage.getItem("authToken")) {
                Service.ajax({
                    type: "Post",
                    serviceUrl: APP_CONFIG.oDataService + "api/Registration/Login"
                }).always((function(xhr){
                    loginDialog.setBusy(false);
                    if(xhr.status === 200) {
                        loginDialog.close();
                        APP_CONFIG.state.auth.username = userNameInput.getValue();
                        Service.init(APP_CONFIG.oDataService, {"useToken": true,
                            username: userNameInput.getValue()
                        });
                        fireLoggedIn(xhr.responseText);
                    } else {
                        this.show();
                    }
                }).bind(this));
            } else {
                this.show();
            }
        };

        this.show = function(){
            loginDialog.open();
        };

        sap.ui.getCore().getEventBus().subscribe("app", "authFailure", this.show, this);
    }

    return LoginDialog;
});
