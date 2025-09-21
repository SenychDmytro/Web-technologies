function triangle(val1, type1, val2, type2) {

    const validTypes = ["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];

    if (!validTypes.includes(type1) || !validTypes.includes(type2)) {
        console.log("Помилка: невірно введено тип. Перечитайте інструкцію.");
        return "failed";
    }

    function degToRad(deg) {
        return deg * Math.PI / 180;
    }
    function radToDeg(rad) {
        return rad * 180 / Math.PI;
    }

    let a, b, c, alpha, beta;

    if ((type1 === "leg" && type2 === "hypotenuse") || (type2 === "leg" && type1 === "hypotenuse")) {
        let leg, hyp;
        if (type1 === "leg") {
            leg = val1;
        } else {
            leg = val2;
        }

        if (type1 === "hypotenuse") {
            hyp = val1;
        } else {
            hyp = val2;
        }

        if (leg <= 0 || hyp <= 0 || leg >= hyp) {
            return "Некоректні значення: катет має бути меншим за гіпотенузу.";
        }

        a = leg;
        c = hyp;
        b = Math.sqrt(c * c - a * a);
        alpha = radToDeg(Math.asin(a / c));
        beta = 90 - alpha;
    }

    else if (type1 === "leg" && type2 === "leg") {
        a = val1;
        b = val2;
        if (a <= 0 || b <= 0) {
            return "Некоректні значення катетів.";
        }
        c = Math.sqrt(a * a + b * b);
        alpha = radToDeg(Math.atan(a / b));
        beta = 90 - alpha;
    }

    else if ((type1 === "hypotenuse" && type2 === "angle") || (type2 === "hypotenuse" && type1 === "angle")) {
        let hyp, ang;
        if (type1 === "hypotenuse") {
            hyp = val1;
        } else {
            hyp = val2;
        }

        if (type1 === "angle") {
            ang = val1;
        } else {
            ang = val2;
        }

        if (hyp <= 0 || ang <= 0 || ang >= 90) {
            return "Некоректні значення: гіпотенуза > 0, кут (0;90).";
        }
        c = hyp;
        alpha = ang;
        beta = 90 - alpha;
        a = c * Math.sin(degToRad(alpha));
        b = c * Math.cos(degToRad(alpha));
    }

    else if ((type1 === "leg" && type2 === "adjacent angle") || (type2 === "leg" && type1 === "adjacent angle")) {
        let leg, ang;
        if (type1 === "leg") {
            leg = val1;
        } else {
            leg = val2;
        }

        if (type1 === "adjacent angle") {
            ang = val1;
        } else {
            ang = val2;
        }

        if (leg <= 0 || ang <= 0 || ang >= 90) {
            return "Некоректні значення.";
        }
        b = leg;
        beta = ang;
        alpha = 90 - beta;
        a = b * Math.tan(degToRad(alpha));
        c = Math.sqrt(a * a + b * b);
    }

    else if ((type1 === "leg" && type2 === "opposite angle") || (type2 === "leg" && type1 === "opposite angle")) {
        let leg, ang;
        if (type1 === "leg") {
            leg = val1;
        } else {
            leg = val2;
        }

        if (type1 === "opposite angle") {
            ang = val1;
        } else {
            ang = val2;
        }

        if (leg <= 0 || ang <= 0 || ang >= 90) {
            return "Некоректні значення.";
        }
        a = leg;
        alpha = ang;
        beta = 90 - alpha;
        b = a / Math.tan(degToRad(alpha));
        c = Math.sqrt(a * a + b * b);
    }

    else {
        console.log("Несумісна пара типів. Перечитайте інструкцію.");
        return "failed";
    }

    console.log("Результати:");
    console.log("a = " + a.toFixed(4));
    console.log("b = " + b.toFixed(4));
    console.log("c = " + c.toFixed(4));
    console.log("alpha = " + alpha.toFixed(4) + "°");
    console.log("beta = " + beta.toFixed(4) + "°");

    return "success";
}
