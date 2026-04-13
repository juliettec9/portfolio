
function generateCombination() {
  let combinationToGuess = '';
  
  for (let pos=0; pos <=4; pos++) {
    let color = Math.floor(colors.length*Math.random());
    combinationToGuess += colors[color];  
  }
  return combinationToGuess;
}

function clickedOnSend(evt) {
  console.log("Combinaison:", combination.value);

  // si pas 5 cercles on ne se fatigue pas a tester
  if (combination.value.length != 5) {
    return;
  }
  
  // Comparer la proposition avec la combinaison
  // et mettre le resulat dans result
  let result = compareCombinations(combination.value);
  
  // Afficher le resultat
  if (result.piecesInTheRightPosition == 5) {  
    document.querySelector("#message").innerHTML= 
    `Bravo! vous avez gagné!!!!! La combinaison choisie est  ${combinationToGuess}`;
  }
  else {
    document.querySelector("#message").innerHTML= 
    `Vous avec ${result.piecesInTheRightPosition} piece(s) bonnes et <br>
    ${result.piecesInTheWrongPosition} piece(s) dans la mauvaise position.`;
  }

  // Enregistrer dans l'histo
  let affichagePropositionhistorise = creationAffichageRond(combination.value);
  let lignehistorique = document.createElement("li");
  lignehistorique.innerHTML = `
  <li>
  <div class="horizontal">
  <div class="horizontal" onclick="clickedOnColor(event)">
  ${affichagePropositionhistorise}
    </div>
    <div>
    <p>Trouvées dans la bonne position ${result.piecesInTheRightPosition}.
    <br> Trouvées dans une mauvaise position 
    ${result.piecesInTheWrongPosition}</p>
    </div>
    </li>
    `;
  history.appendChild(lignehistorique);

  // Effacer  la barre
  combination.value = '';
  displayProposition(combination.value);
}

function displayProposition(combination) {
  //recuperation de l'object proposition
  let proposition = document.querySelector("#proposition");
  
  //creation du contenu
  let contenu = creationAffichageRond(combination);

  // affichage du contenu
  proposition.innerHTML = `${contenu}`;
}

function creationAffichageRond(listeValeur) {
  return [ ...listeValeur]
  .map( (item) => `<div class="color color-${item}"></div>`)
  .join("\n");
}

function clickedOnColor(evt) {
  
  let idElem = evt.srcElement.id;
  // je teste si on a bien cliqué sur une couleur ou delete
  if (!idElem) {
    return;
  }
  
  // je teste si delete
  if (idElem == "delete") {
    combination.value = 
      combination.value.substring(
        0,combination.value.length-1);
    
    displayProposition(combination.value);
    return;
  // sinon c'est un cercle de couleur
  } else if (combination.value.length <5){
      let color = idElem.slice(-1);
      console.log(`The color is ${color }` );
        // j'imprime la couleur
        combination.value += color;
        displayProposition(combination.value);
  }
}

function keypressed(evt) {
  console.dir(evt);
  console.log(`la combinaison est ${combination.value}, donc ${combination.value.length} caractères`);
  if (!colors.includes(evt.key) && !['Enter','Backspace','Delete'].includes(evt.key)) {
    evt.stopPropagation();
    evt.preventDefault();
    return;
  }
  if (combination.value.length==5 && evt.key == 'Enter') {
    clickedOnSend();
    return;
  }  
}

function compareCombinations(combination) {
 
  let solution = [ ...combinationToGuess ];
  let proposition = [ ...combination ];
  
  let piecesInTheRightPosition = 0;
  let piecesInTheWrongPosition = 0;
  
  for (let i=0; i<solution.length; i++){
      if (solution[i] == proposition[i]) {
          piecesInTheRightPosition++;
          proposition[i] = "-";
          solution[i] = "x";
      }
  }
  for (let i=0; i<solution.length; i++){
    for (let j=0; j<proposition.length; j++){
      if (i != j && 
          solution[i] == proposition[j]) {
        piecesInTheWrongPosition++;
        proposition[j] = "-"
        break;
      }

    }
  }

    return {
      piecesInTheRightPosition: piecesInTheRightPosition,
      piecesInTheWrongPosition: piecesInTheWrongPosition
           };
}
  
function testLogic() {
  combinationToGuess = 'rggry';
  
  let result;
  
  let combination = 'vvvvy';
  
  result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 1 || result.piecesInTheWrongPosition != 0) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }
  
  combination = 'vyvvv';
    
  result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 0 || result.piecesInTheWrongPosition != 1) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }
    
  combination = 'rvvvv';
    
  result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 1 || result.piecesInTheWrongPosition != 0) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }
    
  combination = 'rrvvv';
    
  result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 1 || result.piecesInTheWrongPosition != 1) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }
    
  combination = 'vrvrv';
    
  result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 1 || result.piecesInTheWrongPosition != 1) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }
    
  combination = 'vrrvv';
    
  result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 0 || result.piecesInTheWrongPosition != 2) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }
  
  
  combinationToGuess = 'rgggg';
  combination = 'rrvvv';
    
  result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 1 || result.piecesInTheWrongPosition != 0) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }
    
  combinationToGuess = 'rgggg';
  combination = 'ggggr';
  
    result =compareCombinations(combination); // == {piecesInTheRightPosition:1,  });
  if (result.piecesInTheRightPosition != 3 || result.piecesInTheWrongPosition != 2) {
    console.error(`Bad logic, combination ${combination}, solution ${combinationToGuess}, result ${JSON.stringify(result)}`);
  }  
}
  
  /*-------------------------------------------*/
  // Global scope
  /*-------------------------------------------*/
  
  const colors=['r','g','b','y','v'];
  let combinationToGuess;
  let combination = document.querySelector("#combination");
  let history = document.querySelector("#history");
  let proposition = [];

  testLogic();
  combinationToGuess = generateCombination();
  console.log("La combinaison choisie est", combinationToGuess);