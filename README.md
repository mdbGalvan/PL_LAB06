# Sinatra example Using PEG.js and DataMapper

## Resumen

>Se reescribe el *Analizador Sintáctico de [PL0 Grammar](http://en.wikipedia.org/wiki/Recursive_descent_parser)* realizado en la realizado en esa práctica [práctica 5](http://pl-lab05.herokuapp.com/) usando en esta ocasión *PEG.js*.

>Además, se tuvo que:

>1. Modificar **block** y **statement** para que los **procedure** reciban argumentos y las llamadas (**call**) a procedimiento puedan pasar argumentos. 
>2. Añadir `if ... then ... else ....`
>3. Actualizar la documentación de la gramática para que reflejara la gramática ampliada.
>4. Límitar el número de programas que se pueden salvar a un número prefijado, por ejemplo 10. Si se intenta salvar uno se suprime uno al azar y se guarda el nuevo.
>5. Comprobar en las pruebas que la **asociatividad a izquierdas** funciona bien y probar todos los constructos del lenguaje así como alguna situación de error.

>>![alt text](http://pl-lab06.herokuapp.com/images/PL0.png "PL/0")

## Motivación

>La aplicación fue propuesta para ser desarrolla en la asignatura **Procesadores de Lenguajes**, del tercer año del **Grado en Ingeniería Informática**. Se corresponde con la 6ª práctica de la asignatura.

##  Funcionamiento

>Puede probar en [Heroku](http://pl-lab06.herokuapp.com/), el funcionamiento del *Analizador Sintáctico del Lenguaje PL/0 usando PGE.js*.

>Pueden cargarse ejemplos previamente *salvados* de la gramática PL/0 cliqueando sobre ellos, también es posible subir un fichero propio o incluso introducir el código en el textarea. Una vez, cargada puedes pulsar el botón de parse para analizar el código. Luego, se muestra el resultado de lo analizado.

>También, cabe la opción de guardar el código introducido (por fichero o a mano). Para ello, se deberá introducir un nombre en el recuadro que se encuentra debajo de: `Save the code as` y clickear.

## Desarrollo

>Los lenguajes y herramientas (frameworks, librerías, etc.) utilizados para el desarrollo del presente proyecto fueron:

>* [Ruby gems](http://rubygems.org/)
* [Sinatra](http://www.sinatrarb.com/configuration.html)
* [Heroku](https://dashboard.heroku.com/apps)
* HTML/CSS/Javascript
* [JQuery](http://jquery.com/)
* [PEG.js](http://pegjs.majda.cz/)
* [DataMapper](http://datamapper.org/docs/)
* [Sass](http://sass-lang.com/) 
* [MathJax](http://docs.mathjax.org/en/latest/start.html)

## Tests

>Entorno de pruebas basado en [Mocha](http://visionmedia.github.io/mocha/) y [Chai](http://chaijs.com/guide/installation/). 

>Pueden ejecutarse las pruebas [aquí](http://pl-lab06.herokuapp.com/tests).


## Colaboradores

| Autores | E-mail |
| ---------- | ---------- |
| María D. Batista Galván   | magomenlopark@gmail.com  |


## Licencia

>Léase el archivo LICENSE.txt.