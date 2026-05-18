let students = [];

function addStudent(){

  let name =
    document.getElementById(
      "studentName"
    ).value;

  if(name === ""){
    alert("Please enter student name");
    return;
  }

  let student = {
    id: Date.now(),
    name: name,
    present: false,
    attendance: 0,
    totalDays: 0
  };

  students.push(student);

  document.getElementById(
    "studentName"
  ).value = "";

  renderStudents();

}

function markPresent(id){

  students = students.map(function(student){

    if(student.id === id){

      student.present = true;

      student.attendance++;

      student.totalDays++;

    }

    return student;

  });

  renderStudents();

}

function markAbsent(id){

  students = students.map(function(student){

    if(student.id === id){

      student.present = false;

      student.totalDays++;

    }

    return student;

  });

  renderStudents();

}

function deleteStudent(id){

  students = students.filter(function(student){

    return student.id !== id;

  });

  renderStudents();

}

function renderStudents(){

  let studentList =
    document.getElementById(
      "studentList"
    );

  studentList.innerHTML = "";

  let totalPresent = 0;

  students.forEach(function(student){

    if(student.present){
      totalPresent++;
    }

    let percentage = 0;

    if(student.totalDays > 0){

      percentage =
        Math.round(
          (student.attendance /
          student.totalDays) * 100
        );

    }

    let warning = "";

    if(percentage < 75 &&
       student.totalDays > 0){

      warning =
        "<p class='warning'>Attendance Shortage</p>";

    }

    studentList.innerHTML += `

      <div class="student-card">

        <h2>${student.name}</h2>

        <p class="status ${
          student.present
          ? 'present'
          : 'absent'
        }">

          ${
            student.present
            ? 'Present'
            : 'Absent'
          }

        </p>

        <p>
          Attendance:
          ${percentage}%
        </p>

        ${warning}

        <button
          class="present-btn"
          onclick="markPresent(${student.id})">

          Present

        </button>

        <button
          class="absent-btn"
          onclick="markAbsent(${student.id})">

          Absent

        </button>

        <button
          class="delete-btn"
          onclick="deleteStudent(${student.id})">

          Delete

        </button>

      </div>

    `;

  });

  document.getElementById(
    "totalStudents"
  ).innerText = students.length;

  document.getElementById(
    "presentStudents"
  ).innerText = totalPresent;

  let attendanceRate = 0;

  if(students.length > 0){

    attendanceRate =
      Math.round(
        (totalPresent /
        students.length) * 100
      );

  }

  document.getElementById(
    "attendanceRate"
  ).innerText =
    attendanceRate + "%";

}

function toggleTheme(){

  document.body.classList.toggle(
    "light-mode"
  );

}