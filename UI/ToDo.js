 var array = [];
 window.onload = function() {
     document.getElementById("todo").style.display = "block";
     DisplayTable(array);
     getTodos();
 }

 function myFunction(id) {
     let right = document.getElementsByClassName("right");
     for (let i = 0; i < right.length; i++)
         right[i].style.display = "none";
     document.getElementById(id).style.display = "block";
 }

 function hideShow() {
     document.getElementById("myUL").style.display = "none";
 }

 function show() {
     document.getElementById("myUL").style.display = "block";
 }

 function AutoPopulate() {
     document.getElementById("myUL").style.display = "block";
     let input, filter, ul, i, txtValue;
     input = document.getElementById("myInput");
     filter = input.value;
     ul = document.getElementById("myUL");
     ul.innerHTML = '';
     for (i = 0; i < array.length; i++) {
         txtValue = array[i];
         if (txtValue.toLowerCase().indexOf(filter.toLowerCase()) > -1) {
             var li = document.createElement("li");
             li.appendChild(document.createTextNode(txtValue));
             li.style.display = "block";
             ul.appendChild(li);
         }
     }
 }

 function SearchItem() {
     let input, filter, j = 0;
     let searchresult = [];
     input = document.getElementById("myInput");
     filter = input.value;
     for (let i = 0; i < array.length; i++) {
         if (array[i].includes(filter)) {
             searchresult[j] = array[i];
             j++;
         }
     }
     input.value = "";
     DisplayTable(searchresult);

 }

 function AddItem() {
     let input, filter;
     input = document.getElementById("myInput");
     filter = input.value;
     if (!array.includes(filter) && filter.length != 0) {
         array.push(filter);
         fetch('http://localhost:8080/list/', {
             method: 'POST',
             body: JSON.stringify({
                 'task': filter
             }),
             headers: {
                 "Content-type": 'application/json; charset=UTF-8'
             }
         })
     } else {
         alert("Task already present or Does Not Contain Anything");
     }
     let table = document.getElementById("myTable");
     input.value = "";
     DisplayTable(array);
 }



 /* function addTodo(){
    let todo_name = document.getElementById('todo-name').value;
    if(todo_name == "")  
        alert("Enter a value to search");
    else{
		let requestBody = { todoname : todo_name };
		fetch('http://localhost:9090/todos/', {
		 	method: 'post',
		    body: JSON.stringify(requestBody)
		}).then(response => {
	    	return response.json()
		}).then(data => {
			createTodoRow(todo_name);
		});
    }
}*/

 function DisplayTable(array) {
     var table = document.getElementById("myTable");
     table.innerHTML = '';
     if (array.length == 0) {
         //alert("No Elements in To Do List");
     }
     for (let j = 0; j < array.length; j++) {

         var row = table.insertRow(j);
         var cell1 = row.insertCell(0);
         var cell2 = row.insertCell(1);
         var cell3 = row.insertCell(2);
         let btn = "button";
         let editonclick = "EditItem(this)";
         let deleteonclick = "DeleteItem(this)";
         cell2.innerHTML = `<button class=${btn} onclick=${editonclick}>Edit</button>`;
         cell3.innerHTML = `<button class=${btn} onclick=${deleteonclick}>Delete</button>`;
         cell1.innerHTML = array[j];

     }
 }

 function EditItem(element) {
     let row = element.parentNode.parentNode;
     let rowcontent = row.firstChild.innerHTML;
     let btn = "button";
     let index = array.indexOf(rowcontent);
     //let txtval =edit.value;
     row.innerHTML = `<td><input type='text' id='edit' value='${rowcontent}'></td><td>
     					<button class='${btn}' onclick=UpdateItem('${rowcontent}',this,${index})>Update</button></td> `;
     //edit.value="";
 }

 function UpdateItem(oldvalue, element, index) {
     let rowcontent = element.parentNode.parentNode.firstChild.firstChild.value;
     if (!array.includes(rowcontent) && rowcontent.length != 0) {
         array[index] = rowcontent;

         fetch('http://localhost:8080/list/', { method: 'GET' })
             .then(response => response.json())
             .then(function(json) {


                 data = json['_embedded']['list'];


                 url = null


                 for (x of data) {
                     if (x.task == oldvalue) {
                         url = x['_links']['self']['href'];
                         break;
                     }
                 }


                 console.log(url);


                 fetch(url, {
                     method: 'PUT',
                     body: JSON.stringify({
                         'task': rowcontent
                     }),
                     headers: {
                         "Content-type": 'application/json; charset=UTF-8'
                     }
                 })
             })

     } else {
         alert("Task already present or Does Not Contain Anything");
     }
     DisplayTable(array);
 }

 function DeleteItem(element) {
     let row = element.parentNode.parentNode;
     let rowcontent = row.firstChild.innerHTML;
     let index = array.indexOf(rowcontent);
     if (index > -1) {
         array.splice(index, 1);


         fetch('http://localhost:8080/list/', { method: 'GET' })
             .then(response => response.json())
             .then(function(json) {


                 data = json['_embedded']['list'];


                 url = null


                 for (x of data) {
                     if (x.task == rowcontent) {
                         url = x['_links']['self']['href'];
                         break;
                     }
                 }


                 console.log(url);


                 fetch(url, {
                     method: 'DELETE'
                 })
             })

     }
     var table = document.getElementById("myTable");
     DisplayTable(array);
 }


 function getTodos() {
     fetch('http://localhost:8080/list/', {
         method: 'get'
     }).then(response => {
         return response.json()
     }).then(function(json) {

         console.log(json);

         // for(let i=0;i<array.length;i++){
         //    		console.log(array[i]);
         //}
     });
 }

 function getTodos() {
     fetch('http://localhost:8080/list/', {
         method: 'get'
     }).then(response => {
         return response.json()
     }).then(function(json) {
         data = json
         arr = data["_embedded"]["list"];
         console.log(arr);
         console.log(arr.length);
         for (let i = 0; i < arr.length; i++) {
             console.log(arr[i]["task"]);
             array.push(arr[i]["task"]);

             //createDatalistOption(array[i]);
             //createTodoRow(array[i])
         }
         DisplayTable(array);
     });
 }