function jumpClass(className) {
            $.ajax({
                type: "GET",
                contentType: "application/json;charset=UTF-8",
                url: "getClassWebsite?name=" + className,
                success: function (res) // excute this function if get data successfully
                {
                    if(res==="not found"){ // when server responds it can't find the class name
                        alert("class not found!");
                        document.getElementById("btn").disabled=false;
                        return;
                    }
                    // window.location.href = res;

                    // <th>test1</th>
                    // <th><a herf="https://baidu.com">test2</a></th>
                    className = document.getElementById("className").value; // get class name

                    // create link object
                    linkObject = document.createElement("a");
                    linkObject.href = res;
                    linkObject.text = "website";

                    th1=document.createElement("th"); // className in table
                    th2=document.createElement("th"); // link in table

                    th1.appendChild(document.createTextNode(className)); // the first column -> append class name
                    th2.appendChild(linkObject); // the second column -> append link(<a>) object

                    tr=document.createElement("tr"); // a line of table
                    //append two elements to the new line
                    tr.appendChild(th1);
                    tr.appendChild(th2);

                    // append the new line to table
                    document.getElementById("ta").appendChild(tr);
                    document.getElementById("btn").disabled=false;
                }
            });
        }
        let queried = new Set();
        function buttonCallback() {
            // forbid multi-click
            document.getElementById("btn").disabled=true;

            className = document.getElementById("className").value;
            if(queried.has(className)){
                alert("正在查询该课程，请稍等...");
                document.getElementById("btn").disabled=false;
                return;
            }else{
                queried.add(className);
            }
            jumpClass(className);
        }