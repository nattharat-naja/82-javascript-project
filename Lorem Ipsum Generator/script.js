const inputRanges = document.querySelectorAll(".input-range"); // inputRange[0] = paragraphs, inputRange[1] = words
const inputTag = document.querySelector("#tag-value");
const inputIncludeHTML = document.querySelector("#includeHTML-value");
const generateButton = document.querySelector("#generate-button");
const outputDisplay = document.querySelector("#output-display");

const tags = ["p", "h1", "h2", "h3", "h4", "h5", "h6", "span", "i", "b"];
const lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit.";
const loremWords = lorem.split(" ");

// Function that change value of span(outputRange) when change value in input[Type="range"](inputRange).
inputRanges.forEach((inputRange) => {
    inputRange.addEventListener("input", (e) => {
        const outputRange = inputRange.nextElementSibling;
        outputRange.innerHTML = e.target.value;
    });
});

// Filling value in Tag select.
tags.forEach((tag) => {
    inputTag.innerHTML += `<option value="${tag}">&lt${tag}&gt</option>`;
});

// Function for apply tag in outcome.
generateButton.addEventListener("click", () => {
    outputDisplay.innerHTML = "";
    for (let i = 0; i < inputRanges[0].value; i++) {
        if (inputIncludeHTML.value === "Yes") {
            outputDisplay.innerHTML += `<${inputTag.value}>${loremWords
                .slice(0, inputRanges[1].value)
                .join(" ")}</${inputTag.value}> `;
        } else {
            outputDisplay.innerHTML += `${loremWords
                .slice(0, inputRanges[1].value)
                .join(" ")} `;
        }
    }
});
