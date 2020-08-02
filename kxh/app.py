from flask import Flask, request, render_template, flash, redirect, url_for
import pymysql
import check
import json

app = Flask(__name__)
app.secret_key = "kxh_kexianghui"


# 显示主界面
@app.route('/')
def interface():
    return render_template("interface.html")


# 跳转登陆页面
@app.route('/login.html')
def login():
    return render_template("login.html")


@app.route('/index.html')
def index():
    return render_template("index.html")


# 检测登录是否成功
@app.route("/dologin", methods=["POST"])
def dologin():
    name = request.form.get("uname")
    pwd = request.form.get("upwd")
    print("name: ", name, "pwd: ", pwd)
    conn = pymysql.connect(
        host="localhost",
        port=3306,
        user="root",
        password="kxh",
        db="kxh_userdata",
        charset="utf8"
    )
    print(conn)
    cls = conn.cursor()
    cls.execute("select uname ,upwd from kxh_user where uname=%s and upwd=%s", [name, pwd])
    result = cls.fetchone()
    if result is None:
        flash("您输入的用户名或密码错误，请重新输入！")
        return redirect("login.html")
    else:
        return redirect("index.html")


# 跳转注册页面
@app.route('/register.html')
def register():
    return render_template("register.html")


# 接收注册页面数据
@app.route("/doregister", methods=["POST"])
def doregister():
    name = request.form.get("uname")
    pwd = request.form.get("upwd")
    print("name: ", name, "pwd: ", pwd)
    conn = pymysql.connect(
        host="localhost",
        port=3306,
        user="root",
        password="kxh",
        db="kxh_userdata",
        charset="utf8"
    )
    print(conn)
    cls = conn.cursor()
    rows = cls.execute("insert into kxh_user(uname,upwd) values (%s,%s)", [name, pwd])
    conn.commit()
    conn.close()
    if rows >= 1:
        return render_template("index.html")
    else:
        return render_template("register.html")


#  验证用户名是否存在
@app.route("/checkUName")
def checkUName():
    name = request.args.get("name")
    print(name)
    return check.checkname(name)


'''
# 搜索页面
@app.route('/index2')
def test():
    return render_template('index2.html')
'''


# 接收查找课程结果
@app.route('/getClassWebsite')
def getClassWebsite():
    name = request.args.get("name")
    conn = pymysql.connect(
        host="localhost",
        port=3306,
        user="root",
        password="kxh",
        db="kxh_userdata",
        charset="utf8"
    )
    cls = conn.cursor()
    cls.execute("select website from kxh_course where coursename=%s", [name])
    result = cls.fetchone()
    if (result is None):
        return "not found"
    conn.close()
    print(result[0])
    return result[0]
    # return redirect(result[0])


# 搜索记录
app.route('/searchPage.html')


def searchPage():
    return render_template("searchPage.html")


# 接收搜索页面信息
@app.route("/dosearchPage")
def dosearchPage():
    course = request.args.get("coursename")
    conn = pymysql.connect(
        host="localhost",
        port=3306,
        user="root",
        password="kxh",
        db="kxh_userdata",
        charset="utf8"
    )
    print(conn)
    cls = conn.cursor()
    print('debug:sql ', "select * from kxh_course where coursename like '%" + course + "%'")
    cls.execute("select * from kxh_course where coursename like '%" + course + "%'")
    result = cls.fetchall()
    if (result is None):
        return "not found"
    conn.close()
    # print(result[0])
    # return result[0]
    # return render_template("searchPage.html", result[0])
    print(result)
    ret = []
    for record in result:
        ret.append(
            {
                'id': record[0],
                'school': record[1],
                'college': record[2],
                'coursename': record[3],
                'teacher': record[4],
                'website': record[5],
            })
    return json.dumps(ret)


# 首页课程推荐--数学分析
@app.route('/jpCourse_sxfx.html')
def jpCourse_sxfx():
    return render_template("jpCourse_sxfx.html")


# 首页课程推荐--Java
@app.route('/jpCourse_Java.html')
def jpCourse_Java():
    return render_template("jpCourse_Java.html")


# 首页课程推荐--数据结构
@app.route('/jpCourse_sjjg.html')
def jpCourse_sjjg():
    return render_template("jpCourse_sjjg.html")


# 北京林业大学
@app.route('/BFU.html')
def BFU():
    return render_template("BFU.html")


# 北京邮电大学
@app.route('/BUPT.html')
def BUPT():
    return render_template("BUPT.html")


# 关于我们
@app.route('/aboutus.html')
def aboutus():
    return render_template("aboutus.html")


@app.route('/test')
def test():
    return render_template("test.html")


if __name__ == '__main__':
    app.run()
