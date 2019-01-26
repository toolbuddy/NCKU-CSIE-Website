import header from 'static/src/js/components/common/header/index.js';

window.addEventListener('load', ()=>{
    header( document.getElementById( 'header' ) );

    const canvas = document.getElementById('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener('resize', ()=>{
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    })
    const ctx = canvas.getContext('2d');
    class Circle {
        constructor(x, y){
            this.x=x
            this.y=y
        }
        static get color(){
            return '#0dc589'
        }
        static get radius(){
            return 17
        }
        draw(){
            ctx.beginPath()
            ctx.arc(
                this.x,
                this.y,
                Circle.radius,
                0,
                Math.PI*2,
                false
            )
            ctx.fillStyle = Circle.color
            ctx.fill();
        }
        update(){
            this.y+=1;
            if(this.y >= canvas.clientHeight)
                this.y=0;
        }
    }
    class Square {
        constructor(x, y){
            this.x=x
            this.y=y
        }
        static get color(){
            return '#faad06'
        }
        static get size(){
            return 30
        }
        draw(){
            ctx.beginPath()
            ctx.rect(
                this.x,
                this.y,
                Square.size,
                Square.size
            )
            ctx.fillStyle = Square.color
            ctx.fill();
        }
        update(){
            this.y+=1;
            if(this.y >= canvas.clientHeight)
                this.y=0;
        }
    }
    class Triangle {
        constructor(x, y){
            this.x=x
            this.y=y
        }
        static get color(){
            return '#f67057'
        }
        static get size(){
            return 30
        }
        draw(){
            ctx.beginPath()
            ctx.moveTo(this.x, this.y)
            ctx.lineTo(this.x, this.y+Triangle.size)
            ctx.lineTo(this.x + (Math.sqrt(3) * Triangle.size/2), this.y+(Triangle.size/2))
            ctx.closePath();
            ctx.fillStyle = Triangle.color
            ctx.fill();
        }
        update(){
            this.y+=1;
            if(this.y >= canvas.clientHeight)
                this.y=0;
        }
    }
    const c = new Circle(10,0)
    const s = new Square(20,0)
    const t = new Triangle(30,0)
    const animation = ()=>{
        ctx.clearRect(0,0,canvas.width,canvas.height)
        c.draw();
        c.update();
        s.draw();
        s.update();
        t.draw();
        t.update();
        requestAnimationFrame(animation)
    }
    animation();
})