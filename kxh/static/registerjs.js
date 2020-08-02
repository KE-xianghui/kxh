var uname_flag = false;
var upwd_flag = false;
var rupwd_flag = false;

function checkName() {
    uname = document.getElementById("uid").value;
    var reg = /^[a-zA-Z0-9\_]{4,16}$/;
    var result = reg.test(uname);
    span = document.getElementById("usid");
    if (result == true) {
        $.getJSON("checkUName?name=" + uname, function (res) {
            result = res;
            if (result == false) {
                span.innerHTML = "<font color='red' font size='3'>该用户名已存在</font>";
                uname_flag = false;
            } else {
                span.innerHTML = "<font color='green' font size='3'>可以注册</font>";
                uname_flag = true;
            }
        })
    } else {
        span.innerHTML = "<font color='red' font size='3'>用户名只能为字母数字下划线,且有4到16位！</font>";
        uname_flag = false;
    }
}

function checkPwd() {
    pwd = document.getElementById("pid").value;
    var reg = /^[A-Za-z0-9]{6,}$/;
    var result = reg.test(pwd);
    span = document.getElementById("sid");
    if (result == true) {
        span.innerHTML = "<font color='green' font size='3'>密码格式正确</font>"
        upwd_flag = true;
    } else {
        span.innerHTML = "<font color='red' font size='3'>密码仅由A-Z,a-z,0-9组成,且长度至少应为六位！</font>";
        upwd_flag = false;
    }
}

function checkRPwd() {
    rpwd = document.getElementById("rpid").value;
    if (rpwd == pwd) result = true;
    else result = false;
    span = document.getElementById("rsid");
    if (result == true) {
        span.innerHTML = "<font color='green' font size='3'>密码设置成功</font>"
        rupwd_flag = true;
    } else {
        span.innerHTML = "<font color='red' font size='3'>确认密码与设置密码不一致</font>";
        rupwd_flag = false;
    }
}

function checkAll() {
    if (uname_flag == true & upwd_flag == true & rupwd_flag == true) {
        alert("注册成功!")
        return(true)
    } else {
        alert("注册失败!")
        return(false)
    }
}