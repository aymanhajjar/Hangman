let category = ''
let food_btn = document.getElementById('food')
let countries_btn = document.getElementById('countries')
let music_btn = document.getElementById('music')
let sports_btn = document.getElementById('sports')
let word = document.getElementById('word')
let keyboard = document.getElementById('keyboard')
let randomWord = ''
let win_counter = 0
let lose_counter = 0

const words = {
    food: ['apple', 'banana', 'pineapple', 'burger', 'tomato', 'cucumber', 'spaghetti', 'bread'],
    countries: ['lebanon', 'france', 'canada', 'mexico', 'brazil', 'japan', 'china', 'netherlands', 'sweden', 'spain', 'portugal', 'greece'],
    music: ['madonna', 'taylor swift', 'lil nas x', 'selena gomez', 'lil wayne', 'hailee steinfeld', 'rita ora', 'avicii', 'billie eilish', 'bebe rexha'],
    sports: ['messi', 'ronaldo', 'nadal', 'neymar', 'suarez', 'rooney']
}

function changeCategory(cat) {
    keyboard.classList.remove('inactiveBtn')
    lose_counter = 0
    win_counter = 0
    document.getElementById('image').src = `images/hangman.png`
    food_btn.classList.remove('btnActive')
    countries_btn.classList.remove('btnActive')
    music_btn.classList.remove('btnActive')
    sports_btn.classList.remove('btnActive')
    if(cat == 'food') {
        category = 'food'
        food_btn.classList.add('btnActive')
    } else if(cat == 'countries') {
        category = 'countries'
        countries_btn.classList.add('btnActive')
    } else if(cat == 'music') {
        category = 'music'
        music_btn.classList.add('btnActive')
    } else {
        category = 'sports'
        sports_btn.classList.add('btnActive')
    }

    startGame()
}

function startGame() {
    lose_counter = 0
    win_counter = 0
    let buttons = document.getElementsByClassName('keyBtn')

    for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('inactiveBtn')
        buttons[i].classList.remove('correct')
        buttons[i].classList.remove('incorrect')
     }
    word.innerHTML = ''
    if(category == 'food') {
        randomWord = words.food[Math.floor(Math.random() * words.food.length)]
    } else if(category == 'countries') {
        randomWord = words.countries[Math.floor(Math.random() * words.countries.length)]
    } else if(category == 'music') {
        randomWord = words.music[Math.floor(Math.random() * words.music.length)]
    } else {
        randomWord = words.sports[Math.floor(Math.random() * words.sports.length)]
    }


    for (var i = 0; i < randomWord.length; i++) {
        if(randomWord[i] != ' ') {
            word.innerHTML += ` <span id=${i}> _ </span>`
        } else {
            word.innerHTML += '&nbsp;'
        }
      }
}

function checkLetter (i) {
    let found = false

    for (var a = 0; a < randomWord.length; a++) {
        if(i == randomWord[a]) {
            win_counter++
            document.getElementById(a).innerHTML = ` ${i} `
            document.getElementById(i).classList.add('inactiveBtn')
            document.getElementById(i).classList.add('correct')
            found = true
        }
    }

    if(!found) {
        document.getElementById(i).classList.add('inactiveBtn')
        document.getElementById(i).classList.add('incorrect')
        lose_counter++
        document.getElementById('image').src = `images/hangman${lose_counter}.png`
    }

    if(lose_counter == 9) {
        youLose()
    }
    
    if(win_counter == randomWord.replace(/ /g,'').length) {
        youWin()
    }

}

function youLose() {
    document.getElementById('status').innerHTML = `You Lost! The word was "${randomWord}"`
    document.getElementById('status').classList.add('youlose')
    startGame()
}

function youWin() {
    document.getElementById('status').innerHTML = `You Win! The word was "${randomWord}"`
    document.getElementById('image').src = `images/hangman.png`
    document.getElementById('status').classList.add('youwin')
    startGame()
}