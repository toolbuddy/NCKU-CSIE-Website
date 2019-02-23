import GetHeader from 'static/src/js/components/common/header.js';
import img404Src from 'static/src/image/icon/404.png';

window.addEventListener( 'load', () => {
    const header = new GetHeader( {
        headerDOM: document.getElementById( 'header' ),
    } );

    const img404 = new Image();
    img404.src = img404Src;
    img404.size = 1135;

    const canvas = document.getElementById( 'banner' );
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext( '2d' );

    class Shape {
        constructor ( x = 0, y = 0 ) {
            this.x = x;
            this.y = y;
            this.degree = Math.floor( Math.random() * 360 );
        }

        static get size () {
            return 20;
        }

        static degreeToRadius ( degree ) {
            return Math.PI * degree / 180;
        }

        update () {
            this.degree += 1;
            this.degree %= 360;
            this.y += 1;
            if ( this.y >= canvas.height + Shape.size )
                this.y = -Shape.size;
        }
    }
    class Circle extends Shape {
        static get color () {
            return '#0dc589';
        }

        draw () {
            ctx.beginPath();
            ctx.arc(
                this.x,
                this.y,
                Circle.size,
                0,
                Math.PI * 2,
                false
            );
            ctx.fillStyle = Circle.color;
            ctx.fill();
        }
    }
    class Square extends Shape {
        static get color () {
            return '#faad06';
        }

        draw () {
            ctx.beginPath();
            ctx.moveTo(
                this.x - Square.size * Math.sin( Square.degreeToRadius( this.degree ) ),
                this.y + Square.size * Math.cos( Square.degreeToRadius( this.degree ) )
            );
            for ( let i = 1; i <= 3; ++i ) {
                ctx.lineTo(
                    this.x - Square.size * Math.sin( Square.degreeToRadius( this.degree + i * 90 ) ),
                    this.y + Square.size * Math.cos( Square.degreeToRadius( this.degree + i * 90 ) )
                );
            }
            ctx.fillStyle = Square.color;
            ctx.fill();
        }
    }
    class Triangle extends Shape {
        static get color () {
            return '#f67057';
        }

        static get width () {
            return Triangle.size * Math.sin( Triangle.degreeToRadius( 120 ) ) / Math.sin( Triangle.degreeToRadius( 30 ) );
        }

        draw () {
            ctx.beginPath();
            ctx.moveTo(
                this.x - Triangle.size * Math.sin( Triangle.degreeToRadius( this.degree ) ),
                this.y + Triangle.size * Math.cos( Triangle.degreeToRadius( this.degree ) )
            );
            for ( let i = 1; i <= 2; ++i ) {
                ctx.lineTo(
                    this.x - Triangle.size * Math.sin( Triangle.degreeToRadius( this.degree + i * 120 ) ),
                    this.y + Triangle.size * Math.cos( Triangle.degreeToRadius( this.degree + i * 120 ) )
                );
            }
            ctx.closePath();
            ctx.fillStyle = Triangle.color;
            ctx.fill();
        }
    }
    class Star extends Shape {
        static get color () {
            return '#399dff';
        }

        static get shrink () {
            return Star.size * Math.sin( Star.degreeToRadius( 18 ) ) / Math.sin( Star.degreeToRadius( 126 ) );
        }

        draw () {
            ctx.beginPath();
            ctx.moveTo(
                this.x - Star.size * Math.sin( Star.degreeToRadius( this.degree ) ),
                this.y + Star.size * Math.cos( Star.degreeToRadius( this.degree ) )
            );
            for ( let i = 1; i <= 9; ++i ) {
                ctx.lineTo(
                    this.x - ( ( i % 2 ? Star.shrink : Star.size ) * Math.sin( Star.degreeToRadius( this.degree + ( i * 36 ) ) ) ),
                    this.y + ( ( i % 2 ? Star.shrink : Star.size ) * Math.cos( Star.degreeToRadius( this.degree + ( i * 36 ) ) ) )
                );
            }
            ctx.fillStyle = Star.color;
            ctx.fill();
        }
    }
    let shapes = [];
    const numberOf = {
        circle:   10,
        square:   10,
        star:     10,
        triangle: 10,
    };
    const genShapes = () => {
        shapes = [];
        for ( let i = 0; i < numberOf.circle; ++i ) {
            shapes.push( new Circle(
                Math.floor( Math.random() * window.innerWidth ),
                Math.floor( Math.random() * window.innerHeight ),
            ) );
        }
        for ( let i = 0; i < numberOf.square; ++i ) {
            shapes.push( new Square(
                Math.floor( Math.random() * window.innerWidth ),
                Math.floor( Math.random() * window.innerHeight ),
            ) );
        }
        for ( let i = 0; i < numberOf.triangle; ++i ) {
            shapes.push( new Triangle(
                Math.floor( Math.random() * window.innerWidth ),
                Math.floor( Math.random() * window.innerHeight ),
            ) );
        }
        for ( let i = 0; i < numberOf.star; ++i ) {
            shapes.push( new Star(
                Math.floor( Math.random() * window.innerWidth ),
                Math.floor( Math.random() * window.innerHeight ),
            ) );
        }
    };

    const animation = () => {
        ctx.clearRect( 0, 0, canvas.width, canvas.height );
        shapes.forEach( ( shape ) => {
            shape.draw();
            shape.update();
        } );
        ctx.drawImage(
            img404,
            canvas.width > img404.size ? ( canvas.width - img404.size ) / 2 : 0,
            canvas.height > img404.size ? ( canvas.height - img404.size ) / 2 : 0,
            canvas.width > img404.size ? img404.size : canvas.width,
            canvas.width > img404.size ? img404.size : canvas.width
        );
        requestAnimationFrame( animation );
    };
    genShapes();
    animation();
    window.addEventListener( 'resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        genShapes();
    } );
} );
