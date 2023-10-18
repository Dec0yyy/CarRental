let slide = 0;
document.getElementById("right-btn").addEventListener("click", () => {
	slide++;
	if (slide > 2) slide = 2;

	document.getElementById("t-slider").style.marginLeft =
		"-" + slide * 100 + "%";
});

document.getElementById("left-btn").addEventListener("click", () => {
	slide--;
	if (slide < 0) slide = 0;

	document.getElementById("t-slider").style.marginLeft =
		"-" + slide * 100 + "%";
});

let questions = document.getElementsByClassName("faq-q");
let answers = document.getElementsByClassName("faq-a");
for (let i = 0; i < questions.length; i++) {
	questions[i].addEventListener("click", (el) => {
		if (el.target.classList.contains("q-selected")) {
			el.target.classList.remove("q-selected");
			el.target.parentNode.children[1].classList.remove("a-selected");
			return;
		}

		for (let j = 0; j < questions.length; j++) {
			questions[j].classList.remove("q-selected");
			answers[j].classList.remove("a-selected");
		}
		el.target.classList.add("q-selected");
		el.target.parentNode.children[1].classList.add("a-selected");
	});
}

let mobileNavOpen = false;
document.getElementById("mobile-menu-btn").addEventListener("click", () => {
	if (!mobileNavOpen) {
		document.getElementById("mobile-menu").style.height = "180px";
		document.getElementsByClassName("bar")[0].style.transform = "rotate(45deg)";
		document.getElementsByClassName("bar")[1].style.transform =
			"rotate(-45deg)";
		document.getElementsByClassName("bar")[1].style.marginTop = "-16px";
		mobileNavOpen = true;
	} else {
		document.getElementById("mobile-menu").style.height = "0px";
		document.getElementsByClassName("bar")[0].style.transform = "rotate(0deg)";
		document.getElementsByClassName("bar")[1].style.transform = "rotate(0deg)";
		document.getElementsByClassName("bar")[1].style.marginTop = "0px";
		mobileNavOpen = false;
	}
});

document.getElementById("search-btn").addEventListener("click", () => {
	document.getElementById("popup").classList.add("active");
	document.body.style.overflow = "hidden";
	return;
	let carType = document.getElementById("car-type").value;
	let pickUp = document.getElementById("pick-up").value;
	let dropOff = document.getElementById("drop-off").value;
	let startDate = document.getElementById("start-date").value;
	let endDate = document.getElementById("end-date").value;

	console.log(carType, pickUp, dropOff, startDate, endDate);
	if (
		carType.length < 1 ||
		pickUp.length < 1 ||
		dropOff.length < 1 ||
		startDate.length < 1 ||
		endDate.length < 1
	) {
		document.getElementById("book-err-msg").style.display = "flex";
		return;
	} else {
		document.getElementById("book-err-msg").style.display = "none";
	}
});
document.getElementById("closePopup").addEventListener("click", function () {
	document.getElementById("popup").classList.remove("active");
	document.body.style.overflow = "auto"; // Re-enable scrolling
});

document.getElementById("err-close-btn").addEventListener("click", () => {
	document.getElementById("book-err-msg").style.display = "none";
});
document.getElementById("success-close-btn").addEventListener("click", () => {
	document.getElementById("book-success-msg").style.display = "none";
});
document.getElementById("popup").addEventListener("click", function (event) {
	if (event.target === this) {
		document.getElementById("popup").classList.remove("active");
		document.body.style.overflow = "auto";
	}
});

document.getElementById("reserve-btn").addEventListener("click", () => {
	let firstName = document.getElementById("f-name-input").value;
	let lastName = document.getElementById("s-name-input").value;
	let phone = document.getElementById("phone-input").value;
	let age = document.getElementById("age-input").value;
	let email = document.getElementById("email-input").value;
	let address = document.getElementById("address-input").value;
	let city = document.getElementById("city-input").value;
	let zip = document.getElementById("zip-input").value;
	console.log(age);
	let errHTML = "<ul>";
	if (firstName.length < 1) errHTML += "<li>First name is required.</li>";
	if (lastName.length < 1) errHTML += "<li>Last name is required.</li>";
	if (phone.length < 1) errHTML += "<li>Phone number is required.</li>";
	if (age.length < 1) errHTML += "<li>age is required.</li>";
	if (email.length < 1) errHTML += "<li>Email address is required.</li>";
	if (address.length < 1) errHTML += "<li>Address is required.</li>";
	if (city.length < 1) errHTML += "<li>City is required.</li>";
	if (zip.length < 1) errHTML += "<li>Zip is required.</li>";

	if (errHTML != "<ul>") {
		errHTML += "</ul>";
		document.getElementById("pu-c-err-msg").style.display = "block";
		document.getElementById("pu-c-err-msg").innerHTML = errHTML;
		document
			.getElementById("pu-c-err-msg")
			.scrollIntoView({ behavior: "smooth" });
		return;
	}

	if (age < 18 || age > 79 || isNaN(age)) {
		errHTML += "<li>Age must be between 18 and 80.</li>";
	}
	if (!validateEmail(email)) {
		errHTML += "<li>Invalid email address.</li>";
	}
	if (!validateAustralianPhoneNumber(phone)) {
		errHTML += "<li>Invalid phone number.</li>";
	}

	if (errHTML != "<ul>") {
		errHTML += "</ul>";
		document.getElementById("pu-c-err-msg").style.display = "block";
		document.getElementById("pu-c-err-msg").innerHTML = errHTML;
		document
			.getElementById("pu-c-err-msg")
			.scrollIntoView({ behavior: "smooth" });
		return;
	}

	// Validation successful
	document.getElementById("popup").classList.remove("active");
	document.getElementById("book-success-msg").style.display = "flex";
	document.getElementById("book-success-text").innerHTML =
		"Success! We have sent a confirmation email to " + email + ".";
});

function validateEmail(email) {
	const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
	return regex.test(email);
}
function validateAustralianPhoneNumber(phoneNumber) {
	const regex = /^(?:\+61|0)[2-478](?:\d{8}|\d{9})$/;
	return regex.test(phoneNumber);
}

const numericInputs = document.getElementsByClassName("numericInput");
for (let i = 0; i < numericInputs.length; i++) {
	numericInputs[i].addEventListener("input", function () {
		// Remove non-numeric characters using a regular expression
		this.value = this.value.replace(/[^0-9]/g, "");
	});
}
