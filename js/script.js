
// YEAST Artisan Bakery & Grocer
// JavaScript functionality

document.addEventListener("DOMContentLoaded", function () {

    console.log("YEAST website JavaScript loaded successfully.");

    // Product search functionality
    const productSearch = document.getElementById("productSearch");
    const products = document.querySelectorAll(".product-item");
    const searchMessage = document.getElementById("searchMessage");

    if (productSearch) {

        productSearch.addEventListener("input", function () {

            const searchValue = productSearch.value.toLowerCase().trim();
            let visibleProducts = 0;

            products.forEach(function (product) {

                const productText = product.textContent.toLowerCase();

                if (productText.includes(searchValue)) {
                    product.style.display = "";
                    visibleProducts++;
                } else {
                    product.style.display = "none";
                }

            });

            if (searchMessage) {
                if (searchValue === "") {
                    searchMessage.textContent = "";
                } else if (visibleProducts === 0) {
                    searchMessage.textContent = "No matching products found.";
                } else {
                    searchMessage.textContent =
                        visibleProducts + " product category/categories found.";
                }
            }

        });

    }

    // Product image lightbox functionality
    const productImages = document.querySelectorAll(".product-item img");

    if (productImages.length > 0) {

        const lightbox = document.createElement("div");

        lightbox.id = "productLightbox";

        lightbox.style.cssText = `
            display: none;
            position: fixed;
            z-index: 1000;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.85);
            justify-content: center;
            align-items: center;
            padding: 20px;
            box-sizing: border-box;
        `;

        const enlargedImage = document.createElement("img");

        enlargedImage.style.cssText = `
            max-width: 90%;
            max-height: 85%;
            object-fit: contain;
        `;

        const closeButton = document.createElement("button");

        closeButton.textContent = "×";
        closeButton.setAttribute("aria-label", "Close image");

        closeButton.style.cssText = `
            position: absolute;
            top: 15px;
            right: 25px;
            font-size: 40px;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
        `;

        lightbox.appendChild(enlargedImage);
        lightbox.appendChild(closeButton);
        document.body.appendChild(lightbox);

        function closeLightbox() {
            lightbox.style.display = "none";
        }

        productImages.forEach(function (image) {

            image.style.cursor = "pointer";

            image.addEventListener("click", function () {

                enlargedImage.src = image.src;
                enlargedImage.alt = image.alt;

                lightbox.style.display = "flex";

            });

        });

        closeButton.addEventListener("click", closeLightbox);

        lightbox.addEventListener("click", function (event) {

            if (event.target === lightbox) {
                closeLightbox();
            }

        });

        document.addEventListener("keydown", function (event) {

            if (event.key === "Escape") {
                closeLightbox();
            }

        });

    }

    // Interactive Leaflet map functionality
    const mapElement = document.getElementById("yeastMap");

    if (mapElement && typeof L !== "undefined") {

        const map = L.map("yeastMap").setView([-26.15, 28.14], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        // YEAST Bedfordview location
        const bedfordview = L.marker([-26.1700, 28.1360]).addTo(map);

        bedfordview.bindPopup(
            "<strong>YEAST Artisan Bakery & Grocer - Bedfordview</strong><br>" +
            "55 Van Buuren Road, Bedfordview<br>" +
            "Phone: 060 761 3077"
        );

        // YEAST Dunvegan location
        const dunvegan = L.marker([-26.1320, 28.1390]).addTo(map);

        dunvegan.bindPopup(
            "<strong>YEAST Artisan Bakery & Grocer - Dunvegan</strong><br>" +
            "79 Dunvegan Avenue, Dunvegan, Edenvale<br>" +
            "Phone: 072 445 6090"
        );

        // Display both locations
        map.fitBounds([
            [-26.1700, 28.1360],
            [-26.1320, 28.1390]
        ], { padding: [30, 30] });

    } else if (mapElement) {

        mapElement.textContent =
            "The map could not be loaded. Please check the Leaflet library connection.";

    }

    // Enquiry form validation and response
    const enquiryForm = document.getElementById("enquiryForm");
    const enquiryResponse = document.getElementById("enquiryResponse");

    if (enquiryForm) {

        enquiryForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!enquiryForm.checkValidity()) {
                enquiryForm.reportValidity();
                return;
            }

            const customerName = document.getElementById("name").value.trim();
            const customerEmail = document.getElementById("email").value.trim();
            const customerPhone = document.getElementById("phone").value.trim();
            const enquiryType = document.getElementById("enquiryType").value;
            const requestedProduct = document.getElementById("product").value.trim();
            const quantity = document.getElementById("quantity").value;
            const customerMessage = document.getElementById("message").value.trim();

            if (
                customerName.length < 2 ||
                requestedProduct.length < 2 ||
                customerMessage.length < 10
            ) {
                enquiryResponse.textContent =
                    "Please check your details and complete all required fields correctly.";
                return;
            }

            enquiryResponse.textContent =
                "Thank you, " + customerName +
                ". Your enquiry has been completed successfully. " +
                "Enquiry type: " + enquiryType + ". " +
                "Requested item: " + requestedProduct + ". " +
                "Quantity: " + quantity + ". " +
                "We will use " + customerEmail +
                " or " + customerPhone +
                " as your contact details. Your enquiry details have been displayed successfully.";

            enquiryForm.reset();

        });

    }

    // Contact form validation and Gmail functionality
    const contactForm = document.getElementById("contactForm");
    const contactResponse = document.getElementById("contactResponse");

    if (contactForm) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }

            const customerName =
                document.getElementById("contactName").value.trim();

            const customerEmail =
                document.getElementById("contactEmail").value.trim();

            const customerPhone =
                document.getElementById("contactPhone").value.trim();

            const messageType =
                document.getElementById("messageType").value;

            const customerMessage =
                document.getElementById("contactMessage").value.trim();

            if (customerName.length < 2 || customerMessage.length < 10) {
                contactResponse.textContent =
                    "Please check your details and complete the form correctly.";
                return;
            }

            const recipient = "ntsakothandi50@gmail.com";

            const subject = encodeURIComponent(
                "YEAST Website - " + messageType
            );

            const body = encodeURIComponent(
                "Customer Name: " + customerName + "\n" +
                "Email Address: " + customerEmail + "\n" +
                "Phone Number: " + customerPhone + "\n" +
                "Message Type: " + messageType + "\n\n" +
                "Message:\n" + customerMessage
            );

            const gmailLink =
                "https://mail.google.com/mail/?view=cm&fs=1" +
                "&to=" + encodeURIComponent(recipient) +
                "&su=" + subject +
                "&body=" + body;

            contactResponse.textContent =
                "Your message is ready. Gmail will open so you can review and send it.";

            window.open(gmailLink, "_blank");

        });

    }

});
