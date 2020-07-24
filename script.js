const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie') //Gets the select element as well as all the options

populateUi()

let ticketPrice = +movieSelect.value //this will have the value. It is also a string. So i will add a + to turn it into a number



//Save selected movie index and price

function setMovieData(movieIndex, moviePrice){
    //get and set
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}


//Update total and count

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    }) 
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

//Get data from localstorage and populate UI

function populateUi(){
    //get and set methods
    //So the seats are shown as they are saved in local storage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    if(selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach((seat, index) => {
            //if indexOf is -1 that means the element doesnt exist. Thats why our boolean is checking for greater than -1
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }
    
    //So movie index is shown in the UI as it is saved in local storage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event - when you change the movie the total should update
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    // console.log(e.target.selectedIndex, e.target.value) 
    //the select tag has within it option tags. Think of the select tag as an array and 
    //the number of options within it as elements within an array
    //selectedIndex is a property which either sets or returns the index of the selected option in a drop-down list. Remember that the options are like elements within an array
    //.value gives us the value (price) that we have put within the option tags 
    setMovieData(e.target.selectedIndex, e.target.value)
    updateSelectedCount()
})




//seat click event
container.addEventListener('click', (e) => {
    // console.log(e.target) //gives exact element that is clicked on

    if(e.target.classList.contains('seat') && 
    !e.target.classList.contains('occupied')){

        e.target.classList.toggle('selected')
        updateSelectedCount()


    } 
})

//Initial count and total set

updateSelectedCount()
