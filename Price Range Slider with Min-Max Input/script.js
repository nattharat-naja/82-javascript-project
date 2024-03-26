const inputSliders = document.querySelectorAll(".input-slider");
const inputFields = document.querySelectorAll(".input-field");
const price = document.querySelector(".display-slide-progress");

const gap = 500;
let minPercent;
let maxPercent;

// Function for applying value when changing value in "range input"
inputSliders.forEach((slider) => {
    slider.addEventListener("input", (e) => {
        let minValue = parseInt(inputSliders[0].value);
        let maxValue = parseInt(inputSliders[1].value);

        // Condition for applying gap between "min-slider" and "max-slider"
        if (maxValue - minValue <= gap) {
            if (e.target.id === "min-slider") {
                inputSliders[0].value = maxValue - gap;
            } else {
                inputSliders[1].value = minValue + gap;
            }
        }

        // Applying values to corresponding input fields
        inputFields[0].value = inputSliders[0].value;
        inputFields[1].value = inputSliders[1].value;

        // Applying percent in left and right property of display-slide-price
        minPercent = (inputSliders[0].value / inputSliders[0].max) * 100 + "%";
        maxPercent =
            ((inputSliders[0].max - inputSliders[1].value) /
                inputSliders[0].max) *
                100 +
            "%";
        price.style.left = minPercent;
        price.style.right = maxPercent;
    });
});

// Function for applying value when changing value in "number input"
inputFields.forEach((inputField) => {
    inputField.addEventListener("change", (e) => {
        let minField = parseInt(inputFields[0].value);
        let maxField = parseInt(inputFields[1].value);

        // Condition for applying gap between "min-field" and "max-field"
        if (maxField - minField <= gap) {
            if (e.target.id === "min-field") {
                inputFields[0].value = maxField - gap;
            } else {
                inputFields[1].value = minField + gap;
            }
            alert("Minimum and Maximum price must be 500 unit different");
        }

        // Condition for handling exception minField below than 0
        else if (minField < 0) {
            alert("Minimum Price must greater than 0");
            inputFields[0].value = 0;
        }

        // Condition for handling exception maxField greater than 10000
        else if (maxField > inputSliders[0].max) {
            alert(`Maximum Price must lower than ${inputSliders[0].max}`);
            inputFields[1].value = inputSliders[0].max;
        }

        // Applying values to corresponding sliders
        inputSliders[0].value = inputFields[0].value;
        inputSliders[1].value = inputFields[1].value;

        // Applying percent in left and right property of display-slide-price
        minPercent = (inputFields[0].value / inputSliders[0].max) * 100 + "%";
        maxPercent =
            ((inputSliders[0].max - inputFields[1].value) /
                inputSliders[0].max) *
                100 +
            "%";
        price.style.left = minPercent;
        price.style.right = maxPercent;
    });
});
