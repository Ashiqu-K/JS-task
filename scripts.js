var letters = /^[A-Za-z, ]+$/;

var mailvailid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

var re = /((http|https)\:\/\/)?[a-zA-Z0-9\.\/\?\:@\-_=#]+\.([a-zA-Z0-9\&\.\/\?\:@\-_=#])*/;

var namef = 0,
  emailf = 0,
  webf = 0;

function checkName(nm) {
  if ((nm == null) || (!nm.match(letters)) || (nm.length > 25)) {
    document.getElementById("errorname").innerHTML = "invalid name";
  } else {
    namef = 1;
    document.getElementById("errorname").innerHTML = " ";
  }
}

function checkEmail(mail) {
  var atpos = mail.indexOf("@");
  var dotpos = mail.lastIndexOf(".");
  if (atpos == null || atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= mail.length || dotpos == null || (!mail.match(mailvailid))) {

    document.getElementById("erroremail").innerHTML = "invalid email";
  } else {
    emailf = 1;
    document.getElementById("erroremail").innerHTML = " ";
  }
}

function checkweb(url) {
  if (!url.match(re)) {

    document.getElementById("errorweb").innerHTML = "invalid url";
  } else {

    document.getElementById("errorweb").innerHTML = " ";
  }

}

function checkfield() {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;

  if (name.length == 0) {
    document.getElementById("errorname").innerHTML = "name field is empty";
  } else {

    namef = 2;
    checkName(name);
    document.getElementById("errorname").innerHTML = " ";
  }

  if (email.length == 0) {
    document.getElementById("erroremail").innerHTML = "email field is empty";
  } else {
    emailf = 2;
    checkEmail(email);

    document.getElementById("erroremail").innerHTML = " ";
  }

  if (namef == 1) {
    if (emailf == 1) {
      {

        alert("submit successfully");
      }
    }
  } else if (namef == 2 && emailf == 2) {
    alert("name  & email incorrect format");
  } else if (emailf == 2) {
    alert("email incorrect format");

  } else if (namef == 2) {
    alert("name incorrect format");
  }
}

  var table;

  function getData() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        data.forEach((user) => {
          table = document.getElementById('data_table');
          var row = table.insertRow(-1);
          var cell_id = row.insertCell(0);
          var cell_name = row.insertCell(1);
          var cell_username = row.insertCell(2);
          var cell_email = row.insertCell(3);
          cell_id.innerHTML = user.id;
          cell_name.innerHTML = user.name;
          cell_username.innerHTML = user.username;
          cell_email.innerHTML = user.email;
        });
      })
  }

  function sortTable() {
    table = document.getElementById("data_table");
    var direction, isSwitching, toSwitch, x, y, count = 0,
      i;
    // Set the sorting direction
    direction = "asc";
    isSwitching = true;
    while (isSwitching) {
      /* isSwitching determines whether any switching is being done.
      Initially assume that no switching has to be done */
      isSwitching = false;
      rows = table.getElementsByTagName("TR");
      // Loop through all row elements and compare successive ones
      for (i = 1; i < (rows.length - 1); i++) {
        /* toSwitch determines whether elements should be switched or not.
        Initially assume that no switching is to be made*/
        toSwitch = false;
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        // Check whether to switch rows based on direction
        if (direction == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            toSwitch = true
            break;
          }
        } else if (direction == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            toSwitch = true;
            break;
          }
        }
      }
      // If toSwitch has been set, then swap the rows
      if (toSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        isSwitching = true;
        // count is incremented each time a switch has been made
        count++;
      } else {
        /* If count is 0 and direction is 'asc', run the loop again by
        changing direction to 'desc' */
        if (count == 0 && direction == "asc") {
          direction = "desc";
          isSwitching = true;
        }
      }
    }
  }
