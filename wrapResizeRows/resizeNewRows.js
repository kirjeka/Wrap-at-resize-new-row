
function resizeNewRows(className, classPWrapper, spanWrapperClass){


        let titleH1 = className;
        let innerSpan = document.createElement('span');
        innerSpan.setAttribute('class',`${spanWrapperClass}`)

        innerSpan.innerText = className.get(0).innerText;
        className.get(0).innerText = ''
        className.append(innerSpan)

        let spanWrapper = className.find('span')
        let pageTitleSpan = spanWrapper.get(0);
        let text = pageTitleSpan.textContent;
        let span = document.createElement('span');
        span.textContent = text;




function calculateRowsCounter(classPWrapper) {

    let finalP = document.createElement('p');
    finalP.setAttribute("class",`${classPWrapper}`);
    let finalPagetitle = pageTitleSpan;
    // переопределяем тайтл спан
    finalPagetitle.innerHTML = "";
    finalPagetitle.appendChild(span);
    let rows = span.getClientRects().length;
    finalPagetitle.innerHTML = span.textContent;

    if(span.innerHTML === ""){
        span.remove();
    }

    for (var i = 1; i <= rows; i++) {
        let index = i
        const resultSpan = document.createElement('span');
        let classesToAdd = [`spanWrapperClass`,"elem"+`${index}`]
        resultSpan.classList.add(...classesToAdd)
        const bR = document.createElement('br');
        resultSpan.textContent = getLine(finalPagetitle, i);
        finalP.appendChild(resultSpan);
        finalP.appendChild(bR);
    }

    while(finalPagetitle.firstChild){
        finalPagetitle.removeChild(finalPagetitle.firstChild);
    }

    finalPagetitle.appendChild(finalP);

}//end function calcRowCount

function getLine(finalPagetitle, lineNum) {
    console.log('getLine');
    lineNum--;
    var spanChildren = finalPagetitle.getElementsByTagName("span");
    var paragraphText = finalPagetitle.innerHTML.replace(/(\r\n|\n|\r)/gm, "");
    var newParagraphText = "";
    var words = [];
    let p = document.createElement('p');
    let max;


    if (spanChildren.length === 0) {
        words = paragraphText.split(" ");

        for (let i=0; i < words.length; i++) {
            newParagraphText += '<span>' + words[i] + "</span> ";
            finalPagetitle.innerHTML = newParagraphText;
        }
    }
    else {

        for(let i=0; i < spanChildren.length; i++) {
            words[words.length] = spanChildren[i].innerHTML;
        }
    }

    var lineCounter = 0;
    var previousY = spanChildren[0].offsetTop;
    var returnText = "";
    var startReturning = false;

    for (let i=0; i < words.length; i++) {
        if (spanChildren[i].offsetTop != previousY) lineCounter++;
        if (lineCounter === lineNum) startReturning = true;
        if (lineCounter !== lineNum && startReturning) return returnText.substring(0, returnText.length - 1);
        if (startReturning) {
            returnText += words[i] + " ";
            if (i + 1 === words.length) return returnText.substring(0, returnText.length - 1);
        }
        previousY = spanChildren[i].offsetTop;
    }

}//end function getLine
    // if ( spanWrapper.length > 0 ){

        window.onload = function (){
            calculateRowsCounter(classPWrapper);
        }
        window.onresize = function (){
            calculateRowsCounter(classPWrapper);
        }
    // }; //if--end

}


//-----------------------------------------------------

