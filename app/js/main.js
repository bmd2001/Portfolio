const pages = document.getElementById("text-group").children;
var grade_idx = 1;
const modules = [
    "Theory 1", "Software 1", "Systems & Devices 1", "Human-Computer Interactions 1", "Theory 2", 
    "Software 2", "Data 1", "Human-Computer Interactions 2", "Intelligent Systems 1", "Systems & Devices 2",
    "Data 2", "Theory 3", "Engineering 1", "Systems & Devices 3", "Intelligent Systems 2", "Software 3"
    ]
const grades = [
    87, 98, 77, 65, 82, 82, 89, 68, 62, 65, 82, 53, 67, 76, 81, 76
    ]
const grades_circles = document.querySelectorAll(".outer-circle");
const grade_texts = document.querySelectorAll(".grade-text");
const modules_texts = document.querySelectorAll(".module-text");
const radius = grades_circles[0].r.baseVal.value;
const circumference = radius * 2 * Math.PI;


function showPage(id){
    for (let i = 0; i < pages.length; i ++){
        var page = pages[i];
        if(page.id == id){
            page.style = "display: block !important;";
            if(id == "Education"){
                changeGrade(0);
            }
        }
        else{
            page.style = "display: none !important;";
        }
    }
    grade_idx = 0;
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function changeGrade(operation){
    var transition = true;
    if(operation == 0){
        transition = false;
    }
    grade_idx += operation;
    if(grade_idx>3){
        grade_idx = 0
    }
    else if(grade_idx<0){
        grade_idx = 3
    }
    var start = grade_idx*4;
    var end = start + 4;
    var modules_section = modules.slice(start, end);
    var grades_section = grades.slice(start, end);
    for(let i=0; i<4; i++){
        var circle = grades_circles[i];
        var grade = grades_section[i];
        var module = modules_section[i];
        var grade_text = grade_texts[i];
        var module_text = modules_texts[i];


        setProgress(grade, circle);
        changeText(module, grade, module_text, grade_text, i+1, transition);
    }
}

function setProgress(percent, circle) {
    const offset = circumference - percent / 100 * circumference;
    circle.style.strokeDashoffset = offset;
    circle.style.stroke = `rgb(0, ${255 * percent/100}, 0)`
}

function changeText(module, grade, module_text, grade_text, num, transition){
    if(transition){
        $(`#grade${num}`).fadeToggle(500, function(){
            grade_text.innerHTML = `${grade}%`;
        })
        $(`#module${num}`).fadeToggle(500, function(){
            module_text.innerHTML = module;
        })
        $(`#grade${num}`).fadeToggle(500);
        $(`#module${num}`).fadeToggle(500);
    }
    else{
        grade_text.innerHTML = `${grade}%`;
        module_text.innerHTML = module;
    }
}

for(let i = 0; i < grades_circles.length; i++) {
    var circle = grades_circles[i];
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = `${circumference}`;
}

changeGrade(-1);