// ide deklaráljátok a függvényeket.

// 1. feladat
function sortDatas(ship) {
  // make numbers from null, javascript to be able to sort them too
  for (var i = 0; i < ship.length; i++) {
    for (var j = 0; j < ship.length; j++) {
      if (ship[j].cost_in_credits === null) {
        ship[j].cost_in_credits = 0;
      }
    }
  }
  // sort the spaceships based on values of cost_in_credits properties
  for (i = 1; i < ship.length; i++) {
    for (j = 0; j < ship.length - 1; j++) {
      if (parseInt(ship[j].cost_in_credits) > parseInt(ship[j + 1].cost_in_credits)) {
        [ship[j], ship[j + 1]] = [ship[j + 1], ship[j]];
      }
    }
  }
  return ship;
}

// 2. feladat
function removeItems(ship) {
  // remove objects where consumables is null
  for (var i = 0; i < ship.length; i++) {
    if (ship[i].consumables === null) {
      ship.splice(i, 1);
      i--;
    }
  }
  return ship;
}

// 3. feladat
function changeNull(ship) {
  // change any null value to unknown
  for (var i = 0; i < ship.length; i++) {
    for (var k in ship[i]) {
      if (ship[i][k] === null) {
        ship[i][k] = 'unknown';
      }
    }
  }
  return ship;
}

// 4. feladat
function writeShipsToPage(data) {
  var spaceships = document.querySelector('.spaceship-list');
  for (var i = 0; i < data.length; i++) {
    var smallDiv = document.createElement('div');
    smallDiv.setAttribute('class', 'ship-div');
    var info = document.createElement('p');
    var image = document.createElement('img');
    var url = 'img/' + data[i].image;
    image.src = url;
    info.innerText = JSON.stringify(data[i]);
    smallDiv.appendChild(info);
    smallDiv.appendChild(image);
    spaceships.appendChild(smallDiv);
  }
  return spaceships;
}

// 5. feladat
function showShipRight(ship) {
  var spaceship = document.querySelector('.ship-div');
  if (spaceship.onclick) {
    var newShip = document.querySelector('.spaceship-list');
    newShip.appendChild(spaceship);
  }
  return newShip;
}

// 6. feladat 1)
function numberOfCrew(person) {
  var count = 0;
  for (var i = 0; i < person.length; i++) {
    if (parseInt(person[i].crew) === 1) {
      count += 1;
    }
  }
  var spaceships = document.querySelector('.spaceship-list');
  var crew = document.createElement('p');
  crew.innerText = `${count} db olyan hajó van, amelynek egy fős a legénysége.`;
  spaceships.appendChild(crew);
  return crew;
}

// 6. feladat 2)
function maxCapacity(cargo) {
  var max = cargo[0];
  for (var i = 0; i < cargo.length; i++) {
    if (parseInt(cargo[i].cargo_capacity) > parseInt(max.cargo_capacity)) {
      max = cargo[i];
    }
  }
  var spaceships = document.querySelector('.spaceship-list');
  var cap = document.createElement('p');
  cap.innerText = `A legnagyobb teherbírással rendelkező hajó neve: ${max.denomination}.`;
  spaceships.appendChild(cap);
  return cap;
}

// 6. feladat 3)
function totalPassengers(pass) {
  var total = 0;
  for (var i = 0; i < pass.length; i++) {
    if (pass[i].passengers !== 'unknown') {
      total += parseInt(pass[i].passengers);
    }
  }
  var spaceships = document.querySelector('.spaceship-list');
  var sumPass = document.createElement('p');
  sumPass.innerText = `Az összes hajó összes utasának létszáma: ${total}`;
  spaceships.appendChild(sumPass);
  return sumPass;
}

// 6. feladat 4)
function longestShip(long) {
  var longest = long[0];
  for (var i = 0; i < long.length; i++) {
    if (parseInt(long[i].lengthiness) > (longest.lengthiness) && long[i].lengthiness !== 'unknown') {
      longest = long[i];
    }
  }
  var spaceships = document.querySelector('.spaceship-list');
  var imageName = document.createElement('p');
  imageName.innerText = `A leghosszabb hajó képének a neve: ${longest.image}`;
  spaceships.appendChild(imageName);
  return imageName;
}

// 7. feladat
var searching = document.querySelector('#search-button');
searching.onclick = function () {
  searchModel();
};
function searchModel(shipName) {
  var text = document.querySelector('#search-text').value;
  for (var i in shipName) {
    if (shipName[i].model.indexOf(text) > -1) {
      text = shipName[i];
    }
  }
  return shipName;
}

function getData(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successAjax(xhttp) {
  // Innen lesz elérhető a JSON file tartalma, tehát az adatok amikkel dolgoznod kell
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen lehet hívni.
  console.log(userDatas);
  console.log(sortDatas(userDatas));
  console.log(removeItems(userDatas));
  console.log(changeNull(userDatas));
  writeShipsToPage(userDatas);
  showShipRight(userDatas);
  numberOfCrew(userDatas);
  maxCapacity(userDatas);
  totalPassengers(userDatas);
  longestShip(userDatas);
  searchModel(userDatas);
}
getData('/json/spaceships.json', successAjax);
