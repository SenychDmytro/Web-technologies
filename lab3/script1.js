// =======================
// 1.2.3 – car1 за new Object()
// =======================
const car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.driver = new Object();
car1.driver.name = "Dmytro Senych";
car1.driver.category = "C";
car1.driver.personalLimitations = "No driving at night";
car1.driver.tuning = true;
car1.driver.numberOfAccidents = 0;

// 1.2.5 – метод drive для car1
car1.drive = function() {
    console.log("I am not driving at night");
};
console.log("=== car1.drive() ===");
car1.drive();

// =======================
// 1.2.4 – car2 літерал
// =======================
const car2 = {
    color: "blue",
    maxSpeed: 200,
    driver: {
        name: "Dmytro Senych",
        category: "B",
        personalLimitations: null,
        tuning: false,
        numberOfAccidents: 2
    }
};

// 1.2.6 – метод drive для car2
car2.drive = function() {
    console.log("I can drive anytime");
};
console.log("=== car2.drive() ===");
car2.drive();

// =======================
// 1.2.7 – Конструктор Truck
// =======================
function Truck(color, weight, avgSpeed, brand, model) {
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    this.trip = function() {
        if (!this.driver) {
            console.log("No driver assigned");
        } else {
            let night = this.driver.nightDriving ? "drives at night" : "does not drive at night";
            console.log(`Driver ${this.driver.name} ${night} and has ${this.driver.experience} years of experience`);
        }
    };
}

// 1.2.8 – метод AssignDriver через prototype
Truck.AssignDriver = function(truck, name, nightDriving, experience) {
    truck.driver = { name, nightDriving, experience };
};

// =======================
// 1.2.9 – створення об'єктів Truck та демонстрація trip
// =======================
const truck1 = new Truck("red", 5000, 80, "Volvo", "FH16");
const truck2 = new Truck("green", 4000, 70, "Scania", "R500");

// Присвоюємо водіїв
Truck.AssignDriver(truck1, "Dmytro Senych", true, 10);
Truck.AssignDriver(truck2, "Dmytro Senych", false, 5);

console.log("=== truck1.trip() ===");
truck1.trip();
console.log("=== truck2.trip() ===");
truck2.trip();

// =======================
// 1.2.12 – Класи геометричні
// =======================
class Square {
    constructor(a) { this.a = a; }
    static help() { console.log("Square: all sides equal, angles 90°"); }
    length() { return this.a * 4; }
    square() { return this.a * this.a; }
    info() {
        console.log(`Square a=${this.a}, Perimeter=${this.length()}, Area=${this.square()}`);
    }
}

class Rectangle extends Square {
    constructor(a, b) { super(a); this.b = b; }
    static help() { console.log("Rectangle: opposite sides equal, angles 90°"); }
    length() { return 2 * (this.a + this.b); }
    square() { return this.a * this.b; }
    info() { console.log(`Rectangle a=${this.a}, b=${this.b}, Perimeter=${this.length()}, Area=${this.square()}`); }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) { super(a); this.alpha = alpha; this.beta = beta; }
    static help() { console.log("Rhombus: all sides equal, opposite angles equal"); }
    length() { return this.a * 4; }
    square() { return +(this.a * this.a * Math.sin(this.alpha * Math.PI / 180)).toFixed(2); }
    info() { console.log(`Rhombus a=${this.a}, alpha=${this.alpha}, beta=${this.beta}, Perimeter=${this.length()}, Area=${this.square()}`); }
}

class Parallelogram extends Rhombus {
    constructor(a, b, alpha, beta) { super(a, alpha, beta); this.b = b; }
    static help() { console.log("Parallelogram: opposite sides equal, angles alpha/beta"); }
    length() { return 2 * (this.a + this.b); }
    square() { return +(this.a * this.b * Math.sin(this.alpha * Math.PI / 180)).toFixed(2); }
    info() { console.log(`Parallelogram a=${this.a}, b=${this.b}, alpha=${this.alpha}, beta=${this.beta}, Perimeter=${this.length()}, Area=${this.square()}`); }
}

// Демонстрація help
Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

// Створення об'єктів та виклик info
const sq = new Square(5);
const rect = new Rectangle(8, 4);
const rhomb = new Rhombus(6, 120, 60);
const para = new Parallelogram(7, 5, 110, 70);

sq.info();
rect.info();
rhomb.info();
para.info();

// =======================
// 1.2.25 – Triangular
// =======================
function Triangular(a=3, b=4, c=5) { return {a,b,c}; }

const triangle1 = Triangular();
const triangle2 = Triangular(6,8,10);
const triangle3 = Triangular(5,12,13);

console.log("Triangle1:", triangle1);
console.log("Triangle2:", triangle2);
console.log("Triangle3:", triangle3);

// =======================
// 1.2.26 – PiMultiplier
// =======================
function PiMultiplier(x) { return function() { return Math.PI * x; }; }

const multiplyBy2 = PiMultiplier(2);
const multiplyBy2_3 = PiMultiplier(2/3);
const divideBy2 = PiMultiplier(0.5);

console.log("π*2 =", multiplyBy2());
console.log("π*2/3 =", multiplyBy2_3());
console.log("π/2 =", divideBy2());

// =======================
// Painter
// =======================
function Painter(color) {
    return function(obj) {
        if (obj && obj.type) console.log(`Color: ${color}, Type: ${obj.type}`);
        else console.log("No 'type' property occurred!");
    };
}

const PaintBlue = Painter("Blue");
const PaintRed = Painter("Red");
const PaintYellow = Painter("Yellow");

// Тестові об'єкти (табл.12)
const obj1 = { maxSpeed: 280, type: "Sportcar", color: "magenta" };
const obj2 = { type: "Truck", avgSpeed: 90, loadCapacity: 2400 };
const obj3 = { color: "purple", maxSpeed: 180, isCar: true };
const objects = [obj1, obj2, obj3];

console.log("=== PaintBlue ===");
objects.forEach(obj => PaintBlue(obj));

console.log("=== PaintRed ===");
objects.forEach(obj => PaintRed(obj));

console.log("=== PaintYellow ===");
objects.forEach(obj => PaintYellow(obj));
