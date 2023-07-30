'use strict';

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

class Workout {
  date = new Date();
  id = (Date.now() + '').slice(-10);
  // prettier-ignore
  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  constructor(coord, distance, duratin) {
    this.coord = coord;
    this.distance = distance;
    this.duratin = duratin;
  }

  setDate() {
    this.discreptin = `${this.type} on ${
      this.months[this.date.getMonth()]
    } ${this.date.getDate()}`;
  }
}

class Running extends Workout {
  type = 'running';
  constructor(coord, distance, duratin, cadence) {
    super(coord, distance, duratin);
    this.cadence = cadence;
    this.calcpace();
    this.setDate();
  }

  calcpace() {
    //min/Km
    this.pace = this.duratin / this.distance;
    return this.pace;
  }
}

class Cycling extends Workout {
  type = 'cycling';
  constructor(coord, distance, duratin, Elevation) {
    super(coord, distance, duratin);
    this.Elevation = Elevation;
    this.calcSpeed();
    this.setDate();
  }

  calcSpeed() {
    //speed unit is KM/h
    this.speed = this.distance / (this.duratin / 60);
    return this.speed;
  }
}

class App {
  _map;
  _mapEvent;
  _mapCoords;
  _data = [];

  constructor() {
    this._getPosition();

    this._getLocalStorage();

    form.addEventListener('submit', this._dataRender.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  _showForm(event) {
    this._mapEvent = event;
    form.classList.remove('hidden');
  }

  _loadTheMap(position) {
    const curPosition = [position.coords.latitude, position.coords.longitude];

    this._map = L.map('map').setView(curPosition, 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this._map);

    this._map.on('click', this._showForm.bind(this));
    this._data.forEach(work => {
      this._setMarker(work);
    });
  }

  _getPosition() {
    navigator.geolocation.getCurrentPosition(
      this._loadTheMap.bind(this),
      function () {
        alert('failed to show your current location');
      }
    );
  }

  _toggleElevationField(e) {
    e.preventDefault();
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
  }

  _testData(vall1, vall2, vall3) {
    if (vall1 === '' || vall2 === '' || vall3 === '') return true;
    if (!isFinite(vall1) || !isFinite(vall2) || !isFinite(vall3)) return true;
    if (vall1 <= 0 || vall2 <= 0 || vall3 <= 0) return true;
    return false;
  }

  _clearTheFeld() {
    inputElevation.value =
      inputCadence.value =
      inputDistance.value =
      inputDuration.value =
        '';
  }

  _hideForm() {
    form.classList.add('hidden');
  }

  _setMarker(workout) {
    L.marker(workout.coord)
      .addTo(this._map)
      .bindPopup(
        L.popup({
          closeOnClick: false,
          autoClose: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(`${workout.type} on ${workout.discreptin}`)
      .openPopup();
  }

  _renderLapleForWorkout(workout) {
    let html = `
     <li class="workout workout--${workout.type}" data-id=${workout.id}>
       <h2 class="workout__title">${workout.discreptin}</h2>
       <div class="workout__details">
       <span class="workout__icon">${
         workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
       }</span>
       <span class="workout__value">${workout.distance}</span>
       <span class="workout__unit">km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⏱</span>
      <span class="workout__value">${workout.duratin}</span>
    <span class="workout__unit">min</span>`;

    if (workout.type === 'running')
      html += `         
     </div>
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.pace.toFixed(1)}</span>
      <span class="workout__unit">min/km</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">🦶🏼</span>
      <span class="workout__value">${workout.cadence}</span>
      <span class="workout__unit">spm</span>
    </div>
  </li>`;

    if (workout.type === 'cycling')
      html += `
    </div>
    <div class="workout__details">
      <span class="workout__icon">⚡️</span>
      <span class="workout__value">${workout.speed.toFixed(1)}</span>
      <span class="workout__unit">km/h</span>
    </div>
    <div class="workout__details">
      <span class="workout__icon">⛰</span>
      <span class="workout__value">${workout.Elevation}</span>
      <span class="workout__unit">m</span>
    </div>
  </li>`;

    form.insertAdjacentHTML('afterend', html);
  }

  _dataRender(e) {
    e.preventDefault();
    this._mapCoords = [this._mapEvent.latlng.lat, this._mapEvent.latlng.lng];

    const testE = this._testData(
      inputDistance.value,
      inputDuration.value,
      inputType.value === 'running' ? inputCadence.value : inputElevation.value
    );
    if (testE) return alert('unvalid number');

    if (inputType.value === 'running') {
      const workout = new Running(
        this._mapCoords,
        inputDistance.value,
        inputDuration.value,
        inputCadence.value
      );
      this._data.push(workout);
      this._setMarker(workout);
      this._renderLapleForWorkout(workout);
      this._setLocalStorage();
    }

    if (inputType.value === 'cycling') {
      const workout = new Cycling(
        this._mapCoords,
        inputDistance.value,
        inputDuration.value,
        inputElevation.value
      );
      this._data.push(workout);
      this._setMarker(workout);
      this._renderLapleForWorkout(workout);
      this._setLocalStorage();
    }

    this._clearTheFeld();
    this._hideForm();
  }

  _moveToPopup(e) {
    // BUGFIX: When we click on a workout before the map has loaded, we get an error. But there is an easy fix:
    if (!this._map) return;

    const workoutEl = e.target.closest('.workout');

    if (!workoutEl) return;

    const workout = this._data.find(work => work.id === workoutEl.dataset.id);

    this._map.setView(workout.coord, 13, {
      animate: true,
      pan: {
        duration: 1,
      },
    });
  }

  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this._data));
  }

  _getLocalStorage() {
    const data1 = JSON.parse(localStorage.getItem('workouts'));

    if (!data1) return;

    this._data = data1;

    this._data.forEach(work => {
      this._renderLapleForWorkout(work);
    });
  }
}

const app = new App();
