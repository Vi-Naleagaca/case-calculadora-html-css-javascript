var display = document.getElementById("display");

var operacaoBottons = [];
//operacaoButtons foi definida uma array com o simbolo []
//operações 
//pegando os ids do html com o comando .push e utilizando o método document.getElementById, para acessar os ids do html
operacaoBottons.push(document.getElementById("soma"));
operacaoBottons.push(document.getElementById("div"));
operacaoBottons.push(document.getElementById("multip"));
operacaoBottons.push(document.getElementById("sub"));

//números do teclado da calculadora
operacaoBottons.push(document.getElementById("num0"));
operacaoBottons.push(document.getElementById("num1"));
operacaoBottons.push(document.getElementById("num2"));
operacaoBottons.push(document.getElementById("num3"));
operacaoBottons.push(document.getElementById("num4"));
operacaoBottons.push(document.getElementById("num5"));
operacaoBottons.push(document.getElementById("num6"));
operacaoBottons.push(document.getElementById("num7"));
operacaoBottons.push(document.getElementById("num8"));
operacaoBottons.push(document.getElementById("num9"));
operacaoBottons.push(document.getElementById("ponto"));

//teclas bonus
var btnResultado = document.getElementById("resultado");
var btnCleanAll = document.getElementById("cleanAll");
var btnCleanDigit = document.getElementById("cleanDigit");


var contador = 0;
var limite = 1;


for (var i = 0; i < operacaoBottons.length; i++)
{

	operacaoBottons[i].addEventListener("click", writeOnDisplay);
}

btnResultado.onclick = function ()
{
	calcResultado();
};

btnCleanDigit.onclick = function ()
{

	cleanDigit();
};

btnCleanAll.onclick = function () 
{
	
	display.value = "";
	contador = 0;
};

//funcionalidades
function calcResultado()
{


	if (verificaOperacao(display.value.substring(display.value.length - 1, display.value.length))) 
	{
			cleanDigit();
	}

	var calcValor = calcularArray(display.value);

	if (calcValor || calcValor == "0")
	{

		display.value = calcValor;

	}

}

function cleanDigit()
{

	if (display.value.length > 0)
	{

		if (display.value[display. value.length - 1] === ".")
		{
			contador = 0;
		}
		//usar a substring para extrair apenas uma parte da string orginal, ou seja, nesse caso estamos pegando a string display.value e extraindo -1 que é o ultimo digito
		display.value = display.value.substring(0, display.value.length -1);
	}
}

function writeOnDisplay() 
{
  ultDigito = this.value;

	  if (verificaOperacao(ultDigito))
	  {
		    contador = 0;
		    if (verificaOperacao(display.value.substring(display.value.length - 1, display.value.length))) 
		    { 
		      cleanDigit();
		      //troca o operador anterior pelo novo escolhido
	     	}
	  } 

	  //se verificando que o ultimo digito é o ponto decimal com o contador++ a condição continua acontecendo
	  if (verificaPontoDecimal (ultDigito) === true)
	   {
	  	 contador++;

	  		if (contador > limite)
	  		{

	  			return;

  			}
  		}
  //adiciona o valor no display
  display.value += ultDigito;
}

function verificaPontoDecimal(valorDigitado)
{

	if (valorDigitado === ".") {

		return true;
	}	else {

		return false;
	}

}

function verificaOperacao (operacaoValue)
{

	switch (operacaoValue)
	{

		case "*":

			return true;

		case "/":

			return true;

		case "+":

			return true;

		case "-":

			return true;

		default:

			 return false;

	}

}

function calcularArray(calc) 
{
  calc = calc.toString().split("+");

  for (a = 0; a < calc.length; a++) 
  {
	    calc[a] = calc[a].split("-");
	    for (b = 0; b < calc[a].length; b++) 
	    {

	      calc[a][b] = calc[a][b].split("*");
		      for (c = 0; c < calc[a][b].length; c++) 

		      {
		        calc[a][b][c] = calc[a][b][c].split("/");
		        calc[a][b][c] = divideArray(calc[a][b][c]);
		      }

		   calc[a][b] = multiplyArray(calc[a][b]);
	    }
	    calc[a] = subArray(calc[a]);
  }
  calc = somaArray(calc);

  return calc;
}

function multiplyArray(parametro) 
{
	var resultMult = 1;
	for (var x = 0; x < parametro.length; x++) 
	{
	   resultMult *= parametro[x];
	}
	
	return resultMult;
}

function divideArray(parametro)
{
	var resultDiv = parametro[0];
	for (var x = 1; x < parametro.length; x++)
	{
		resultDiv /= parametro[x];
	}

	return resultDiv;
}

function subArray(parametro)
{

	var resultSub = parametro[0];
	for (var x = 1; x < parametro.length; x++)
	{
		resultSub -= parametro[x];
	}

	return resultSub;
}

function somaArray(parametro)
{
	var resultSoma = 0;
	for (var x = 0; x < parametro.length; x++)
	{
		resultSoma += parametro[x];
	}

	return resultSoma;
}
