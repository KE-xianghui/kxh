function jumpClass(coursename) {
    $.ajax({
        type: "GET",
        contentType: "application/json;charset=UTF-8",
        url: "dosearchPage?coursename=" + coursename,
        success: function (ret) // excute this function if get data successfully
        {
            if (ret === "not found") { // when server responds it can't find the class name
                alert("查询不到此课程信息!");
                // document.getElementById("btn").disabled=false;
                return;
            }
            res = JSON.parse(ret);
            console.log(res);

            table = document.createElement("table");
            for (i = 0; i < res.length; i++) {
                line = document.createElement('tr');

                data_name = ["id", "school", "college", "coursename", "teacher", "website"];
                for (j = 0; j < 6; j++) {
                    if (j < 5) {
                        unit = document.createElement("th");
                        unit.appendChild(document.createTextNode(res[i][data_name[j]]));
                        line.appendChild(unit);
                    } else {
                        unit = document.createElement("th");
                        link=document.createElement("a");
                        link.href=res[i][data_name[j]];
                        link.appendChild(document.createTextNode("Visit Website"));
                        unit.appendChild(link);
                        line.appendChild(unit);
                    }
                }

                table.appendChild(line);
            }
            document.getElementById("table_temp").innerHTML = "";
            document.getElementById("table_temp").appendChild(table);
            document.getElementById("btn").disabled = false;

            // Main.data().tableData = res; // error!!!!

            // // window.location.href = res;
            //
            // // <th>test1</th>
            // // <th><a herf="https://baidu.com">test2</a></th>
            // className = document.getElementById("className").value; // get class name
            //
            // // create link object
            // linkObject = document.createElement("a");
            // linkObject.href = res;
            // linkObject.text = "website";
            //
            // th1=document.createElement("th"); // className in table
            // th2=document.createElement("th"); // link in table
            //
            // th1.appendChild(document.createTextNode(className)); // the first column -> append class name
            // th2.appendChild(linkObject); // the second column -> append link(<a>) object
            //
            // tr=document.createElement("tr"); // a line of table
            // //append two elements to the new line
            // tr.appendChild(th1);
            // tr.appendChild(th2);

            // // append the new line to table
            // document.getElementById("ta").appendChild(tr);
            // document.getElementById("btn").disabled=false;
        }
    });
}

let queried = new Set();

function buttonCallback() {
    // forbid multi-click
    document.getElementById("btn").disabled = true;
    className = document.getElementById("className").value;
    if (queried.has(className)) {
        alert("正在查询该课程，请稍等...");
        document.getElementById("btn").disabled = false;
        return;
    } else {
        queried.add(className);
    }
    jumpClass(className);
}
