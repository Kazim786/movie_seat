const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie') //Gets the select element as well as all the options

let ticketPrice = +movieSelect.value //this will have the value. It is also a string. So i will add a + to turn it into a number


//Update total and count

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected')
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}


//Movie select event - when you change the movie the total should update
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
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
