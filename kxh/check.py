import pymysql

def checkname(uname):
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
    # 前端传递的数据，进行到数据库中进行验证
    cls.execute("select * from kxh_user where uname=%s ", [uname])
    result = cls.fetchone()
    print(result)
    if result is None:
        return "true"
    else:
       return "false"