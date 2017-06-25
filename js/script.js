//Load the visualization API and the corechart package
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(drawChart);


//This array will add the tasks created in the desrctiption
var taskList = [];

var difficultyCumulative=[['easy',0],['medium',0],['hard',0]];

function task(person, description, difficulty)
  {
    this.person = person;
    this.description = description;
    this.difficulty = difficulty;
  }
  
//assigns the level of difficulty of the task
function getFormData(){
  var person = document.querySelector('input[name="person"]:checked').value;
  var description = document.getElementById("description").value;
  var difficulty= document.getElementById("difficulty").value;
  
  var newTask = new task(person, description, difficulty);
  taskList.push(newTask);
  addToDoList();
  addUpTaskDifficulties();
  drawChart();
}
//Adds the task that needs to be completed//
function addToDoList(){
  var ulTaskList = document.getElementById("toDoTasks"); 
  ulTaskList.innerHTML = "";
 
  for (var i =0; i<taskList.length; i++){
    var taskItem = taskList[i];
    var liTaskItem = document.createElement("li");
    
    //Concatenation of phrase//
    liTaskItem.innerHTML = taskItem.person + " has to " + taskItem.description + " which is a/an " + taskItem.difficulty +" task"; ulTaskList.appendChild(liTaskItem);
 }
  
}
//To calculate total tasks based on difficulty type
function addUpTaskDifficulties(){
  for (var i=0; i<taskList.length; i++){
    
    for(var j=0; j<difficultyCumulative.length; j++){
      if (difficultyCumulative[j][0]==taskList[i].difficulty){
        difficultyCumulative[j][1]=++difficultyCumulative[j][1];
        break;
      }
    }
  }
 
}

function drawChart(){
  
  
var data = new google.visualization.DataTable();
  data.addColumn('string', 'Task Difficulty');
  data.addColumn('number', 'Number of Tasks');
  
  data.addRows(difficultyCumulative);
 
  //chart
 var options = {'title':'Task Difficulty',
                 'width':400,
                 'height':300,
                  pieHole:0.4,
                  titleTextStyle: {
                    fontSize: 16,
                    underline: true,
                    fontName: 'Arial',
                    color: 'black' 
                  },
                  slices: {
                    0: { color: 'purple' }, 
                    1: { color: 'magenta' }, 
                    2: { color: 'red' }, 
      
                  },
                  legend: {
                    textStyle: {
                      color: 'grey',
                      fontName: 'Arial'
                      }
                  }
                };
  
  var chart = new google.visualization.PieChart(document.getElementById('pieHoleChart'));
  chart.draw(data, options);
}