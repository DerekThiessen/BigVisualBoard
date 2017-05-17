(function () {
    "use strict";
});

var iCurrentSpeed = 82,
    workItems = 850,
        iTargetSpeed = 120,
        bDecrement = null,
        job = null;

function applyDefaultContextSettings(options) {
    options.context.lineWidth = 2;
    options.context.globalAlpha = 0.5;
    options.context.strokeStyle = "rgb(255, 255, 255)";
    options.context.fillStyle = 'rgb(255,255,255)';
}

function clearCanvas(options) {
    options.context.clearRect(0, 0, 800, 600);
    applyDefaultContextSettings(options);
}

function tmpOptions(canvas, workItems) {
    var centerX = 175,
        centerY = 275,
    radius = 100,
    outerRadius = 160;

    return {
        context: canvas.getContext('2d'),
        workItems: workItems,
        center: {
            X: centerX,
            Y: centerY
        },
        levelRadius: radius - 10,
        gaugeOptions: {
            center: {
                X: centerX,
                Y: centerY
            },
            radius: radius
        },
        radius: outerRadius
    };
}

function backLogGaugeOptions(canvas, workItems) {
    var centerX = 805,
        centerY = 275,
    radius = 100,
    outerRadius = 160;

    return {
        context: canvas.getContext('2d'),
        workItems: workItems,
        center: {
            X: centerX,
            Y: centerY
        },
        levelRadius: radius - 10,
        gaugeOptions: {
            center: {
                X: centerX,
                Y: centerY
            },
            radius: radius
        },
        radius: outerRadius
    };
}

function speedometerOptions(canvas, iSpeed) {
    var centerX = 490,
        centerY = 210,
    radius = 140,
    outerRadius = 200;

    return {
        context: canvas.getContext('2d'),
        speed: iSpeed - 20,
        center: {
            X: centerX,
            Y: centerY
        },
        levelRadius: radius - 10,
        gaugeOptions: {
            center: {
                X: centerX,
                Y: centerY
            },
            radius: radius
        },
        radius: outerRadius
    };
}

function drawOuterMetallicArc(options) {
    options.context.beginPath();
    options.context.globalAlpha = 1;
    options.context.fillStyle = "rgb(127,127,127)";
    options.context.arc(options.center.X, options.center.Y, options.radius, 0, 2 * Math.PI, false);
    options.context.fill();
}

function drawInnerMetallicArc(options) {
    options.context.beginPath();
    options.context.globalAlpha = 1;
    options.context.fillStyle = "rgb(102,255,0)";
    options.context.arc(options.center.X, options.center.Y, (options.radius / 100) * 99, 0, 2 * Math.PI, false);
    options.context.fill();
}

function drawMetallicArc(options) {
    drawOuterMetallicArc(options);
    drawInnerMetallicArc(options);
}

function drawBackground(options) {
    options.context.globalAlpha = 0.19;
    options.context.fillStyle = "rgb(0,0,0)";

    for (var i = 0; i < options.radius - 5; i++) {
        options.context.beginPath();
        options.context.arc(options.center.X, options.center.Y, i, 0, 2 * Math.PI, true);
        options.context.fill();
    }
}

function degreesToRadians(angle) {
    return ((angle * Math.PI) / 180);
}

function drawLine(options, line) {
    options.context.beginPath();
    options.context.globalAlpha = line.alpha;
    options.context.lineWidth = line.lineWidth;
    options.context.fillStyle = line.fillStyle;
    options.context.strokeStyle = line.fillStyle;
    options.context.moveTo(line.from.X, line.from.Y);
    options.context.lineTo(line.to.X, line.to.Y);
    options.context.stroke();
}

function createLine(fromX, fromY, toX, toY, fillStyle, lineWidth, alpha) {
    return {
        from: {
            X: fromX,
            Y: fromY
        },
        to: {
            X: toX,
            Y: toY
        },
        fillStyle: fillStyle,
        lineWidth: lineWidth,
        alpha: alpha
    };
}

function drawSmallTickMarks(options) {
    var tickvalue = options.levelRadius - 8,
        iTick = 0,
        gaugeOptions = options.gaugeOptions,
        iTickRad = 0,
        onArchX,
        onArchY,
        innerTickX,
        innerTickY,
        fromX,
        fromY,
        line,
            toX,
            toY;

    applyDefaultContextSettings(options);

    for (iTick = -30; iTick < 220; iTick += 20) {

        iTickRad = degreesToRadians(iTick);

        onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
        onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
        innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
        innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);

        fromX = (options.center.X - gaugeOptions.radius) + onArchX;
        fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;
        toX = (options.center.X - gaugeOptions.radius) + innerTickX;
        toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;

        line = createLine(fromX, fromY, toX, toY, "rgb(127,127,127)", 3, 0.6);

        drawLine(options, line);

    }
}

function drawLargeTickMarks(options) {
    /* The large tick marks against the coloured
     * arc drawn every 10 mph from 10 degrees to
     * 170 degrees.
     */

    var tickvalue = options.levelRadius - 8,
        iTick = 0,
    gaugeOptions = options.gaugeOptions,
    iTickRad = 0,
    innerTickY,
    innerTickX,
    onArchX,
    onArchY,
    fromX,
    fromY,
    toX,
    toY,
    line;

    applyDefaultContextSettings(options);

    tickvalue = options.levelRadius - 2;

    for (iTick = -20; iTick < 220; iTick += 20) {

        iTickRad = degreesToRadians(iTick);

        onArchX = gaugeOptions.radius - (Math.cos(iTickRad) * tickvalue);
        onArchY = gaugeOptions.radius - (Math.sin(iTickRad) * tickvalue);
        innerTickX = gaugeOptions.radius - (Math.cos(iTickRad) * gaugeOptions.radius);
        innerTickY = gaugeOptions.radius - (Math.sin(iTickRad) * gaugeOptions.radius);

        fromX = (options.center.X - gaugeOptions.radius) + onArchX;
        fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + onArchY;
        toX = (options.center.X - gaugeOptions.radius) + innerTickX;
        toY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY;

        line = createLine(fromX, fromY, toX, toY, "rgb(127,127,127)", 3, 0.6);

        drawLine(options, line);
    }
}

function drawTicks(options) {
    drawSmallTickMarks(options);
    drawLargeTickMarks(options);
}

function drawTextMarkers(options) {
    var gaugeOptions = options.gaugeOptions,
        iTickToPrint = 0;

    applyDefaultContextSettings(options);
    options.context.font = 'italic 20px sans-serif';
    options.context.beginPath();

    for (iTick = 160; iTick < 420; iTick += 20) {
        var x = options.center.X - 12 + (gaugeOptions.radius + 20) * Math.cos(1.5 * Math.PI * iTick / 280);
        var y = options.center.Y + 15 + (gaugeOptions.radius + 25) * Math.sin(1.5 * Math.PI * iTick / 280);

        options.context.fillText(iTickToPrint, x, y);

        iTickToPrint += 10; 
    }
 
    options.context.stroke();
}

function drawSpeedometerColourArc(options) {
    var gradient = options.context.createLinearGradient(0, 0, 650, 0);
    options.context.globalAlpha = 1;
    gradient.addColorStop(0.6, "rgb(255, 0, 0)");
    gradient.addColorStop(0.68, "rgb(198, 111, 0)");
    gradient.addColorStop(1.0, "rgb(82, 240, 55)");
    
    options.context.beginPath();
    options.context.lineWidth = 5;
    options.context.strokeStyle = gradient;
    
    options.context.arc(options.center.X,
        options.center.Y,
        options.levelRadius,
        Math.PI + (Math.PI / 360 * -75),
        (.20 * Math.PI),
        false);

    options.context.stroke();

}

function drawNeedleDial(options, alphaValue, strokeStyle, fillStyle) {
    options.context.globalAlpha = alphaValue;
    options.context.lineWidth = 3;
    options.context.strokeStyle = strokeStyle;
    options.context.fillStyle = fillStyle;

    for (var i = 0; i < 30; i++) {
        options.context.beginPath();
        options.context.arc(options.center.X, options.center.Y, i, 0, 2 * Math.PI, false);
        options.context.fill();
        options.context.stroke();
    }
}

function convertSpeedToAngle(options) {
    var iSpeed = (options.speed / 10),
        iSpeedAsAngle = ((iSpeed * 20) + 10) % 360;

    if (iSpeedAsAngle > 360) {
        iSpeedAsAngle = iSpeedAsAngle - 360;
    } else if (iSpeedAsAngle < 0) {
        iSpeedAsAngle = iSpeedAsAngle + 360;
    }

    return iSpeedAsAngle;
}

function drawNeedle(options) {
    var iSpeedAsAngle = convertSpeedToAngle(options),
        iSpeedAsAngleRad = degreesToRadians(iSpeedAsAngle),
    gaugeOptions = options.gaugeOptions,
    innerTickX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * 20),
    innerTickY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * 20),
    fromX = (options.center.X - gaugeOptions.radius) + innerTickX,
    fromY = (gaugeOptions.center.Y - gaugeOptions.radius) + innerTickY,
    endNeedleX = gaugeOptions.radius - (Math.cos(iSpeedAsAngleRad) * gaugeOptions.radius),
    endNeedleY = gaugeOptions.radius - (Math.sin(iSpeedAsAngleRad) * gaugeOptions.radius),
    toX = (options.center.X - gaugeOptions.radius) + endNeedleX,
    toY = (gaugeOptions.center.Y - gaugeOptions.radius) + endNeedleY,
    line = createLine(fromX, fromY, toX, toY, "rgb(255,0,0)", 5, 0.6);

    drawLine(options, line);

    drawNeedleDial(options, 0.6, "rgb(127, 127, 127)", "rgb(255,255,255)");
    drawNeedleDial(options, 0.2, "rgb(127, 127, 127)", "rgb(127,127,127)");

}

function tmpGauge($element, workItems) {
    var options = tmpOptions($element, workItems);

    drawMetallicArc(options);
    drawBackground(options);
}

function drawBackLogGauge($element, workItems) {
    var options = backLogGaugeOptions($element, workItems);

    drawMetallicArc(options);
    drawBackground(options);
}

function drawSpeedometer($element) {
    var options = speedometerOptions($element, iCurrentSpeed);

    drawMetallicArc(options);
    drawBackground(options);
    drawTicks(options);
    drawTextMarkers(options);
    drawSpeedometerColourArc(options);
    drawNeedle(options);
}

function draw()
{
    var $canvas = document.getElementById('speedometerCanvas');

    if ($canvas != null && $canvas.getContext) {
        tmpGauge($canvas);
        drawBackLogGauge($canvas);
        drawSpeedometer($canvas);
    } else {
        alert("Canvas not supported by your browser!");
    }
}