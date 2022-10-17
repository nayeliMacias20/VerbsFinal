
//Elementos que se mostrarán.
const showVerb = document.getElementById("showVerb");
const showImage = document.getElementById("showImage");
const showAudio = document.getElementById("showAudio");

const next = document.getElementById("next");
const verbsCounter = document.getElementById("verbs-counter");
const allRightCounter = document.getElementById("all-right-counter");
const verbsContainer = document.getElementById("verbs-container");

const first = document.getElementById("first-verb");
const second = document.getElementById("second-verb");
const third = document.getElementById("third-verb");
const fourth = document.getElementById("fourth-verb");

//Numero de verbos que tenemos.
const numberOfVerbs = verbs.length;

//console.log(numberOfVerbs);
//Array de números al azar
let answerRoullete = [0,1,1,1];
let everyNumberOfVerbs = [];
//Variable que maneja la respuesta correcta
let rightAnswer;
//Variable que maneja la respuesta correcta
let rightAnswersCounter = 0;

//Funcion para que el usuario escuche los audios. AddEvent"Escuchador"
//responde con el verbo
next.addEventListener("click", function(){
    ponerVerbo();
    next.style.display = 'none';
    //alert('holis') 
});

//Funcion para generar los verbos random
makeRandomList();

//guarda la ultima posición
//let lastPosition = everyNumberOfVerbs = length - 1;
let lastPosition = everyNumberOfVerbs.length-1;
//Funcion para guardar la ultima posición
function makeRandomList() {
    for (var i = 0; i < numberOfVerbs; i++) {
        everyNumberOfVerbs.push(i);
    }
    //Sort es para ordenar para enviarle un núm aleatorios.
    everyNumberOfVerbs = everyNumberOfVerbs.sort(() => Math.random() - 0.5);
}
//Funcion del efecto de cambio de botón 
function buttonEffect(itsRight, button) {
    if (itsRight) {
        //classList remove se utiliza para cambiar la clase y para agregar es add
        button.classList.add('rightAnswer');
        setTimeout(function(){
            button.classList.remove('rightAnswer');
        }, 1000);
        //Sumamos en el contador de la rspuesta correcta
        rightAnswersCounter = rightAnswersCounter + 1;
    } else {
        //classList remove se utiliza para cambiar la clase y para agregar es add
        button.classList.add('wrongAnswer');
        setTimeout(function(){
            button.classList.remove('wrongAnswer');
        }, 1000);
    }
    //Funcion de poner el verbo
    setTimeout(function() {
        ponerVerbo();
    }, 500);
}
//Botones 
first.addEventListener("click", function() {
    buttonEffect(isItRight_(first.innerHTML), this);
});
second.addEventListener("click", function(){
    buttonEffect(isItRight_(second.innerHTML),this);
});
third.addEventListener("click", function() {
    buttonEffect(isItRight_(third.innerHTML), this);
});
fourth.addEventListener("click", function() {
    buttonEffect(isItRight_(fourth.innerHTML), this);
});
//Funcion donde nos da diferentees valors.
function shuffleAnswer(array) {
    let numberOfAnswerButtons = array.length;
    //Index random
    let randomIndex;
    while (numberOfAnswerButtons != 0) {
        randomIndex = Math.floor(Math.random() * numberOfAnswerButtons);
        numberOfAnswerButtons--;
        //Intercambiar valores 
        [array[numberOfAnswerButtons], array[randomIndex]] = [array[randomIndex], array[numberOfAnswerButtons]];
    }
    // test.innerHTML += array[0] + '' + array[1] + '' + array[2] + '' + array[1]
    return array;
}
//Funcion de la respuesta correcta.
function isItRight_(answer) {
    //es la respuesta correcta?
    return answer == rightAnswer?true:false;
}
//Aleatoriamente los verbos en español
function randomVerbo(notThisOne) {
    //se pondrán las 4 respuestas
    //y se les pasará la verdadera para que genere otras 3 malas.
    theOne = Math.floor(Math.random()*verbos.length);
    //si no es la misma se le agrega un metodo recursivo 
    return theOne == notThisOne?randomVerbo(notThisOne):theOne;
}
//Funcion poner el verbo
function ponerVerbo() {
    //Suffle es un arreglo y toma el array vacio y le agregara información
    answerRoullete = shuffleAnswer(answerRoullete);
    let randomPosition = everyNumberOfVerbs[lastPosition];
    //utilizaremos el source para las imagenes.
    let imgText = "<img src = 'Img/" + verbs[randomPosition] + ".png' height:'140px' width='100px'>";

    //Añadimos a los botones estilo.
    first.classList.add("btn","btn-outline-primary","btn-md");
    second.classList.add("btn","btn-outline-primary","btn-md");
    third.classList.add("btn","btn-outline-primary","btn-md");
    fourth.classList.add("btn","btn-outline-primary","btn-md");

    if (lastPosition >= 0) {
        var just_position = lastPosition + 1;
        verbsCounter.innerHTML = "" + just_position + " /" + numberOfVerbs;
        //mandara la cantidad de respuestas correctas
        allRightCounter.innerHTML = "Right Answers: " + rightAnswersCounter;
        showVerb.innerHTML = verbs[randomPosition];
        //Nos va a mandar a llamar la imagen.
        showImage.innerHTML = imgText;
        //Nos va a mandar a llamar el audio.
        showAudio.src = "audio/" + verbs[randomPosition] + ".mp3";
        showAudio.play();

        first.innerHTML = !answerRoullete[0]?verbos[randomPosition] : verbos[randomVerbo(randomPosition)];
        second.innerHTML = !answerRoullete[1]?verbos[randomPosition] : verbos[randomVerbo(randomPosition)];
        third.innerHTML = !answerRoullete[2]?verbos[randomPosition] : verbos[randomVerbo(randomPosition)];
        fourth.innerHTML = !answerRoullete[3]?verbos[randomPosition] : verbos[randomVerbo(randomPosition)];

        rightAnswer = verbos[randomPosition];
        lastPosition = lastPosition - 1;
    }
    else {
        //Terminamos el juego.
        verbsCounter.innerHTML = "0 / "+numberOfVerbs;
        allRightCounter.innerHTML = "Right answers: "+rightAnswersCounter;
        showVerb.innerHTML = "Thank you !";
        //Vaciamos el contenedor de verbos
        verbsContainer.innerHTML = "";
    }

}
function audiorepeat(){
    showAudio.play();
}
//Funcion de poner el verbo
//function ponerVerbo(){
//showVerb.innerHTML = "Deposita 200 bitcoins para jugar"
//}